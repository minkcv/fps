function createPlayer(x, z, angle) {
    MA.createPlayer(x, z, angle);
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
    TH.camera.rotation.y = -MA.player.angle + (3 * Math.PI / 2);
}

function addWall(x, z, width, height, depth) {
    TH.addWall(x, z, width, height, depth);
    MA.addBox(x, z, width, depth);
}

function addSprite(x, y, z, width, height, scale, textureName, tilesX, tilesY, tilesTotal, duration, body, creature) {
    var sprite = TH.addSprite(x, y, z, width, height, scale, textureName, tilesX, tilesY, tilesTotal, duration);
    if (creature)
        MA.addCircle(x, z, 10, sprite);
    else if (body)
        MA.addCircle(x, z, 10);
}
function addTorch (x, z) { addSprite(x, -8, z, 1, 2, 1, 'torch.png', 4, 1, 4, 200, true)}
function addSlug (x, y, z) { addSprite(x, y, z, 2, 1, 0.4, 'slug.png', 4, 1, 4, 200, true, true)}
function addLadder (x, z) { addSprite(x, 0, z, 2, 4, 0.6, 'ladder.png', true)}
function addEKG (x, z) { addSprite(x, -14, z, 2, 4, 0.3, 'ekg.png', 4, 1, 4, 200, true)}
function addGenerator (x, z) { addSprite(x, -14, z, 2, 4, 0.4, 'generator.png', 2, 1, 2, 300, true)}
function addStalagtite (x, y, z) { addSprite(x, y, z, 1, 2, 0.5, 'stalagtite' + (Math.floor(Math.random() * 4) + 1) + '.png')}
function addLamp (x, z) { addSprite(x, -18, z, 1, 2, 0.5, 'lamp.png', 2, 1, 2, 800, true)}
function addScrap (x, z) { addSprite(x, -20, z, 1, 2, 0.5, 'scrap' + (Math.floor(Math.random() * 2) + 1) + '.png', 0, 0, 0, 0, true)}
function addPipe (x, z) { addSprite(x, 0, z, 0.75, 3, 1, 'pipe' + (Math.floor(Math.random() * 4) + 1) + '.png', 0, 0, 0, 0, true)}
function addPebble(x, z) { addSprite(x, -30, z, 1, 1, 1, 'pebble.png')}

function addWallShape(x, y, z, height, points, textureNames, addBodies) {
    for (key in points) {
        var point = points[key];
        if (point.next < 0)
            continue;
        var next = points[points[key].next];
        var p1 = {x: point.x + x, y: point.y + z};
        var p2 = {x: next.x + x, y: next.y + z};
        var textureName = textureNames[Math.floor(Math.random() * textureNames.length)];
        TH.addWallPlane(p1, p2, height, textureName, y);
        if (addBodies)
            MA.addWall(p1, p2);
    }
}
function addAnimatedWall(p1, p2, y, height, textureName, tilesX, tilesY, totalTiles, delay, addBody) {
    if (addBody)
        MA.addWall(p1, p2);
    TH.addAnimatedPlane(p1, p2, y, height, textureName, tilesX, tilesY, totalTiles, delay);
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
    if (debug && keys.shift in keysDown)
        moveSpeed = 4;

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

    if (debug) {
        MA.updateView();
        updateDebug();
    }

    TH.update();
}

function init() {
    MA.init();
    TH.init();
    //loadLevel1();
    //TH.clearScene();
    //MA.clearWorld();
    //loadLevel2();
    loadLevel2();
    loadLevel3();
}
init();

MA.run();
TH.run(update);
