// TODO MAKE THIS MAKE MUSIC
var gameOfLife = function (config) {
	this.ctx = config['ctx'];
	this.canvas = config['canvas'];

	this.colour = config['colour'] || '#444';
	this.speed = config['speed'] || 1000;
	this.density = config['density'] || 1.7;

	this.width = Math.ceil(window.innerWidth * devicePixelRatio);
	this.height = Math.ceil(window.innerHeight * devicePixelRatio);
	this.cellSize = config['cellSize'] ? config['cellSize'] * devicePixelRatio : 20 * devicePixelRatio;
	this.boardHeight = config['board'] ? config['board'].length : Math.ceil(this.height / this.cellSize);
	this.boardWidth = config['board'] ? config['board'][0].length : Math.ceil(this.width / this.cellSize);

	this.currentBoard = this.generateBoard(config['board']);
	this.nextBoard = this.generateEmptyBoard;
	this.animate();
	var addPentomino = gameOfLife.addPentomino.bind(this);
	document.addEventListener('click', addPentomino);
};

gameOfLife.prototype.generateBoard = function (userBoard) {
	var board = this.generateEmptyBoard();
	for (var y = 0; y < this.boardHeight; y++) {
		for (var x = 0; x < this.boardWidth; x++) {
			if (userBoard) {
				board[y][x] = new gameOfLife.Cell({
					x: x,
					y: y,
					state: userBoard[y][x]
				});
			} else {
				board[y][x] = new gameOfLife.Cell({
					x: x,
					y: y,
					state: Math.round(Math.random() / this.density)
				});
			}
		}
	}
	return board;
}

gameOfLife.prototype.generateEmptyBoard = function () {
	var board = new Array(this.boardWidth);
	for (var y = 0; y < this.boardHeight; y++) {
		board[y] = new Array(this.boardHeight)
	}
	return board;
}

gameOfLife.prototype.renderBoard = function () {
	this.ctx.clearRect(0, 0, this.width, this.height);
	for (var y = 0; y < this.boardHeight; y++) {
		for (var x = 0; x < this.boardWidth; x++) {
			if (this.currentBoard[y][x].state === 1) {
				this.ctx.fillStyle = this.colour;
				this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
			}
		}
	}

}

gameOfLife.prototype.generation = function () {
	this.nextBoard = this.generateEmptyBoard();
	for (var y = 0; y < this.boardHeight; y++) {
		for (var x = 0; x < this.boardWidth; x++) {
			var state = this.yayOrNay(this.currentBoard[y][x]);
			this.nextBoard[y][x] = new gameOfLife.Cell({
				x: x,
				y: y,
				state: state
			});
		}
	}
	this.currentBoard = this.nextBoard.slice();
}

gameOfLife.prototype.findNeighbours = function (cell) {
	var neighbours = 0;
	for (var y = -1; y <= 1; y++) {
		for (var x = -1; x <= 1; x++) {
			if (!(x === 0 && y === 0)) {
				var addressX = x + cell.x;
				var addressY = y + cell.y;

				if (addressX < 0) {
					addressX = this.boardWidth - 1;
				}
				if (addressX >= this.boardWidth) {
					addressX = 0;
				}
				if (addressY < 0) {
					addressY = this.boardHeight - 1;
				}
				if (addressY >= this.boardHeight) {
					addressY = 0;
				}

				var neighbour = this.currentBoard[addressY][addressX];
				if (neighbour.state === 1) {
					neighbours++;
				}
			}
		}
	}
	return neighbours;
}

gameOfLife.prototype.yayOrNay = function (cell) {
	var neighbours = this.findNeighbours(cell);

	var x = cell.x;
	var y = cell.y;
	var newState;
	if (cell.state === 0) { // is dead
		if (neighbours === 3) {
			newState = 1;
		} else if (neighbours !== 3) {
			newState = 0;
		}
	} else if (cell.state === 1) {
		if (neighbours < 2 || neighbours > 3) {
			newState = 0;
		} else if (neighbours === 2 || neighbours === 3) {
			newState = 1;
		}
	}
	return newState;
}

gameOfLife.prototype.animate = function (cell) {
	this.renderBoard();
	this.generation();

	var animate = this.animate.bind(this);
	if (this.speed === 'max') {
		window.requestAnimationFrame(animate);
	} else {
	window.setTimeout(animate, this.speed);
	}
}

gameOfLife.Cell = function (config) {
	this.x = config['x'];
	this.y = config['y'];
	this.state = config['state'];
}

gameOfLife.rPento = [
		[0, 1, 1],
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]

gameOfLife.squarePento = [
		[1, 1, 1],
		[1, 0, 1],
		[1, 1, 1]
	]

gameOfLife.glider = [
		[0, 1, 0],
		[0, 0, 1],
		[1, 1, 1]
	]

gameOfLife.clear = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]

gameOfLife.addPentomino = function (e) {
	var addressX = Math.floor(e.x * devicePixelRatio / this.cellSize);
	var addressY = Math.floor(e.y * devicePixelRatio / this.cellSize);

	var pentomino = gameOfLife.rPento;

	if (e.altKey) {
		var pentomino = gameOfLife.squarePento;
	}

	if (e.shiftKey) {
		var pentomino = gameOfLife.glider;
	}

	if (e.shiftKey && e.altKey) {
		var pentomino = gameOfLife.clear;
	}

	for (var y = -1; y <= 1; y++) {
		for (var x = -1; x <= 1; x++) {
			var pentoX = addressX + x;
			var pentoY = addressY + y;

			if (pentoX < 0) {
				pentoX = this.boardWidth - 1;
			}
			if (pentoX >= this.boardWidth) {
				pentoX = 0;
			}
			if (pentoY < 0) {
				pentoY = this.boardHeight - 1;
			}
			if (pentoY >= this.boardHeight) {
				pentoY = 0;
			}
			this.currentBoard[pentoY][pentoX].state = pentomino[y + 1][x + 1];
		}
	}
	this.renderBoard();
}
