import {
    Vector3,
    BufferGeometry,
    CircleGeometry,
    DoubleSide,
    InstancedMesh,
    ShaderMaterial,
    InstancedBufferAttribute,
    Mesh,
    Matrix4,
    Quaternion
} from 'three';
import { calculateBoundsWithOffset } from './utils';

class Contrails {
  constructor(scene, plane, context) {
    this.plane = plane;

    // Contrail Constants
    this.contrailArray = [];
    this.contrailWidth = 3;
    this.particlesEmitted = 3;
    this.maxDistance = 200;
    this.contrailLength = Math.floor(this.maxDistance * 1.1 / (this.plane.speed)) * 2 * this.particlesEmitted;
    console.log(this.contrailLength);
    this.lastIndexReference = 0;

    // Scene Constants
    this.sceneBounds = calculateBoundsWithOffset(
      context.sceneCenter, 
      context.splashBounds, 
      context.splashBounds, 
      context.horizontalFOV, 
      context.verticalFOV, 
      100, {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    );

    this.checkForSceneExit = false;
    this.sceneExit = false;

    // Realizations - position is 0,0,0 for geometry
    // Need to pass in plane position, heading to shader, to determine perpendicular offset from emission point
    // Not sure how this works if the plane turns

    const vertexShader = `
      precision highp float;
      uniform vec3 planePosition;
      uniform float heading;
      uniform float modelScale;
      uniform float maxDistance;
      attribute vec3 instancePosition;
      varying vec3 vPosition;
      varying float vOpacity;
      attribute float contrailSeed;
      attribute float contrailHorizontalDeviation;

      void main() {
        float fullWidthDistance = 150.0;
        float distanceToPlane = distance(planePosition.xy, (modelMatrix * instanceMatrix * vec4(position, 1.0)).xy);
        float scaleFactor = clamp((distanceToPlane - 2.0)/ fullWidthDistance, 0.0, 1.0);
        
        // Adjust for heading
        float xOffset = -contrailHorizontalDeviation * modelScale * pow((1.0 - scaleFactor), 2.0) * cos(heading);
        float yOffset = -contrailHorizontalDeviation * modelScale * pow((1.0 - scaleFactor), 2.0) * sin(-heading);

        vPosition = (position * scaleFactor) + vec3(xOffset, yOffset, 0.0);

        
        float t = pow(clamp((distanceToPlane - 30.0) / (maxDistance * contrailSeed), 0.0, 1.0),2.0);
        vOpacity = smoothstep(1.0, 0.0, t) * 0.1;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(vPosition, 1.0);
      }`

    const fragmentShader = `
      precision highp float;
      varying float vOpacity;

      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
      }`

      const contrailMaterial = new ShaderMaterial({
        uniforms: {
          planePosition: { value: this.plane.mesh.position},
          heading: { value: this.plane.heading * Math.PI / 180 },
          modelScale: { value: this.plane.planeScale },
          maxDistance: { value: this.maxDistance },
        },
        vertexShader,
        fragmentShader,
        depthWrite: false,
        side: DoubleSide,
        transparent: true,
      });

      const contrailSeed = []
      for (let i = 0; i < this.contrailLength; i++) {
        contrailSeed.push(Math.random() ** 2);
      }

      this.contrailHorizontalDeviation = []
      const lateralDeviationLimit = 2;
      for (let i = 0; i < this.contrailLength; i++) {
        this.contrailHorizontalDeviation.push(Math.random() * lateralDeviationLimit * 2 - lateralDeviationLimit);
      }

      // Contrail Setup
      const contrailGeometry = new CircleGeometry(this.contrailWidth, 32);
      contrailGeometry.setAttribute('contrailSeed', new InstancedBufferAttribute(new Float32Array(contrailSeed), 1));
      contrailGeometry.setAttribute('contrailHorizontalDeviation', new InstancedBufferAttribute(new Float32Array(this.contrailHorizontalDeviation), 1));

      const contrailMesh = new InstancedMesh(contrailGeometry, contrailMaterial, this.contrailLength);
      scene.add(contrailMesh);
      this.mesh = contrailMesh;
      console.log(this.sceneBounds)
    }

    generateInstancedContrail() {
      this.mesh.material.uniforms.planePosition.value = this.plane.mesh.position;

      let lastPoint;
      if (this.sceneExit) {
        const lastPointMatrix = new Matrix4()
        this.mesh.getMatrixAt(this.lastIndexReference, lastPointMatrix);
        lastPoint = new Vector3().setFromMatrixPosition(lastPointMatrix);
        if (lastPoint.z !== -100 && lastPoint.z !== 0) {
          return true;
        }
      }

      for (let j = 0; j < this.particlesEmitted; j++) {
        var contrailPointLeft = new Vector3(this.plane.engineLeftLocal.x + this.contrailHorizontalDeviation[this.lastIndexReference], this.plane.engineLeftLocal.y, this.sceneExit ? 1 : this.plane.engineLeftLocal.z);
        var contrailPointRight = new Vector3(this.plane.engineRightLocal.x + this.contrailHorizontalDeviation[this.lastIndexReference + 1], this.plane.engineRightLocal.y, this.sceneExit ? 1 : this.plane.engineRightLocal.z);
        
        contrailPointLeft = this.plane.mesh.localToWorld(contrailPointLeft);
        contrailPointRight = this.plane.mesh.localToWorld(contrailPointRight);

        const matrixLeft = new Matrix4().compose(contrailPointLeft, new Quaternion(), new Vector3(1, 1, 1));
        const matrixRight = new Matrix4().compose(contrailPointRight, new Quaternion(), new Vector3(1, 1, 1));

        this.mesh.setMatrixAt(this.lastIndexReference, matrixLeft);
        this.mesh.setMatrixAt(this.lastIndexReference + 1, matrixRight);
        
        this.lastIndexReference += 2;
        this.lastIndexReference = this.lastIndexReference % this.contrailLength;
        
        if (!this.checkForSceneExit && this.lastIndexReference >= (this.contrailLength * 0.9)) {
          this.checkForSceneExit = true;
        }

        if (!this.sceneExit && this.checkForSceneExit) {
          this.sceneExit = this.checkSceneExit();
        }
        

        this.mesh.instanceMatrix.needsUpdate = true;
      }
      return false;
    }

    checkSceneExit() {
      if (!this.checkForSceneExit) {
        return false;
      }
      // Check if point is outside of scene bounds
      if (this.plane.mesh.position.x > this.sceneBounds.right || 
          this.plane.mesh.position.x < this.sceneBounds.left || 
          this.plane.mesh.position.y > this.sceneBounds.top || 
          this.plane.mesh.position.y < this.sceneBounds.bottom) {

        return true;
      }
      return false;
    }

    remove() {
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
      this.mesh = null;
    }
}

export default Contrails;