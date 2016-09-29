var canvas = document.getElementById("glslCanvas");

var resizeCanvas = function () {
	canvas.width = window.innerHeight * devicePixelRatio;
	canvas.height = window.innerHeight * devicePixelRatio;
	canvas.style.width = window.innerHeight + 'px';
	canvas.style.height = window.innerHeight + 'px';
}
resizeCanvas();

window.addEventListener('resize', resizeCanvas);

var sandbox = new GlslCanvas(canvas);


var render = function () {
    sandbox.render();
    window.requestAnimationFrame(render);
}

render();
