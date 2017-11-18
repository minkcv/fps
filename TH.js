var TH = {
    threediv : null,
    width : null,
    height : null,
    scene : null,
    camera : null,
    renderer : null,
    texloader : null,
    floorY : -30,
    clock : null,
    animators : [],

    init : function () {
        TH.threediv = document.getElementById('3d'),
        TH.width = TH.threediv.clientWidth;
        TH.height = TH.threediv.clientHeight;
        TH.scene = new THREE.Scene();
        //TH.scene.background = new THREE.Color(0x0c1013);
        TH.camera = new THREE.PerspectiveCamera(45, TH.width / TH.height, 0.1, 4000);
        TH.scene.add(TH.camera);
        TH.camera.rotateY(-3.14 / 2);

        TH.renderer = new THREE.WebGLRenderer();
        TH.renderer.setSize(TH.width, TH.height);
        TH.threediv.appendChild(TH.renderer.domElement);

        TH.texloader = new THREE.TextureLoader();
        TH.clock = new THREE.Clock();
    },
    _loadTextureMaterial : function(name, repeatX, repeatY) {
        var texture = TH._loadTexture(name, repeatX, repeatY);
        return new THREE.MeshBasicMaterial({color: 0xffffff, flatShading: true, overdraw: 0.5, map: texture, side: THREE.DoubleSide});
    },
    _loadSpriteMaterial : function(name, repeatX, repeatY) {
        var tex = TH._loadTexture(name, repeatX, repeatY);
        return new THREE.SpriteMaterial({map: tex, color: 0xffffff});
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
    addSprite : function(x, y, z, width, height, scale, textureName, tilesX, tilesY, tilesTotal, duration) {
        var tex = TH._loadTexture(textureName, 1, 1);
        if (tilesTotal) {
            var animator = new TextureAnimator(tex, tilesX, tilesY, tilesTotal, duration);
            TH.animators.push(animator);
        }
        var mat = new THREE.SpriteMaterial({map: tex, color: 0xffffff});
        var sprite = new THREE.Sprite(mat);
        sprite.position.x = x;
        sprite.position.z = z;
        sprite.position.y = y;
        sprite.scale.x = width * 25 * scale;
        sprite.scale.y = height * 25 * scale;
        TH.scene.add(sprite);
        return sprite;
    },
    addAnimatedPlane : function(p1, p2, y, height, textureName, tilesX, tilesY, tilesTotal, duration) {
        var tex = TH._loadTexture(textureName, 1, 1);
        if (tilesTotal > 1) {
            var animator = new TextureAnimator(tex, tilesX, tilesY, tilesTotal, duration);
            TH.animators.push(animator);
        }
        var mat = new THREE.MeshBasicMaterial({color: 0xffffff, flatShading: true, overdraw: 0.5, map: tex, side: THREE.DoubleSide, transparent: true});
        var length = distance(p1, p2);
        var geometry = new THREE.PlaneGeometry(length, height);
        var plane = new THREE.Mesh(geometry, mat);
        var midpoint = {x: p1.x + (p2.x - p1.x) / 2, y: p1.y + (p2.y - p1.y) / 2};
        plane.position.x = midpoint.x;
        plane.position.z = midpoint.y;
        var angle = -Math.atan((p2.y - p1.y) / (p2.x - p1.x));
        plane.rotateY(angle);
        plane.position.y = y;
        TH.scene.add(plane);
    },
    addWallPlane : function(p1, p2, height, textureName, y) {
        var length = distance(p1, p2);
        var geometry = new THREE.PlaneGeometry(length, height);
        var repeat = Math.floor(length / height);
        var mat = TH._loadTextureMaterial(textureName, repeat || 1, 1);
        var plane = new THREE.Mesh(geometry, mat);
        var midpoint = {x: p1.x + (p2.x - p1.x) / 2, y: p1.y + (p2.y - p1.y) / 2};
        plane.position.x = midpoint.x;
        plane.position.z = midpoint.y;
        var angle = -Math.atan((p2.y - p1.y) / (p2.x - p1.x));
        plane.rotateY(angle);
        plane.position.y = y;
        TH.scene.add(plane);
    },
    addFloor : function (x, y, z, width, depth, image) {
        var repeatX = Math.floor(width / 100);
        var repeatY = Math.floor(depth / 100);
        var mat = TH._loadTextureMaterial(image, repeatX || 1, repeatY || 1);
        var geometry = new THREE.PlaneGeometry(width, depth);
        var floor = new THREE.Mesh( geometry, mat);
        floor.position.set(x, y, z);
        floor.rotation.x = -Math.PI / 2;
        TH.scene.add(floor);
    },
    // points must be a single closed figure
    addFloorFromPoints : function(x, y, z, points, textureName) {
        var thPoints = [];
        var startKey = Object.keys(points)[0];
        var current = points[startKey];
        thPoints.push(new THREE.Vector2(current.x + x, current.y + z));
        while (true) {
            if (current.next >= 0 && current.next != startKey) {
                current = points[current.next];
                thPoints.push(new THREE.Vector2(current.x + x, current.y + z));
            }
            else {
                break;
            }
        }
        var shape = new THREE.Shape(thPoints);
        var geometry = new THREE.ShapeGeometry(shape);
        var mat = TH._loadTextureMaterial(textureName, 0.008, 0.008);
        var floor = new THREE.Mesh(geometry, mat);
        floor.position.y = y;
        floor.rotation.x = Math.PI / 2;
        TH.scene.add(floor);
    },
    update : function() {
        var delta = TH.clock.getDelta(); 
        for (var i in TH.animators) {
            TH.animators[i].update(delta * 1000);
        }
    },
    clearScene : function() {
        // TODO: cleanup materials?
        while (TH.scene.children.length)
            TH.scene.remove(TH.scene.children[0]);
    }
}

