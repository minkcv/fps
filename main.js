function createPlayer(x, z, angle) {
    MA.createPlayer(x, z, angle);
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
    TH.camera.rotation.y = -MA.player.angle + (3 * Math.PI / 2);
}

function addWall(x, z, width, height, depth) {
    TH.addWall(x, z, width, height, depth);
    MA.addBox(x, z, width, depth);
}

function addSprite(x, y, z, width, height, scale, textureName, tilesX, tilesY, tilesTotal, duration, creature) {
    var sprite = TH.addSprite(x, y, z, width, height, scale, textureName, tilesX, tilesY, tilesTotal, duration);
    if (creature)
        MA.addCircle(x, z, 10, sprite);
    else
    MA.addCircle(x, z, 10);
}
function addTorch (x, z) { addSprite(x, -8, z, 1, 2, 1, 'torch.png', 4, 1, 4, 200)}
function addSlug (x, z) { addSprite(x, -25, z, 2, 1, 0.4, 'slug.png', 4, 1, 4, 200, true)}
function addLadder (x, z) { addSprite(x, 0, z, 2, 4, 0.6, 'ladder.png')}
function addEKG (x, z) { addSprite(x, -14, z, 2, 4, 0.3, 'ekg.png', 4, 1, 4, 200)}

function addWallShape(x, z, points, cliff) {
    var y = 0;
    if (cliff)
        y = 2 * TH.floorY;

    for (key in points) {
        var pointPair = points[key];
        var p1 = {x: pointPair.current.x + x, y: pointPair.current.y + z};
        var p2 = {x: pointPair.next.x + x, y: pointPair.next.y + z};
        var wallNumber = Math.floor(Math.random() * 2) + 1;
        var textureName = 'cave_wall' + wallNumber + '.png';
        TH.addWallPlane(p1, p2, TH.floorY * -2, textureName, y);
        MA.addWall(p1, p2);
    }
}

function rotatePlayer(angle) {
    MA.rotatePlayer(-angle);
    TH.camera.rotation.y = -MA.player.angle + (3 * Math.PI / 2);
}

function moveForward(moveSpeed) {
    var xv = Math.cos(MA.player.angle) * moveSpeed;
    var yv = Math.sin(MA.player.angle) * moveSpeed;
    Matter.Body.applyForce(MA.player, MA.player.position, {x: xv, y: yv});
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
}
function moveLeft(moveSpeed) {
    var xv = Math.cos(MA.player.angle - Math.PI / 2) * moveSpeed;
    var yv = Math.sin(MA.player.angle - Math.PI / 2) * moveSpeed;
    Matter.Body.applyForce(MA.player, MA.player.position, {x: xv, y: yv});
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
}
function moveRight(moveSpeed) {
    var xv = Math.cos(MA.player.angle + Math.PI / 2) * moveSpeed;
    var yv = Math.sin(MA.player.angle + Math.PI / 2) * moveSpeed;
    Matter.Body.applyForce(MA.player, MA.player.position, {x: xv, y: yv});
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
}

function moveBackward(moveSpeed) {
    var xv = -Math.cos(MA.player.angle) * moveSpeed;
    var yv = -Math.sin(MA.player.angle) * moveSpeed;
    Matter.Body.applyForce(MA.player, MA.player.position, {x: xv, y: yv});
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
}

function update() {
    var moveSpeed = 1;
    if (keys.shift in keysDown)
        moveSpeed = 2;

    if (keys.left in keysDown)
        rotatePlayer(0.03);
    else if (keys.right in keysDown)
        rotatePlayer(-0.03);

    if (keys.w in keysDown)
        moveForward(moveSpeed);
    else if (keys.s in keysDown)
        moveBackward(moveSpeed);

    if (keys.a in keysDown)
        moveLeft(moveSpeed);
    else if (keys.d in keysDown)
        moveRight(moveSpeed);

    MA.updateView();
    TH.update();
    updateDebug();
}

function init() {
    MA.init();
    TH.init();
    loadLevel1();
    //TH.clearScene();
    //MA.clearWorld();
    //loadLevel2();
}
init();

MA.run();
TH.run(update);
