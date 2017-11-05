var TH = {
    threediv : null,
    width : null,
    height : null,
    scene : null,
    camera : null,
    renderer : null,
    material : null,

    init : function () {
        TH.threediv = document.getElementById('3d'),
        TH.width = TH.threediv.clientWidth;
        TH.height = TH.threediv.clientHeight;
        TH.scene = new THREE.Scene();
        TH.camera = new THREE.PerspectiveCamera(45, TH.width / TH.height, 0.1, 1000);
        TH.scene.add(TH.camera);
        TH.camera.rotateY(-3.14 / 2);

        TH.renderer = new THREE.WebGLRenderer({antialias: true});
        TH.renderer.setSize(TH.width, TH.height);
        TH.threediv.appendChild(TH.renderer.domElement);

        TH.material = new THREE.MeshBasicMaterial({color: 0x0000ff, flatShading: true, overdraw: 0.5});
    },
    run : function(update) {
        requestAnimationFrame( function(){TH.run(update)} );
        update();
        TH.renderer.render( TH.scene, TH.camera );
    },
    addBox : function(x, z, width, depth, height) {
        var geometry = new THREE.BoxGeometry(width, height, depth);
        var box = new THREE.Mesh( geometry, TH.material );
        box.position.set(x, 0, z);
        TH.scene.add(box);
    }
}

