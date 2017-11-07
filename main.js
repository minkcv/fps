function addWall(x, z, width, height, depth) {
    TH.addWall(x, z, width, height, depth);
    MA.addBox(x, z, width, depth);
}

function addWallShape(x, z, points, height) {
    var point = null;
    var firstPoint = null;
    var currentPoint = null;
    var arrPoints = [];
    var index = 0;
    for (key in points) {
        arrPoints.push(points[key]);
        if (point == null) {
            point = points[key];
            firstPoint = point;
            continue;
        }
        currentPoint = points[key];
        TH.addWallPlane(point, currentPoint, 50);
        point = currentPoint;
    }
    TH.addWallPlane(firstPoint, currentPoint, 50);
    MA.addFromPoints(x, z, arrPoints);
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
    TH.addFloor();
    addWall(-100, 100, 50, 50, 50);
    addWall(100, -100, 50, 50, 50);
    addWall(100, 100, 50, 50, 50);
    var points = {"0":{"x":221,"y":31},"1":{"x":194,"y":62},"2":{"x":212,"y":90},"3":{"x":256,"y":97},"4":{"x":271,"y":66}};
    var minX = Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    for (key in points) {
        var point = points[key];
        if (point.x < minX)
            minX = point.x;
        if (point.y < minY)
            minY = point.y;
    }
    // todo, find the midpoint of the shape?
    addWallShape(minX, minY, points, 50);
}
init();

MA.run();
TH.run(update);

