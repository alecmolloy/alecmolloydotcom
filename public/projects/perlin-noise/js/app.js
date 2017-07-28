var dpr = window.devicePixelRatio || 1;

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.width = canvas.width * dpr;
canvas.height = canvas.height * dpr;
//canvas.width    = 100;
//canvas.height   = 100;
canvas.style.width = (canvas.width / dpr) + 'px';
canvas.style.height = (canvas.height / dpr) + 'px';

var ctx = canvas.getContext('2d');

//drawMultiRadiantCircle(canvas.width / 2, canvas.height / 2, canvas.width/2, colours);

var perlin = new Perlin2D({
    cellSize: 200,
    canvas: canvas,
    ctx: ctx,
    showLattice: false,
    colour: false
});

function setupStats() {
    // GUI
    var params = {
        showLattice: perlin.showLattice,
        cellSize: perlin.cellSize,
        colour: perlin.colour
    };
    var gui = new dat.GUI({
        height: 5 * 32 - 1
    });
    gui.add(params, 'cellSize')
        .min(5)
        .max(500)
        .step(1)
        .onFinishChange(function () {
            perlin = new Perlin2D({
                cellSize: params.cellSize,
                canvas: canvas,
                ctx: ctx,
                showLattice: params.showLattice,
                colour: params.colour
            });
        }); // check if i need to remove or add anchors
    gui.add(params, 'showLattice')
        .onFinishChange(function () {
            perlin = new Perlin2D({
                cellSize: params.cellSize,
                canvas: canvas,
                ctx: ctx,
                showLattice: params.showLattice,
                colour: params.colour
            });
        }); // check if the number of segments needs to be changed}
    gui.add(params, 'colour')
        .onFinishChange(function () {
            perlin = new Perlin2D({
                cellSize: params.cellSize,
                canvas: canvas,
                ctx: ctx,
                showLattice: params.showLattice,
                colour: params.colour
            });
        }); // check if the number of segments needs to be changed}

}

    setupStats();
