function addWall(x, z, width, height, depth) {
    TH.addWall(x, z, width, height, depth);
    MA.addBox(x, z, width, depth);
}

function addSprite(x, z) {
    TH.addSprite(x, z);
    MA.addCircle(x, z, 10);
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
        TH.addWallPlane({x: prevPoint.x + offset.x, y: prevPoint.y + offset.y}, {x: currentPoint.x + offset.x, y: currentPoint.y + offset.y}, TH.floorY * -2);
        prevPoint = currentPoint;
    }
    TH.addWallPlane({x: firstPoint.x + offset.x, y: firstPoint.y + offset.y}, {x: currentPoint.x + offset.x, y: currentPoint.y + offset.y}, TH.floorY * -2);
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

    MA.updateView();
    TH.update();
}

function init() {
    MA.init();
    TH.init();
    TH.camera.position.set(MA.player.position.x, 0, MA.player.position.y);
    TH.camera.rotation.y = -MA.player.angle + (3 * Math.PI / 2);
    //addWall(-100, 100, 50, 50, 50);
    //addWall(100, -100, 50, 150, 50);
    //var points = {"0":{"x":55,"y":2},"1":{"x":0,"y":47},"2":{"x":18,"y":112},"3":{"x":73,"y":111},"4":{"x":94,"y":66}};
    //addWallShape(-100, -100, points, 50);
    //var shape2 = {"0":{"x":4,"y":54},"1":{"x":51,"y":4},"2":{"x":121,"y":6},"3":{"x":120,"y":56}};
    //TH.addFloorFromPoints(0, 0, shape2);
    //var concave = {"0":{"x":2,"y":4},"1":{"x":1,"y":110},"2":{"x":115,"y":109},"3":{"x":114,"y":44},"4":{"x":55,"y":41},"5":{"x":55,"y":4}};
    //addWallShape(100, 100, concave, 50);
    var maze = {"0":{"x":33,"y":38},"1":{"x":88,"y":42},"2":{"x":91,"y":109},"3":{"x":39,"y":108},"4":{"x":41,"y":230},"5":{"x":91,"y":231},"6":{"x":93,"y":329},"7":{"x":144,"y":325},"8":{"x":144,"y":408},"9":{"x":44,"y":408},"10":{"x":42,"y":562},"11":{"x":209,"y":560},"12":{"x":206,"y":327},"13":{"x":262,"y":322},"14":{"x":261,"y":224},"15":{"x":142,"y":224},"16":{"x":141,"y":109},"17":{"x":342,"y":102},"18":{"x":343,"y":321},"19":{"x":258,"y":402},"20":{"x":255,"y":494},"21":{"x":349,"y":542},"22":{"x":462,"y":544},"23":{"x":540,"y":495},"24":{"x":541,"y":396},"25":{"x":478,"y":320},"26":{"x":478,"y":261},"27":{"x":564,"y":260},"28":{"x":565,"y":358},"29":{"x":626,"y":355},"30":{"x":624,"y":426},"31":{"x":569,"y":426},"32":{"x":562,"y":553},"33":{"x":672,"y":559},"34":{"x":702,"y":516},"35":{"x":738,"y":516},"36":{"x":742,"y":447},"37":{"x":683,"y":426},"38":{"x":673,"y":353},"39":{"x":740,"y":348},"40":{"x":738,"y":196},"41":{"x":480,"y":185},"42":{"x":470,"y":95},"43":{"x":562,"y":89},"44":{"x":639,"y":141},"45":{"x":734,"y":152},"46":{"x":781,"y":124},"47":{"x":812,"y":127},"48":{"x":815,"y":227},"49":{"x":773,"y":283},"50":{"x":767,"y":443},"51":{"x":813,"y":468},"52":{"x":808,"y":544},"53":{"x":842,"y":571},"54":{"x":876,"y":572},"55":{"x":880,"y":462},"56":{"x":841,"y":412},"57":{"x":840,"y":314},"58":{"x":890,"y":251},"59":{"x":889,"y":121},"60":{"x":943,"y":120},"61":{"x":939,"y":187},"62":{"x":986,"y":186},"63":{"x":984,"y":232},"64":{"x":941,"y":232},"65":{"x":936,"y":293},"66":{"x":935,"y":355},"67":{"x":886,"y":357},"68":{"x":888,"y":404},"69":{"x":937,"y":431},"70":{"x":934,"y":485},"71":{"x":988,"y":488},"72":{"x":992,"y":433},"73":{"x":1052,"y":431},"74":{"x":1057,"y":491},"75":{"x":1053,"y":525},"76":{"x":938,"y":529},"77":{"x":939,"y":562},"78":{"x":1073,"y":570},"79":{"x":1123,"y":518},"80":{"x":1106,"y":391},"81":{"x":1011,"y":365},"82":{"x":1009,"y":307},"83":{"x":1071,"y":305},"84":{"x":1127,"y":306},"85":{"x":1141,"y":428},"86":{"x":1173,"y":421},"87":{"x":1159,"y":243},"88":{"x":1047,"y":230},"89":{"x":1044,"y":179},"90":{"x":1145,"y":177},"91":{"x":1143,"y":115},"92":{"x":1006,"y":112},"93":{"x":1001,"y":45},"94":{"x":145,"y":34},"95":{"x":143,"y":2},"96":{"x":1182,"y":19},"97":{"x":1196,"y":583},"98":{"x":15,"y":586},"99":{"x":1,"y":88}};
    addWallShape(30, -150, maze, 50);
    var maze2 = {"0":{"x":1118,"y":598},"1":{"x":3,"y":601},"2":{"x":2,"y":1},"3":{"x":1197,"y":3},"4":{"x":1194,"y":578},"5":{"x":1175,"y":577},"6":{"x":1176,"y":499},"7":{"x":1039,"y":499},"8":{"x":1039,"y":419},"9":{"x":1123,"y":419},"10":{"x":1123,"y":377},"11":{"x":1176,"y":377},"12":{"x":1176,"y":307},"13":{"x":1065,"y":307},"14":{"x":1065,"y":240},"15":{"x":981,"y":240},"16":{"x":981,"y":497},"17":{"x":924,"y":497},"18":{"x":924,"y":427},"19":{"x":863,"y":427},"20":{"x":863,"y":289},"21":{"x":936,"y":289},"22":{"x":936,"y":196},"23":{"x":1104,"y":196},"24":{"x":1104,"y":273},"25":{"x":1178,"y":273},"26":{"x":1178,"y":196},"27":{"x":1178,"y":101},"28":{"x":1178,"y":19},"29":{"x":1096,"y":19},"30":{"x":1096,"y":102},"31":{"x":1019,"y":102},"32":{"x":937,"y":102},"33":{"x":865,"y":102},"34":{"x":865,"y":187},"35":{"x":801,"y":187},"36":{"x":801,"y":49},"37":{"x":736,"y":49},"38":{"x":736,"y":121},"39":{"x":665,"y":121},"40":{"x":665,"y":178},"41":{"x":665,"y":242},"42":{"x":737,"y":242},"43":{"x":737,"y":299},"44":{"x":807,"y":299},"45":{"x":807,"y":417},"46":{"x":725,"y":417},"47":{"x":725,"y":492},"48":{"x":643,"y":492},"49":{"x":643,"y":417},"50":{"x":643,"y":318},"51":{"x":601,"y":318},"52":{"x":601,"y":219},"53":{"x":601,"y":116},"54":{"x":601,"y":30},"55":{"x":469,"y":30},"56":{"x":410,"y":89},"57":{"x":410,"y":206},"58":{"x":481,"y":308},"59":{"x":481,"y":363},"60":{"x":433,"y":363},"61":{"x":433,"y":305},"62":{"x":372,"y":305},"63":{"x":372,"y":86},"64":{"x":274,"y":86},"65":{"x":274,"y":171},"66":{"x":330,"y":171},"67":{"x":330,"y":401},"68":{"x":477,"y":401},"69":{"x":477,"y":445},"70":{"x":558,"y":445},"71":{"x":558,"y":484},"72":{"x":326,"y":484},"73":{"x":260,"y":484},"74":{"x":260,"y":238},"75":{"x":223,"y":238},"76":{"x":223,"y":124},"77":{"x":180,"y":124},"78":{"x":180,"y":285},"79":{"x":223,"y":285},"80":{"x":223,"y":477},"81":{"x":148,"y":477},"82":{"x":148,"y":89},"83":{"x":227,"y":89},"84":{"x":227,"y":14},"85":{"x":31,"y":14},"86":{"x":31,"y":69},"87":{"x":79,"y":69},"88":{"x":79,"y":170},"89":{"x":106,"y":170},"90":{"x":106,"y":246},"91":{"x":60,"y":303},"92":{"x":25,"y":303},"93":{"x":25,"y":391},"94":{"x":105,"y":391},"95":{"x":105,"y":497},"96":{"x":43,"y":497},"97":{"x":43,"y":568},"98":{"x":355,"y":568},"99":{"x":355,"y":535},"100":{"x":559,"y":535},"101":{"x":559,"y":580},"102":{"x":781,"y":580},"103":{"x":781,"y":504},"104":{"x":861,"y":504},"105":{"x":861,"y":582},"106":{"x":1118,"y":582}};
    addWallShape(-1100, -765, maze2, 50);
    TH.addFloor(0, TH.floorY, 0, 3500, 2500, 'floor.png');
    TH.addFloor(0, -TH.floorY, 0, 3500, 2500, 'ceiling.png');
    addSprite(-20, -190, 5);
}
init();

MA.run();
TH.run(update);

