var TH = {
    threediv : null,
    width : null,
    height : null,
    scene : null,
    camera : null,
    renderer : null,
    texloader : null,
    textures : {
    },
    materials : {
    },

    init : function () {
        TH.threediv = document.getElementById('3d'),
        TH.width = TH.threediv.clientWidth;
        TH.height = TH.threediv.clientHeight;
        TH.scene = new THREE.Scene();
        TH.camera = new THREE.PerspectiveCamera(45, TH.width / TH.height, 0.1, 1000);
        TH.scene.add(TH.camera);
        TH.camera.rotateY(-3.14 / 2);

        TH.renderer = new THREE.WebGLRenderer();
        TH.renderer.setSize(TH.width, TH.height);
        TH.threediv.appendChild(TH.renderer.domElement);

        TH.texloader = new THREE.TextureLoader();
        TH.textures.floor = TH._loadTexture('floor.png', 4);
        TH.materials.floor = new THREE.MeshBasicMaterial({color: 0xffffff, flatShading: true, overdraw: 0.5, map: TH.textures.floor});
        TH.textures.wall1 = TH._loadTexture('wall1.png');
        TH.textures.wall2 = TH._loadTexture('wall2.png');
        TH.materials.wall1 = new THREE.MeshBasicMaterial({color: 0xffffff, flatShading: true, overdraw: 0.5, map: TH.textures.wall1, side: THREE.DoubleSide});
        TH.materials.wall2 = new THREE.MeshBasicMaterial({color: 0xffffff, flatShading: true, overdraw: 0.5, map: TH.textures.wall2, side: THREE.DoubleSide});
    },
    _loadTexture : function(name, repeatN) {
        var tex = TH.texloader.load('art/' + name);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1, 1);
        if (repeatN)
            tex.repeat.set(repeatN, repeatN);
        tex.magFilter = THREE.NearestFilter;
        return tex;
    },
    run : function(update) {
        requestAnimationFrame( function(){TH.run(update)} );
        update();
        TH.renderer.render( TH.scene, TH.camera );
    },
    addWall : function(x, z, width, depth, height) {
        var texIndex = Math.floor(Math.random() * 2) + 1;
        var geometry = new THREE.BoxGeometry(width, height, depth);
        var box = new THREE.Mesh( geometry, TH.materials['wall' + texIndex] );
        box.position.set(x, 0, z);
        TH.scene.add(box);
    },
    distance: function(p1, p2) {
        var dx = Math.abs(p1.x - p2.x);
        var dy = Math.abs(p1.y - p2.y);
        return Math.sqrt(dx * dx + dy * dy);
    },
    addWallPlane : function(p1, p2, height) {
        var geometry = new THREE.PlaneGeometry(TH.distance(p1, p2), height)
        var plane = new THREE.Mesh(geometry, TH.materials.wall2);
        var midpoint = {x: p1.x + (p2.x - p1.x) / 2, y: p1.y + (p2.y - p1.y) / 2};
        plane.position.x = midpoint.x;
        plane.position.z = midpoint.y;
        var angle = -Math.atan((p2.y - p1.y) / (p2.x - p1.x));
        plane.rotateY(angle);
        TH.scene.add(plane);
    },
    addFloor : function () {
        var geometry = new THREE.PlaneGeometry(250, 250);
        var floor = new THREE.Mesh( geometry, TH.materials.floor );
        floor.position.set(0, -25, 0);
        floor.rotation.x = -Math.PI / 2;
        TH.scene.add(floor);
    }
}

