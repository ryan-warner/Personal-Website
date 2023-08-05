import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

// Make a new class called Plane

export class Plane {
    constructor(scene, limitingCoordinates) {
        this.heading = (Math.floor(Math.random() * 360));
        this.speed = 1;
        this.velocity = new THREE.Vector3(0, 1, 0)
        this.limitingCoordinates = limitingCoordinates;
        this.turnFrameCount = 1;
        
        const loader = new SVGLoader();
        loader.load('/src/assets/plane.svg', (data) => {
            const svgPaths = data.paths;
            const vertices = [];

            // Create a custom geometry from the SVG path data
            const path = svgPaths[0];
            const shape = path.toShapes(true)[0];

            const points = shape.extractPoints().shape;
            const ShapeGeometry = new THREE.ShapeGeometry(shape);
            const planeGeometry = new THREE.BufferGeometry().copy(ShapeGeometry);
            planeGeometry.computeBoundingBox();

            for (const point of points) {
                vertices.push(point.x - (planeGeometry.boundingBox.max.x / 2), point.y - (planeGeometry.boundingBox.max.y / 2), 0); // Z-coordinate is 0 for 2D profile
            }


            planeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, depthWrite: false });
            this.mesh = new THREE.Mesh(planeGeometry, material);

            //this.mesh.position.set(this.center);
            //this.mesh.position.set(-this.center.x, -this.center.y, this.center.z);

            // Rotate the plane about the center
            //this.mesh.rotateZ(Math.PI);
            //this.mesh.geometry.rotateZ(Math.PI);
            //this.mesh.rotation.set(0, 0, Math.PI - ((Math.PI * this.heading) / 180.0));
            var center = new THREE.Vector3()
            this.mesh.geometry.computeBoundingBox();
            this.mesh.geometry.boundingBox.getCenter(center);
            this.mesh.geometry.center();
            this.mesh.position.copy(center);
            this.mesh.position.z = -100;

            // Initial Rotation
            this.mesh.geometry.rotateZ(Math.PI - ((Math.PI * this.heading) / 180.0));

            scene.add(this.mesh);
            // Add bounding box
            const box = new THREE.BoxHelper(this.mesh, 0xffff00);
            scene.add(box);

            // Add coordinate axes
            const axesHelper = new THREE.AxesHelper(5);
            axesHelper.position.set(0, 0, -10);
            scene.add(axesHelper);
        });
    }

    generateContrails() {
        
    }

    fly() {
        //console.log(this?.mesh)
        this.mesh.translateOnAxis(this.velocity, this.speed)
        //this.mesh.position.x += Math.sin((Math.PI * this.heading) / 180.0) * this.speed;
        //this.mesh.position.y += Math.cos((Math.PI * this.heading) / 180.0) * this.speed;
    }

    update() {
        if (this?.mesh) {
            const currentHeading = Number(this.heading)
            const turnWeight = 1
            // Check if the plane is within the limiting coordinates
            if (this.mesh.position.x > this.limitingCoordinates[0]) {
                if (this.heading > 90) {
                    this.mesh.geometry.rotateZ(-turnWeight * this.turnFrameCount * Math.PI / 180.0);
                    this.heading += turnWeight * this.turnFrameCount;
                } else {
                    this.mesh.geometry.rotateZ(turnWeight * this.turnFrameCount  * Math.PI / 180.0);
                    this.heading -= turnWeight * this.turnFrameCount;
                }
            } else if (this.mesh.position.x < this.limitingCoordinates[2]) {
                if (this.heading > 270) {
                    this.mesh.geometry.rotateZ(-turnWeight * this.turnFrameCount  * Math.PI / 180.0);
                    this.heading += turnWeight * this.turnFrameCount;
                } else {
                    this.mesh.geometry.rotateZ(turnWeight * this.turnFrameCount  * Math.PI / 180.0);
                    this.heading -= turnWeight * this.turnFrameCount;
                }
            } else if (this.mesh.position.y > this.limitingCoordinates[1]) {
                if (this.heading < 0) {
                    this.mesh.geometry.rotateZ(-turnWeight * this.turnFrameCount  * Math.PI / 180.0);
                    this.heading += turnWeight * this.turnFrameCount;
                } else {
                    this.mesh.geometry.rotateZ(turnWeight * this.turnFrameCount  * Math.PI / 180.0);
                    this.heading -= turnWeight * this.turnFrameCount;
                }
            } else if (this.mesh.position.y < this.limitingCoordinates[3]) {
                if (this.heading > 180) {
                    this.mesh.geometry.rotateZ(-turnWeight * this.turnFrameCount  * Math.PI / 180.0);
                    this.heading += turnWeight * this.turnFrameCount;
                } else {
                    this.mesh.geometry.rotateZ(turnWeight * this.turnFrameCount  * Math.PI / 180.0);
                    this.heading -= turnWeight * this.turnFrameCount;
                }
            }

            if (this.heading > 360) {
                this.heading = this.heading - 360;
            } else if (this.heading < 0) {
                this.heading = 360 + this.heading;
            }

            if (currentHeading !== this.heading) {
                this.turnFrameCount += 4;
                this.turnFrameCount = this.turnFrameCount ** 0.5
            } else {
                this.turnFrameCount = 1;
            }

            //this.mesh.geometry.rotateZ(2 * Math.PI / 360.0);

            this.mesh.position.x += Math.sin((Math.PI * this.heading) / 180.0) * this.speed;
            this.mesh.position.y += Math.cos((Math.PI * this.heading) / 180.0) * this.speed;
        }
    }
}