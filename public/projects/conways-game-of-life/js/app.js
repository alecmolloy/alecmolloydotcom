life = new gameOfLife({
	ctx: ctx,
	canvas: canvas,
	cellSize: 20,
	colour : 'rgba(240, 92, 148, 1)',
	speed : 50,
	density : 0
})
var renderer = life.renderBoard.bind(life);
window.addEventListener('resize', renderer);
var animate = life.animate.bind(life);
document.getElementById('button').addEventListener('click', animate);
