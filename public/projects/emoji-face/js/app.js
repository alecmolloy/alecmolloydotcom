var videoInput,
	ctracker;

var dpr = devicePixelRatio;

var canvas = document.getElementById('canvas');


var ctx = canvas.getContext('2d');

var ctracker = new clm.tracker();
ctracker.init(pModel);

var streamPromise = navigator.mediaDevices.getUserMedia({
	video: {
		width: 400,
		height: 300,
		framerate: 1
	}
});

streamPromise.then(function (mediaStream) {
	videoInput = document.getElementById('videoInput');
	videoInput.src = window.URL.createObjectURL(mediaStream);
	videoInput.onloadedmetadata = function (e) {
		videoInput.play();
		ctracker.start(videoInput);
	}
});

streamPromise.catch(function (err) {
	console.error(err.name);
});

var draw = function () {
	window.requestAnimationFrame(draw);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctracker.draw(canvas);
}
draw();
