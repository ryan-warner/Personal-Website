import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { Plane } from './plane.js';

// General Scene Setup
const splash = document.getElementById('splash');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, splash.clientWidth / splash.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(splash.clientWidth, splash.clientHeight);
renderer.setClearColor(0x2f333d, 1);
document.getElementById('splash').appendChild(renderer.domElement);



const limitingCoordinates = [xSpread * 0.25, ySpread * 0.25, -xSpread * 0.25, -ySpread * 0.25]
const plane = new Plane(scene, limitingCoordinates);

// Draw box of limiting coordinates
const boxGeometry = new THREE.BoxGeometry(xSpread * 0.25, ySpread * 0.25, -100);
// Only draw the lines of the box
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, depthWrite: false });

const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(boxMesh);

function animate() {
    requestAnimationFrame(animate);
    plane.fly();

    renderer.render(scene, camera);
}

animate();
