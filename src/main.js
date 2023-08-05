import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

// General Scene Setup
const splash = document.getElementById('splash');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, splash.clientWidth / splash.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(splash.clientWidth, splash.clientHeight);
renderer.setClearColor(0x2f333d, 1);
document.getElementById('splash').appendChild(renderer.domElement);

// Star Setup
const loader = new SVGLoader();

const generateStars = (starGeometry) => {
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, depthWrite: false });
  let numStars = 250;

  /*const positions = []; // Array to store the positions of stars
  const scales = []; // Array to store the scales of stars

  for (let i = 0; i < numStars; i++) {
    // Add random positions and scales for each star
    positions.push(Math.random() * 10 - 5, Math.random() * 10 - 5, -10);
    scales.push(0.05, 0.05, 0.05);
  }

  // Create a buffer attribute for positions
  const positionAttribute = new THREE.InstancedBufferAttribute(new Float32Array(positions), 3);
  starGeometry.setAttribute('position', positionAttribute);

  // Create a buffer attribute for scales
  const scaleAttribute = new THREE.InstancedBufferAttribute(new Float32Array(scales), 3);
  starGeometry.setAttribute('scale', scaleAttribute);

  // Create the instanced mesh
  //const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, depthWrite: false });
  const starMesh = new THREE.InstancedMesh(starGeometry, starMaterial, numStars);

  //scene.add(starMesh);*/

  for (let i = 0; i < numStars; i++) {
    // Use starGeometry from above
    var star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(Math.random() * 1000 - 500, Math.random() * 1000 - 500, Math.random() * 200 - 350);
    //star.position.set(0, 0, -10)
    //star.scale.set(0.05, 0.05, 0.05);

    // Check to make sure that the star is not intersecting with any other stars
    const boxHelper = new THREE.BoxHelper(star, 0xffff00); // Yellow color for the box
    //scene.add(boxHelper);

    scene.add(star);
  }
}

const loadSVG = async () => loader.load('/src/assets/star.svg', function (data) {
  const path = data.paths[0];
  const shapes = path.toShapes(true);

  const points = shapes[0].extractPoints(); // Get the points of the bezier curves
  const shape = new THREE.Shape(points.shape)
  const starGeometry = new THREE.ShapeGeometry(shape);
  generateStars(starGeometry);
  //const star = new THREE.Mesh(starGeometry, starMaterial);
  //star.position.set(0, 0, -10);
  //star.scale.set(0.05, 0.05, 0.05);
  //scene.add(star);
});

loadSVG();

// Add coordinate helper
const axesHelper = new THREE.AxesHelper();
axesHelper.position.set(0, 0, -10);
scene.add(axesHelper);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
