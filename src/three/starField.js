import { 
    Box3, 
    BufferGeometry,
    DoubleSide,
    Float32BufferAttribute, 
    InstancedBufferAttribute, 
    InstancedMesh,
    Matrix4,
    MathUtils,
    Quaternion, 
    ShaderMaterial,
    ShapeGeometry, 
    Vector3,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
 } from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { calculateBoundsWithOffset } from './utils.js';

class StarField {
    constructor(scene, context) {
        // Star Constants
        const numStars = 200;
        const starDistance = 300;
        const fadeInTime = 1000;
        
        const ySpread = Math.tan(context.verticalFOV / 2) * starDistance;
        const xSpread = Math.tan(context.horizontalFOV / 2) * starDistance;

        let starWidth = undefined;
        let starHeight = undefined;

        const starPositions = [];
        const fadeOffsets = [];
        const starScales = [];

        // Text Position Constants - convert from screen space to world space
        const primaryTextOffset = {
            top: 0,
            bottom: -7.5,
            left: -5,
            right: 5,
        }

        const primaryTextBounds = calculateBoundsWithOffset(
                context.sceneCenter, 
                context.splashTextBounds, 
                context.splashBounds,
                context.horizontalFOV,
                context.verticalFOV, 
                starDistance,
                primaryTextOffset
            )

        const secondaryTextOffset = {
            top: -5,
            bottom: 0,
            left: -5,
            right: 5,
        }

        const secondaryTextBounds = calculateBoundsWithOffset(
                context.sceneCenter,
                context.splashTextSecondaryBounds,
                context.splashBounds,
                context.horizontalFOV,
                context.verticalFOV,
                starDistance,
                secondaryTextOffset
            )

        
        // Draw box3 of text bounds
        const boxGeometry = new BoxGeometry(primaryTextBounds.right - primaryTextBounds.left, primaryTextBounds.top - primaryTextBounds.bottom, 0);
        // Only draw the lines of the box
        const boxMaterial = new MeshBasicMaterial({ color: 0xffffff, wireframe: true, depthWrite: false });
        const boxMesh = new Mesh(boxGeometry, boxMaterial);
        boxMesh.position.set((primaryTextBounds.right + primaryTextBounds.left) / 2, (primaryTextBounds.top + primaryTextBounds.bottom) / 2, -starDistance);
        //scene.add(boxMesh);

        // dRAW BOX3 OF TEXT BOUNDS
        const boxGeometry2 = new BoxGeometry(secondaryTextBounds.right - secondaryTextBounds.left, secondaryTextBounds.top - secondaryTextBounds.bottom, 0);
        // Only draw the lines of the box
        const boxMaterial2 = new MeshBasicMaterial({ color: 0xffffff, wireframe: true, depthWrite: false });
        const boxMesh2 = new Mesh(boxGeometry2, boxMaterial2);
        boxMesh2.position.set((secondaryTextBounds.right + secondaryTextBounds.left) / 2, (secondaryTextBounds.top + secondaryTextBounds.bottom) / 2, -starDistance);
        //scene.add(boxMesh2);

        //camera.updateMatrixWorld();
        //camera.updateProjectionMatrix();
        const vertexShader = `
            attribute float fadeOffset;
            varying float vFadeOffset;

            void main() {
                vFadeOffset = fadeOffset;
                gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
            }`
            
        const fragmentShader = `
            uniform float uTimeElapsed;
            uniform float uStartTime;
            uniform float fadeInTime;
            varying float vFadeOffset;
            
            void main() {
                gl_FragColor = vec4(1.0, 1.0, 1.0, clamp((uTimeElapsed - vFadeOffset) / (fadeInTime), 0.0, 1.0));
            }`
            
        const shaderMaterial = new ShaderMaterial({
            uniforms: {
                uTimeElapsed: { type: 'f',  value: 0 },
                uStartTime: { type: 'f', value: Date.now() },
                fadeInTime: { type: 'f', value: fadeInTime },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            side: DoubleSide,
            depthWrite: false,
        });
        
        // Instanced Geometry Setup
        const randomizeInstanceAttributes = (i, matrix) => {
            const position = new Vector3();
            const scale = new Vector3();
            let validPosition = false;
            let scaleFactor = starScales[i];
            scale.x = scale.y = scale.z = scaleFactor;
            
            let tolerance = {
                top: (ySpread) + (starHeight * 1.1 * scaleFactor),
                bottom: (ySpread) - (starHeight * 1.1 * scaleFactor),
                left: (xSpread) + (starWidth * 1.1 * scaleFactor),
                right: (xSpread) - (starWidth * 1.1 * scaleFactor),
            }

            // Validate Position
            while (!validPosition) {
                position.x = MathUtils.randFloatSpread(2 * xSpread);
                position.y = MathUtils.randFloatSpread(2 * ySpread); 

                validPosition =  starFieldFadeOut(position, ySpread) && 
                    checkTextCollision(position, primaryTextBounds, secondaryTextBounds) && 
                    checkStarPosition(position, tolerance) && 
                    checkForCollisions(position, starPositions, starWidth, starHeight, scaleFactor)
            }
            position.z = -starDistance;

            matrix.compose(position, new Quaternion(), scale);
        };

        // Star Setup
        const loader = new SVGLoader();
        loader.load('/src/assets/star.svg', (data) => {
            const svgPaths = data.paths;

            // Create a custom geometry from the SVG path data
            const vertices = [];

            const path = svgPaths[0];
            const shape = path.toShapes(true)[0];

            const points = shape.extractPoints().shape;
            const shapeGeometry = new ShapeGeometry(shape);
            
            const maxX = Math.max(...points.map(point => point.x));
            const minX = Math.min(...points.map(point => point.x));
            const maxY = Math.max(...points.map(point => point.y));
            const minY = Math.min(...points.map(point => point.y));

            const xCenter = (maxX + minX) / 2;
            const yCenter = (maxY + minY) / 2;

            for (const point of points) {
                // Add points, centered around origin
                vertices.push(point.x - xCenter, point.y - yCenter, 0);
            }

            const starGeometry = new BufferGeometry().copy(shapeGeometry);
            starGeometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
            // Create random fade in times - 100 - 300, for the number of stars
            for (let i = 0; i < numStars; i++) {
                let scaleFactor = Math.random() ** 2.5;
                scaleFactor = scaleFactor < 0.2 ? 0.2 : scaleFactor;
                starScales[i] = scaleFactor;
                const fadeOverride = Math.random();
                const fadeOffset = (1 - ((fadeOverride < 0.8 ? scaleFactor : 1) * Math.random() ** 2)) * 8000;
                fadeOffsets.push(fadeOffset + 1000);
            }

            this.maxFadeTime = Math.max(...fadeOffsets) + fadeInTime;
            console.log(this.maxFadeTime);
            starGeometry.setAttribute('fadeOffset', new InstancedBufferAttribute(new Float32Array(fadeOffsets), 1));

            // Compute the bounding box to determine proper positions
            starGeometry.computeBoundingBox();
            const boundingBox = starGeometry.boundingBox;
            starWidth = boundingBox.max.x - boundingBox.min.x;
            starHeight = boundingBox.max.y - boundingBox.min.y;

            // Create a mesh from the geometry
            const starMesh = new InstancedMesh(starGeometry, shaderMaterial, numStars);
            const matrix = new Matrix4();

            // Set the instance attribute for each star
            for (let i = 0; i < numStars; i++) {
                randomizeInstanceAttributes(i, matrix);
                starMesh.setMatrixAt(i, matrix);
            }
            starPositions.length = 0;

            starMesh.instanceMatrix.needsUpdate = true;
            scene.add(starMesh);
            this.mesh = starMesh;
        });
    }

}

function checkStarPosition(position, tolerance) {
    // Check against vertical bounds
    if (position.y < tolerance.top && position.y > tolerance.bottom) {
        return false;
    }

    // Check against horizontal bounds
    if (position.x < tolerance.right && position.x > tolerance.left) {
        return false;
    }

    return true;
}

function checkForCollisions(position, starPositions, starWidth, starHeight, scaleFactor) {
    // Compute star's bounding box
    const starBox = new Box3().setFromCenterAndSize(position, new Vector3(starWidth * scaleFactor, starHeight * scaleFactor, 0));
                    
    for (const star of starPositions) {
        if (starBox.intersectsBox(star) || starBox.containsBox(star)) {
            return false;
        }
    }
    
    starPositions.push(starBox);
    return true;
}

function starFieldFadeOut(position, ySpread) {
    if (position.y < 0) {
        var distanceProportion = (-position.y) / (ySpread);
        distanceProportion =  (1 - distanceProportion);
        const randomProportion = Math.random() ** 1.2;
        
        if (randomProportion < distanceProportion) {
            return true;
        } else {
            return false;
        }
    }

    return true;
}

function checkTextCollision(position, primaryTextBounds, secondaryTextBounds) {
    // Check against primary text
    if (position.x < primaryTextBounds.right && position.x > primaryTextBounds.left) {
        if (position.y < primaryTextBounds.top && position.y > primaryTextBounds.bottom) {
            return false;
        }
    }
    
    // Check against secondary text
    if (position.x < secondaryTextBounds.right && position.x > secondaryTextBounds.left) {
        if (position.y < secondaryTextBounds.top && position.y > secondaryTextBounds.bottom) {
            return false;
        }
    }

    return true;
}

export default StarField;