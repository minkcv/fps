var TH = {
    threediv : null,
    width : null,
    height : null,
    scene : null,
    camera : null,
    renderer : null,
    texloader : null,
    floorY : -30,
    materials : {
    },

    init : function () {
        TH.threediv = document.getElementById('3d'),
        TH.width = TH.threediv.clientWidth;
        TH.height = TH.threediv.clientHeight;
        TH.scene = new THREE.Scene();
        TH.scene.background = new THREE.Color(0x0c1013);
        TH.camera = new THREE.PerspectiveCamera(45, TH.width / TH.height, 0.1, 1000);
        TH.scene.add(TH.camera);
        TH.camera.rotateY(-3.14 / 2);

        TH.renderer = new THREE.WebGLRenderer();
        TH.renderer.setSize(TH.width, TH.height);
        TH.threediv.appendChild(TH.renderer.domElement);

        TH.texloader = new THREE.TextureLoader();
        //TH.materials.floor = TH._loadTextureMaterial('floor.png', 0.008, 0.008);
        TH.materials.wall1 = TH._loadTextureMaterial('cave_wall1.png', 1, 1);
        TH.materials.wall2 = TH._loadTextureMaterial('cave_wall2.png', 1, 1);
    },
    _loadTextureMaterial : function(name, repeatX, repeatY) {
        var texture = TH._loadTexture(name, repeatX, repeatY);
        return new THREE.MeshBasicMaterial({color: 0xffffff, flatShading: true, overdraw: 0.5, map: texture, side: THREE.DoubleSide});
    },
    _loadTexture : function(name, repeatX, repeatY) {
        var tex = TH.texloader.load('art/' + name);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(repeatX, repeatY);
        tex.magFilter = THREE.NearestFilter;
        tex.minFilter = THREE.NearestFilter;
        return tex;
    },
    run : function(update) {
        requestAnimationFrame( function(){TH.run(update)} );
        update();
        TH.renderer.render( TH.scene, TH.camera );
    },
    addWall : function(x, z, width, height, depth) {
        var texIndex = Math.floor(Math.random() * 2) + 1;
        var geometry = new THREE.BoxGeometry(width, height, depth);
        var box = new THREE.Mesh( geometry, TH.materials['wall' + texIndex] );
        box.position.set(x, TH.floorY + height / 2, z);
        TH.scene.add(box);
    },
    distance: function(p1, p2) {
        var dx = Math.abs(p1.x - p2.x);
        var dy = Math.abs(p1.y - p2.y);
        return Math.sqrt(dx * dx + dy * dy);
    },
    addWallPlane : function(p1, p2, height) {
        var length = TH.distance(p1, p2);
        var geometry = new THREE.PlaneGeometry(length, height);
        var repeat = Math.floor(length / height);
        var mat = TH._loadTextureMaterial('cave_wall1.png', repeat || 1, 1);
        var plane = new THREE.Mesh(geometry, mat);
        var midpoint = {x: p1.x + (p2.x - p1.x) / 2, y: p1.y + (p2.y - p1.y) / 2};
        plane.position.x = midpoint.x;
        plane.position.z = midpoint.y;
        var angle = -Math.atan((p2.y - p1.y) / (p2.x - p1.x));
        plane.rotateY(angle);
        TH.scene.add(plane);
    },
    addFloor : function (x, y, z, width, depth, image) {
        var repeatX = Math.floor(width / 100);
        var repeatY = Math.floor(depth / 100);
        TH.materials.floor = TH._loadTextureMaterial(image, repeatX || 1, repeatY || 1);
        var geometry = new THREE.PlaneGeometry(width, depth);
        var floor = new THREE.Mesh( geometry, TH.materials.floor );
        floor.position.set(x, y, z);
        floor.rotation.x = -Math.PI / 2;
        TH.scene.add(floor);
    },
    addFloorFromPoints : function(x, z, points) {
        var thPoints = [];
        for (var index in points) {
            var point = points[index];
            thPoints.push(new THREE.Vector2(point.x + x, point.y + z));
        }
        var shape = new THREE.Shape(thPoints);
        var geometry = new THREE.ShapeGeometry(shape);
        var floor = new THREE.Mesh(geometry, TH.materials.floor );
        floor.position.y = TH.floorY;
        floor.rotation.x = Math.PI / 2;
        TH.scene.add(floor);
    }
}

