var MA = {
    engine : null,
    render : null,
    player : null,

    init : function() {
        // module aliases
        var Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies;

        MA.engine = Engine.create();

        MA.render = Render.create({
            element: document.getElementById('map'),
            engine: MA.engine,
            bounds: {min: {x:-400, y:-300}, max: {x:400, y:300}},
            options: {
                showAngleIndicator: true
            }
        });

        MA.player = Bodies.circle(0, 0, 5);
        MA.player.mass = 150;
        MA.player.frictionAir = 1;

        World.add(MA.engine.world, MA.player);
        MA.engine.world.gravity.y = 0;
    },
    _findCentroid : function(points) {
        var cx = 0;
        var cy = 0;
        var x0, x1, y0, y1, a, signedArea = 0;
        var count = Object.keys(points).length
        for (var i = 0; i < count; i++) {
            var point = points[i];
            x0 = point.x;
            y0 = point.y;
            x1 = points[(i + 1) % count].x;
            y1 = points[(i + 1) % count].y;
            a = x0*y1 - x1*y0;
            signedArea += a;
            cx += (x0 + x1) * a;
            cy += (y0 + y1) * a;
        }
        signedArea *= 0.5;
        cx /= (6*signedArea);
        cy /= (6*signedArea);
        return [cx, cy];
    },
    run : function() {
        Matter.Engine.run(MA.engine);
        Matter.Render.run(MA.render);
    },
    addBox : function(x, y, width, depth) {
        var boxA = Matter.Bodies.rectangle(x, y, width, depth, {isStatic: true});
        boxA.friction = 0;
        boxA.frictionAir = 0;
        Matter.World.add(MA.engine.world, boxA);
    },
    addFromPoints : function(x, y, points) {
        var centroid = MA._findCentroid(points);
        centroid[0] += x;
        centroid[1] += y;
        var shape = Matter.Bodies.fromVertices(centroid[0], centroid[1], points, {isStatic: true});
        Matter.World.add(MA.engine.world, shape);
    }
}
