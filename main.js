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

function loadLevel1() {
    createPlayer(190, 540, -Math.PI / 2);
    var maze = {"0":{"current":{"x":23,"y":24},"next":{"x":23,"y":112}},"1":{"current":{"x":23,"y":112},"next":{"x":68,"y":112}},"2":{"current":{"x":68,"y":112},"next":{"x":68,"y":166}},"3":{"current":{"x":68,"y":166},"next":{"x":23,"y":166}},"4":{"current":{"x":23,"y":166},"next":{"x":23,"y":242}},"5":{"current":{"x":23,"y":242},"next":{"x":72,"y":242}},"6":{"current":{"x":72,"y":242},"next":{"x":72,"y":302}},"7":{"current":{"x":72,"y":302},"next":{"x":116,"y":302}},"8":{"current":{"x":116,"y":302},"next":{"x":116,"y":335}},"9":{"current":{"x":116,"y":335},"next":{"x":36,"y":335}},"10":{"current":{"x":36,"y":335},"next":{"x":36,"y":388}},"11":{"current":{"x":36,"y":388},"next":{"x":152,"y":388}},"12":{"current":{"x":152,"y":388},"next":{"x":152,"y":418}},"13":{"current":{"x":152,"y":418},"next":{"x":75,"y":418}},"14":{"current":{"x":75,"y":418},"next":{"x":75,"y":548}},"15":{"current":{"x":75,"y":548},"next":{"x":238,"y":548}},"16":{"current":{"x":238,"y":548},"next":{"x":238,"y":385}},"17":{"current":{"x":238,"y":385},"next":{"x":319,"y":385}},"18":{"current":{"x":319,"y":385},"next":{"x":319,"y":460}},"19":{"current":{"x":319,"y":460},"next":{"x":370,"y":460}},"20":{"current":{"x":370,"y":460},"next":{"x":370,"y":544}},"21":{"current":{"x":370,"y":544},"next":{"x":455,"y":544}},"22":{"current":{"x":455,"y":544},"next":{"x":455,"y":403}},"23":{"current":{"x":455,"y":403},"next":{"x":387,"y":403}},"24":{"current":{"x":387,"y":403},"next":{"x":387,"y":332}},"25":{"current":{"x":387,"y":332},"next":{"x":447,"y":332}},"26":{"current":{"x":447,"y":332},"next":{"x":572,"y":332}},"27":{"current":{"x":572,"y":332},"next":{"x":572,"y":417}},"28":{"current":{"x":572,"y":417},"next":{"x":523,"y":417}},"29":{"current":{"x":523,"y":417},"next":{"x":523,"y":574}},"30":{"current":{"x":523,"y":574},"next":{"x":599,"y":574}},"31":{"current":{"x":599,"y":574},"next":{"x":599,"y":509}},"32":{"current":{"x":599,"y":509},"next":{"x":670,"y":509}},"33":{"current":{"x":670,"y":509},"next":{"x":670,"y":560}},"34":{"current":{"x":670,"y":560},"next":{"x":734,"y":560}},"35":{"current":{"x":734,"y":560},"next":{"x":734,"y":411}},"36":{"current":{"x":734,"y":411},"next":{"x":660,"y":411}},"37":{"current":{"x":660,"y":411},"next":{"x":660,"y":285}},"38":{"current":{"x":660,"y":285},"next":{"x":818,"y":285}},"39":{"current":{"x":818,"y":285},"next":{"x":818,"y":449}},"40":{"current":{"x":818,"y":449},"next":{"x":869,"y":449}},"41":{"current":{"x":869,"y":449},"next":{"x":869,"y":503}},"42":{"current":{"x":869,"y":503},"next":{"x":951,"y":503}},"43":{"current":{"x":951,"y":503},"next":{"x":951,"y":390}},"44":{"current":{"x":951,"y":390},"next":{"x":1035,"y":390}},"45":{"current":{"x":1035,"y":390},"next":{"x":1035,"y":574}},"46":{"current":{"x":1035,"y":574},"next":{"x":1173,"y":574}},"47":{"current":{"x":1173,"y":574},"next":{"x":1173,"y":284}},"48":{"current":{"x":1173,"y":284},"next":{"x":1109,"y":284}},"49":{"current":{"x":1109,"y":284},"next":{"x":1109,"y":172}},"50":{"current":{"x":1109,"y":172},"next":{"x":1172,"y":172}},"51":{"current":{"x":1172,"y":172},"next":{"x":1172,"y":49}},"52":{"current":{"x":1172,"y":49},"next":{"x":992,"y":49}},"53":{"current":{"x":992,"y":49},"next":{"x":992,"y":124}},"54":{"current":{"x":992,"y":124},"next":{"x":889,"y":124}},"55":{"current":{"x":889,"y":124},"next":{"x":889,"y":233}},"56":{"current":{"x":889,"y":233},"next":{"x":748,"y":233}},"57":{"current":{"x":748,"y":233},"next":{"x":748,"y":140}},"58":{"current":{"x":748,"y":140},"next":{"x":675,"y":140}},"59":{"current":{"x":675,"y":140},"next":{"x":675,"y":74}},"60":{"current":{"x":675,"y":74},"next":{"x":675,"y":16}},"61":{"current":{"x":675,"y":16},"next":{"x":549,"y":16}},"62":{"current":{"x":549,"y":16},"next":{"x":549,"y":83}},"63":{"current":{"x":549,"y":83},"next":{"x":616,"y":83}},"64":{"current":{"x":616,"y":83},"next":{"x":616,"y":144}},"65":{"current":{"x":616,"y":144},"next":{"x":505,"y":144}},"66":{"current":{"x":505,"y":144},"next":{"x":403,"y":144}},"67":{"current":{"x":403,"y":144},"next":{"x":403,"y":58}},"68":{"current":{"x":403,"y":58},"next":{"x":330,"y":58}},"69":{"current":{"x":330,"y":58},"next":{"x":330,"y":147}},"70":{"current":{"x":330,"y":147},"next":{"x":243,"y":147}},"71":{"current":{"x":243,"y":147},"next":{"x":243,"y":33}},"72":{"current":{"x":243,"y":33},"next":{"x":165,"y":33}},"73":{"current":{"x":165,"y":33},"next":{"x":165,"y":20}},"74":{"current":{"x":165,"y":20},"next":{"x":30,"y":20}},"75":{"current":{"x":30,"y":20},"next":{"x":23,"y":24}},"76":{"current":{"x":214,"y":218},"next":{"x":214,"y":278}},"77":{"current":{"x":214,"y":278},"next":{"x":311,"y":278}},"78":{"current":{"x":311,"y":278},"next":{"x":311,"y":219}},"79":{"current":{"x":311,"y":219},"next":{"x":214,"y":218}},"80":{"current":{"x":421,"y":218},"next":{"x":421,"y":272}},"81":{"current":{"x":421,"y":272},"next":{"x":544,"y":272}},"82":{"current":{"x":544,"y":272},"next":{"x":543,"y":216}},"83":{"current":{"x":543,"y":216},"next":{"x":421,"y":218}}}
    addWallShape(0, 0, maze);
    TH.addFloor(0, TH.floorY, 0, 3500, 2500, 'floor.png');
    TH.addFloor(0, -TH.floorY, 0, 3500, 2500, 'ceiling.png');
    addTorch(150, 440);
    addTorch(230, 440);
    addSlug(400, 270);
    addSlug(640, 470);
    addSlug(200, 370);
    TH.addAnimatedPlane({x: 330, y: 120}, {x: 400, y: 120}, 10, 50, 'fan.png', 2, 1, 2, 300);
    addLadder(680, 270);
    addEKG(300, 300);
}

function loadLevel2() {
    createPlayer(100, 100, Math.PI / 2);
    var shape = {"0":{"current":{"x":90,"y":24},"next":{"x":30,"y":80}},"1":{"current":{"x":30,"y":80},"next":{"x":27,"y":144}},"2":{"current":{"x":27,"y":144},"next":{"x":96,"y":159}},"3":{"current":{"x":96,"y":159},"next":{"x":97,"y":363}},"4":{"current":{"x":97,"y":363},"next":{"x":31,"y":398}},"5":{"current":{"x":31,"y":398},"next":{"x":29,"y":458}},"6":{"current":{"x":29,"y":458},"next":{"x":91,"y":489}},"7":{"current":{"x":91,"y":489},"next":{"x":158,"y":454}},"8":{"current":{"x":158,"y":454},"next":{"x":158,"y":164}},"9":{"current":{"x":158,"y":164},"next":{"x":204,"y":126}},"10":{"current":{"x":204,"y":126},"next":{"x":396,"y":121}},"11":{"current":{"x":396,"y":121},"next":{"x":440,"y":156}},"12":{"current":{"x":440,"y":156},"next":{"x":503,"y":123}},"13":{"current":{"x":503,"y":123},"next":{"x":503,"y":35}},"14":{"current":{"x":503,"y":35},"next":{"x":450,"y":11}},"15":{"current":{"x":450,"y":11},"next":{"x":396,"y":63}},"16":{"current":{"x":396,"y":63},"next":{"x":169,"y":67}},"17":{"current":{"x":169,"y":67},"next":{"x":90,"y":24}}};
    addWallShape(0, 0, shape, true);
    TH.addFloorFromPoints(0, 0, shape);
    var island = {"0":{"current":{"x":398,"y":310},"next":{"x":348,"y":346}},"1":{"current":{"x":348,"y":346},"next":{"x":345,"y":397}},"2":{"current":{"x":345,"y":397},"next":{"x":399,"y":416}},"3":{"current":{"x":399,"y":416},"next":{"x":445,"y":388}},"4":{"current":{"x":445,"y":388},"next":{"x":452,"y":340}},"5":{"current":{"x":452,"y":340},"next":{"x":398,"y":310}}};
    addWallShape(0, 0, island, true);
    TH.addFloorFromPoints(0, 0, island);
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
