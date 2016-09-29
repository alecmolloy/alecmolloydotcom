// Play/pause controller
var playPauseButton = document.getElementById('playpause');
var isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        playPauseButton.src = 'img/pause-button.png';
        isPlaying = false;
    } else {
        playPauseButton.src = 'img/play-button.png';
        isPlaying = true;
    }
}

playPauseButton.addEventListener('mouseup', togglePlay);

// Canvas Context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var barWidth, barHeight;
var WIDTH, HEIGHT;

// Resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
	barWidth = 10 * window.devicePixelRatio;
	ctx.lineWidth = barWidth.toString();
	ctx.lineCap = 'round';
}
resizeCanvas();

// Audio Context
var aCtx = new AudioContext();
var sourceElement = document.getElementById('song');
var source = aCtx.createMediaElementSource(sourceElement);

// Analyser Node
var analyser = aCtx.createAnalyser();
source.connect(analyser);
source.connect(aCtx.destination);
analyser.fftSize = 32;
analyser.smoothingTimeConstant = .9;
analyser.minDecibels = -90;
analyser.maxDecibels = -10;

var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

var color, alpha, t;
function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    analyser.getByteFrequencyData(dataArray);

    var x = (WIDTH / 2) - (16 * barWidth);
	t = song.currentTime / song.duration;
	t = isNaN(t) ? 0 : t;
	var currentBar = Math.floor(t*16);
	tBar = (t * 16) % 1;
	color = Math.round(0 + tBar * (255 - 0));
	alpha = Math.round((0.15 + tBar * (1 - 0.15)) * 100) / 100;
    for (var i = 0; i < 16; i++) {
		if (currentBar > i){
			ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
		} else if (currentBar === i) {
			ctx.strokeStyle = 'rgba(' + color + ',' + color + ',' + color + ',' + alpha + ')';
		} else if (currentBar < i) {
			ctx.strokeStyle = 'rgba(0, 0, 0, .15)';
		}
        barHeight = dataArray[i] * .6;
        if (barHeight === 0)
            barHeight = 1;

        ctx.beginPath();
        ctx.moveTo(x, (HEIGHT / 2) + (barHeight));
        ctx.lineTo(x, (HEIGHT / 2) - (barHeight));
        ctx.stroke();

        x += barWidth * 2;
    }
}
animate();
