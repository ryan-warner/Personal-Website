import * as THREE from 'three';
import StarField from './starField.js';
import Plane from './plane.js';
import Stats from 'stats.js';
import { positionPlane } from './utils.js';

// General Scene Setup
const splash = document.getElementById('splash');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, splash.clientWidth / splash.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(splash.clientWidth, splash.clientHeight);
renderer.setClearColor(0x2f333d, 1);
splash.appendChild(renderer.domElement);

// Splash Screen Context
const splashTextPrimary = document.getElementById('splash-text-primary');
const splashTextSecondary = document.getElementById('splash-text-secondary');

const splashBounds = splash.getBoundingClientRect();
const splashTextBounds = splashTextPrimary.getBoundingClientRect();
const splashTextSecondaryBounds = splashTextSecondary.getBoundingClientRect();

// Scene Context
const verticalFOV = camera.fov * Math.PI / 180;
const horizontalFOV = 2 * Math.atan(Math.tan(verticalFOV / 2) * camera.aspect);
const sceneCenter = new THREE.Vector3(splashBounds.width / 2, splashBounds.height / 2, 0); // Center in screen space

let context = {
    verticalFOV: verticalFOV,
    horizontalFOV: horizontalFOV,
    splashBounds: splashBounds,
    splashTextBounds: splashTextBounds,
    splashTextSecondaryBounds: splashTextSecondaryBounds,
    sceneCenter: sceneCenter,
}

const background = new StarField(scene, context);
const numPlanes = 5;
const planes = [];
//planes.push(new Plane(scene, positionPlane(planes, context), context)); // Instantiate first plane

//const plane2 = new Plane(scene, {position: new THREE.Vector3(0, 0, 0), heading: 0});
//const plane = new Plane(scene, positionPlane(context));

// Scene Statistics - For Debugging and General Reference
var stats1 = new Stats();
var stats2 = new Stats();
stats1.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
stats2.showPanel( 2 ); // 0: fps, 1: ms, 2: mb, 3+: custom
stats1.domElement.style.cssText = 'opacity:0.9;z-index:10000';
stats2.domElement.style.cssText = 'opacity:0.9;z-index:10000';
// Create container for both
var statsContainer = document.createElement( 'div' );
statsContainer.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000;display:flex';
statsContainer.appendChild( stats1.dom );
statsContainer.appendChild( stats2.dom );

document.body.appendChild( statsContainer );

var uTimeElapsed = 0;

function animate() {
    stats1.begin();
    stats2.begin();
    //console.log(background)
    
    if (background.mesh?.material) {
        if (uTimeElapsed < background.maxFadeTime) {
            uTimeElapsed = background.mesh?.material ? Date.now() - background.mesh.material.uniforms.uStartTime.value : 0;
            background.mesh.material.uniforms.uTimeElapsed.value = uTimeElapsed;
        } else {
            if (planes.length < numPlanes) {
                (Math.random() ** ((planes.length + 1) ** 2)) > 0.99 ? planes.push(new Plane(scene, positionPlane(planes, context), context)) : undefined;
            } 
            planes?.forEach(plane => {
                if (plane.fly()) {
                    scene.remove(plane.mesh);
                    plane.remove();
                    planes.splice(planes.indexOf(plane), 1);
                };
            });
        }
        
    }
    // log uniforms
    // console.log(background.mesh?.material ? (background.mesh.material.uniforms.uTime.value - background.mesh.material.uniforms.uStartTime.value) / 1.67 : undefined)
    stats1.end();
    stats2.end();
    requestAnimationFrame(animate);
    
    renderer.render(scene, camera);
}

function animateClean() {
    requestAnimationFrame(animateClean);
    renderer.render(scene, camera);
}

animate();