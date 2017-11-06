var TH = {
    threediv : null,
    width : null,
    height : null,
    scene : null,
    camera : null,
    renderer : null,
    texloader : null,
    textures : {
        wall1 : null
    },
    materials : {
        wall1 : null
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
        TH.textures.wall1 = TH.texloader.load('img/wall1.png');
        TH.textures.wall1.wrapS = THREE.RepeatWrapping;
        TH.textures.wall1.wrapT = THREE.RepeatWrapping;
        TH.textures.wall1.repeat.set(1, 1);
        TH.textures.wall1.magFilter = THREE.NearestFilter;
        TH.materials.wall1 = new THREE.MeshBasicMaterial({color: 0xffffff, flatShading: true, overdraw: 0.5, map: TH.textures.wall1});
    },
    run : function(update) {
        requestAnimationFrame( function(){TH.run(update)} );
        update();
        TH.renderer.render( TH.scene, TH.camera );
    },
    addWall : function(x, z, width, depth, height) {
        var geometry = new THREE.BoxGeometry(width, height, depth);
        var box = new THREE.Mesh( geometry, TH.materials.wall1 );
        box.position.set(x, 0, z);
        TH.scene.add(box);
    }
}

