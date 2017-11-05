function addBox(x, z, width, height, depth) {
    TH.addBox(x, z, width, height, depth);
    MA.addBox(x, z, width, depth);
}

function rotatePlayer(angle) {
    Matter.Body.rotate(MA.player, -angle);
    TH.camera.rotation.y = -MA.player.angle + (3 * Math.PI / 2);
}

function moveForward() {
    var xv = Math.cos(MA.player.angle) ;
    var yv = Math.sin(MA.player.angle) ;
    Matter.Body.applyForce(MA.player, MA.player.position, {x: xv, y: yv});
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
}

function moveBackward() {
    var xv = -Math.cos(MA.player.angle) ;
    var yv = -Math.sin(MA.player.angle) ;
    Matter.Body.applyForce(MA.player, MA.player.position, {x: xv, y: yv});
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
}

function update() {
    if (keys.left in keysDown)
        rotatePlayer(0.03);
    else if (keys.right in keysDown)
        rotatePlayer(-0.03);
    if (keys.up in keysDown)
        moveForward();
    else if (keys.down in keysDown)
        moveBackward();
}

function init() {
    MA.init();
    TH.init();
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
    TH.camera.rotation.y = -MA.player.angle + (3 * Math.PI / 2);
    addBox(100, 100, 50, 50, 50);
}
init();

MA.run();
TH.run(update);

