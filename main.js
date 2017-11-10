function addWall(x, z, width, height, depth) {
    TH.addWall(x, z, width, height, depth);
    MA.addBox(x, z, width, depth);
}

// points must be packed to +x and +y axes (no padding between shape and origin corner of the canvas)
function addWallShape(x, z, points, height) {
    var prevPoint = null;
    var firstPoint = null;
    var currentPoint = null;
    var arrPoints = [];
    var index = 0;
    for (key in points) 
        arrPoints.push(points[key]);
    
    var offset = MA.addFromPoints(x, z, arrPoints);

    for (key in points) {
        if (prevPoint == null) {
            prevPoint = points[key];
            firstPoint = prevPoint;
            continue;
        }
        currentPoint = points[key];
        TH.addWallPlane({x: prevPoint.x + offset.x, y: prevPoint.y + offset.y}, {x: currentPoint.x + offset.x, y: currentPoint.y + offset.y}, 50);
        prevPoint = currentPoint;
    }
    TH.addWallPlane({x: firstPoint.x + offset.x, y: firstPoint.y + offset.y}, {x: currentPoint.x + offset.x, y: currentPoint.y + offset.y}, 50);
}

function rotatePlayer(angle) {
    Matter.Body.rotate(MA.player, -angle);
    TH.camera.rotation.y = -MA.player.angle + (3 * Math.PI / 2);
}

function moveForward() {
    var xv = Math.cos(MA.player.angle);
    var yv = Math.sin(MA.player.angle);
    Matter.Body.applyForce(MA.player, MA.player.position, {x: xv, y: yv});
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
}
function moveLeft() {
    var xv = Math.cos(MA.player.angle - Math.PI / 2);
    var yv = Math.sin(MA.player.angle - Math.PI / 2);
    Matter.Body.applyForce(MA.player, MA.player.position, {x: xv, y: yv});
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
}
function moveRight() {
    var xv = Math.cos(MA.player.angle + Math.PI / 2);
    var yv = Math.sin(MA.player.angle + Math.PI / 2);
    Matter.Body.applyForce(MA.player, MA.player.position, {x: xv, y: yv});
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
}

function moveBackward() {
    var xv = -Math.cos(MA.player.angle);
    var yv = -Math.sin(MA.player.angle);
    Matter.Body.applyForce(MA.player, MA.player.position, {x: xv, y: yv});
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
}

function update() {
    if (keys.left in keysDown)
        rotatePlayer(0.03);
    else if (keys.right in keysDown)
        rotatePlayer(-0.03);

    if (keys.w in keysDown)
        moveForward();
    else if (keys.s in keysDown)
        moveBackward();

    if (keys.a in keysDown)
        moveLeft();
    else if (keys.d in keysDown)
        moveRight();
}

function init() {
    MA.init();
    TH.init();
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
    TH.camera.rotation.y = -MA.player.angle + (3 * Math.PI / 2);
    addWall(-100, 100, 50, 50, 50);
    addWall(100, -100, 50, 150, 50);
    var points = {"0":{"x":55,"y":2},"1":{"x":0,"y":47},"2":{"x":18,"y":112},"3":{"x":73,"y":111},"4":{"x":94,"y":66}};
    addWallShape(-100, -100, points, 50);
    var shape2 = {"0":{"x":4,"y":54},"1":{"x":51,"y":4},"2":{"x":121,"y":6},"3":{"x":120,"y":56}};
    TH.addFloorFromPoints(0, 0, shape2);
    var concave = {"0":{"x":2,"y":4},"1":{"x":1,"y":110},"2":{"x":115,"y":109},"3":{"x":114,"y":44},"4":{"x":55,"y":41},"5":{"x":55,"y":4}};
    addWallShape(100, 100, concave, 50);
}
init();

MA.run();
TH.run(update);

