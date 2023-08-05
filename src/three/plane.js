import {
    BufferGeometry,
    DoubleSide,
    Float32BufferAttribute,
    Mesh,
    ShaderMaterial,
    ShapeGeometry,
    Vector3,
    BoxHelper,
    AxesHelper,
    SphereGeometry,
    MeshBasicMaterial,
} from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

import Contrails from './contrails';

class Plane {
    constructor(scene, initialState, context) {
        // Plane Constants - TBD
        this.heading = initialState.heading;
        this.speed = initialState.speed;
        this.initialPosition = initialState.position;
        this.scene = scene;

        const vertexShader = `
            void main() {
                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
            }`

        const fragmentShader = `
            void main() {
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }`

        const planeMaterial = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            depthWrite: false,
            side: DoubleSide,
            transparent: true,
        });

        // Plane Setup
        const loader = new SVGLoader();
        loader.load('/src/assets/planeV2.svg', (data) => {
            const svgPaths = data.paths;

            // Calculate x and y center of plane from max and min of all paths
            let maxX = 0;
            let minX = 0;
            let maxY = 0;
            let minY = 0;

            const shapeGeometries = [];
            const pointsArr = [];

            for (const path of svgPaths) {
                for (const shape of path.toShapes()) {
                    const points = shape.extractPoints().shape;
                    pointsArr.push([...points]);
                    shapeGeometries.push(new ShapeGeometry(shape));

                    minX = Math.min(...points.map(point => point.x), minX);
                    maxX = Math.max(...points.map(point => point.x), maxX);
                    minY = Math.min(...points.map(point => point.y), minY);
                    maxY = Math.max(...points.map(point => point.y), maxY);
                }
            }

            const xCenter = (maxX + minX) / 2;
            const yCenter = (maxY + minY) / 2;

            const planeMesh = new Mesh(undefined, planeMaterial);
            
            const geometryArray = [];
            for (let i = 0; i < shapeGeometries.length; i++) {
                // Set vertices
                const vertices = [];
                for (const point of pointsArr[i]) {
                    // Add points, centered around origin + rotate plane nose up
                    vertices.push(point.x - xCenter, -(point.y - yCenter), 0);
                }
                const shapeGeometry = new BufferGeometry().copy(shapeGeometries[i]);
                shapeGeometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
                // Merge shape geometry into plane geometry
                geometryArray.push(shapeGeometry);
            }

            const planeGeometry = mergeGeometries(geometryArray);

            planeMesh.geometry = planeGeometry;
            planeMesh.geometry.computeBoundingBox();
            planeMesh.geometry.center(); // Center plane geometry around model origin
            
            planeMesh.position.z = -100;
            planeMesh.position.x = initialState.position.x;
            planeMesh.position.y = initialState.position.y;

            planeMesh.rotation.z = -this.heading * Math.PI / 180;
            this.planeScale = 0.25;
            planeMesh.scale.set(this.planeScale, this.planeScale, this.planeScale);
            this.mesh = planeMesh;

            scene.add(planeMesh);

            // Engine Positions - For Contrail Emission
            this.engineLeftLocal = new Vector3(-10.5, -6.5, 0);
            this.engineRightLocal = new Vector3(10.5, -6.5, 0);

            // Contrail Setup
            const contrails = new Contrails(scene, this, context);
            this.contrails = contrails;

            // Convert Coordinates in plane geometry representing engine positions to world coordinates

            const enginePositions = {
                left: planeMesh.localToWorld(new Vector3(-10.5, -6.5, 0)),
                right: planeMesh.localToWorld(new Vector3(10.5, -6.5, 0)),
            }

            // Draw spheres at engine positions
            const sphereGeometry = new SphereGeometry(0.5, 32, 32);
            const sphereMaterial = new MeshBasicMaterial({ color: 0xffff00 });

            const leftSphere = new Mesh(sphereGeometry, sphereMaterial);
            const rightSphere = new Mesh(sphereGeometry, sphereMaterial);

            leftSphere.position.copy(enginePositions.left);
            rightSphere.position.copy(enginePositions.right);

            //scene.add(leftSphere);
            //scene.add(rightSphere);
            console.log("Heading    : " + this.heading);
        });
    }

    fly() {
        if (!this.mesh) return;
        // Fly plane w.r.t. heading
        this.mesh.position.x += this.speed * Math.sin(this.heading * Math.PI / 180);
        this.mesh.position.y += this.speed * Math.cos(this.heading * Math.PI / 180);
        // Emit contrails
        return this.contrails.generateInstancedContrail();
    }

    remove() {
        if (!this.mesh) return;
        this.scene.remove(this.mesh);
        this.scene.remove(this.contrails.mesh) // Avoids passing scene to contrails
        this.contrails.remove();

        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
        this.contrails = null;
        this.mesh = null;
    }
}

export default Plane;