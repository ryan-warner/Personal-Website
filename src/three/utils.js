import { Vector3 } from "three";

export function positionPlane(planes, context) {
    const planeDistance = 100;
    const sceneOffset = 10; // Initial offset from the scene bounds
    const speed = Math.random() * 0.15 + 0.15;
    let position;
    let heading;

    var validPosition = false;
    
    while (!validPosition) {
        const worldSceneBounds = calculateBounds(context.sceneCenter, context.splashBounds, context.splashBounds, context.horizontalFOV, context.verticalFOV, planeDistance);
        const worldTextBounds = calculateBounds(context.sceneCenter, context.splashTextBounds, context.splashBounds, context.horizontalFOV, context.verticalFOV, planeDistance);
        const worldTextSecondaryBounds = calculateBounds(context.sceneCenter, context.splashTextSecondaryBounds, context.splashBounds, context.horizontalFOV, context.verticalFOV, planeDistance);
        //console.log(worldSceneBounds)
        position = new Vector3(0, 0, -planeDistance);
        // Decide whether to place aircraft on the left, right, or top
        const side = 1//Math.floor(Math.random() * 2) + 1 // No top for now
        switch (side) {
            case 1: // Left
                position.x = worldSceneBounds.left - sceneOffset;
                position.y = Math.random() * (worldSceneBounds.top + sceneOffset - ((worldSceneBounds.bottom) * 2/3)) + (worldSceneBounds.bottom * 2/3);
                // Random heading, with a tendency to fly to the middle of the screen
                heading = 80.0;//(Math.random() * 160) + 10;
                //console.log(position)//heading = Math.random() * 360;
                break;
            case 2: // Right
                position.x = worldSceneBounds.right + sceneOffset;
                position.y = Math.random() * (worldSceneBounds.top + sceneOffset - ((worldSceneBounds.bottom) * 2/3)) + (worldSceneBounds.bottom * 2/3);
                heading = (Math.random() * 160) + 190;
                break;
            case 3: // Top
                position.x = Math.random() * (worldSceneBounds.right + sceneOffset) - (worldSceneBounds.right + sceneOffset);
                position.y = worldSceneBounds.top + sceneOffset;
                heading = (Math.random() * 160) + 100;
                break;
        }

        validPosition = checkFlightPath(position, heading, worldSceneBounds, sceneOffset) &&
                        //checkPlaneCollision(position, heading, worldTextBounds) &&
                        //checkPlaneCollision(position, heading, worldTextSecondaryBounds) &&
                        checkFlightPathDistance(position, heading, worldSceneBounds) &&
                        checkInitialLocation(position, planes);
    }
    return { position, heading, speed };
}

function checkFlightPath(position, heading, sceneBounds, sceneOffset) {
    // Check that plane is not flying out of the bottom of the scene, position is initial, heading is the flight direction
    // Calculate the x-intercept of the flight path with the bottom of the scene
    if (heading < 90 || heading > 270) {
        return true;
    }
    const distanceToBottom = position.y - sceneBounds.bottom;
    const xIntercept = position.x - (distanceToBottom * Math.tan((heading - 180) * Math.PI / 180));
    if (xIntercept > (sceneBounds.left - sceneOffset) && xIntercept < (sceneBounds.right + sceneOffset)) {
        return false;
    }

    return true;
}

function checkPlaneCollision(position, heading, textBounds) {
    // Identify where in the x axisplane crosses top and bottom of primaryTextBounds
    //console.log(textBounds);
    const distanceToTop = position.y - textBounds.top;
    const distanceToBottom = position.y - textBounds.bottom;
    const textIntercept = {
        top: position.x - (distanceToTop * Math.tan((heading - 180) * Math.PI / 180)),
        bottom: position.x - (distanceToBottom * Math.tan((heading - 180) * Math.PI / 180)),
    }
    //console.log(textIntercept);

    if (textIntercept.top > textBounds.left && textIntercept.top < textBounds.right) {
        return false;
    }

    // Check if plane will fly through the sides of the text
    const distanceToLeft = textBounds.left - position.x;
    const distanceToRight = textBounds.right - position.x;
    const textInterceptSide = {
        left: position.y - (distanceToLeft * Math.tan(heading * Math.PI / 180)),
        right: position.y - (distanceToRight * Math.tan(heading * Math.PI / 180)),
    }

    if (textInterceptSide.left > textBounds.bottom && textInterceptSide.left < textBounds.top) {
        return false;
    }

    return true;
}

function checkFlightPathDistance(position, heading, sceneBounds) {
    let totalDistance;
    if (heading < 90 || heading > 270) {
        const distanceToTop = Math.abs(position.y - sceneBounds.top);
        totalDistance = distanceToTop / Math.cos(heading * Math.PI / 180);
    } else {
        const distanceToBottom = Math.abs(position.y - sceneBounds.bottom);
        totalDistance = distanceToBottom / Math.cos(heading * Math.PI / 180);
    }
    return totalDistance > (1/3 * (sceneBounds.right - sceneBounds.left));
}

function checkInitialLocation(position, planes) {
    const startOffset = 20;
    for (let i = 0; i < planes.length; i++) {
        const plane = planes[i];
        const distance = Math.sqrt(Math.pow((plane.initialPosition.x - position.x), 2) + Math.pow((plane.initialPosition.y - position.y), 2));
        if (distance < startOffset) {
            return false;
        }
    }

    return true;
}

export function calculateBounds(sceneCenter, elementBounds, parentBounds, horizontalFOV, verticalFOV, planeDistance) {
    return calculateBoundsWithOffset(sceneCenter, elementBounds, parentBounds, horizontalFOV, verticalFOV, planeDistance, {});
}

export function calculateBoundsWithOffset(sceneCenter, elementBounds, parentBounds, horizontalFOV, verticalFOV, planeDistance, offset) {
    const xSpread = Math.tan(horizontalFOV / 2) * planeDistance;
    const ySpread = Math.tan(verticalFOV / 2) * planeDistance;

    return {
        top: (sceneCenter.y - elementBounds.top) / (parentBounds.height / 2) * ySpread + (offset?.top ? offset.top : 0),
        bottom: (sceneCenter.y - elementBounds.bottom) / (parentBounds.height / 2) * ySpread + (offset?.bottom ? offset.bottom : 0),
        left: (elementBounds.left - sceneCenter.x) / (parentBounds.width / 2) * xSpread + (offset?.left ? offset.left : 0),
        right: (elementBounds.right - sceneCenter.x) / (parentBounds.width / 2) * xSpread + (offset?.right ? offset.right : 0),
    }
}