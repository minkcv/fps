var MA = {
    engine : null,
    render : null,
    player : null,

    // create an engine
    init : function() {
        // module aliases
        var Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies;

        MA.engine = Engine.create();

        MA.render = Render.create({
            element: document.getElementById('map'),
            engine: MA.engine
        });

        MA.player = Bodies.circle(300, 300, 5);
        MA.player.mass = 150;
        MA.player.frictionAir = 1;

        World.add(MA.engine.world, MA.player);
        MA.engine.world.gravity.y = 0;
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
    }
}
