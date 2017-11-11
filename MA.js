var MA = {
    renderWidth : 800,
    renderHeight: 600,
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
    run : function() {
        Matter.Engine.run(MA.engine);
        Matter.Render.run(MA.render);
    },
    updateView : function() {
        var x = MA.player.position.x;
        var y = MA.player.position.y;
        MA.render.bounds.min.x = x - MA.renderWidth / 2;
        MA.render.bounds.max.x = x + MA.renderWidth / 2;
        MA.render.bounds.min.y = y - MA.renderHeight / 2;
        MA.render.bounds.max.y = y + MA.renderHeight / 2;
    },
    addCircle : function(x, z, radius) {
        var circle = Matter.Bodies.circle(x, z, radius, {isStatic: true});
        Matter.World.add(MA.engine.world, circle);
    },
    addBox : function(x, y, width, depth) {
        var boxA = Matter.Bodies.rectangle(x, y, width, depth, {isStatic: true});
        boxA.friction = 0;
        boxA.frictionAir = 0;
        Matter.World.add(MA.engine.world, boxA);
    },
    addFromPoints : function(x, y, points) {
        var shape = Matter.Bodies.fromVertices(x, y, points, {isStatic: true});
        Matter.World.add(MA.engine.world, shape);
        return {x: shape.bounds.min.x, y: shape.bounds.min.y}
    }
}
