var osc, fft;

var oscControls = ControlsHandler();
oscControls.init();

function setup() {
	createCanvas(720, 256);

	fft = new p5.FFT();
}

function draw() {
	background(255);

	var waveform = fft.waveform();
	beginShape();
	strokeWeight(5);
	for (var i = 0; i < waveform.length; i++) {
		var x = map(i, 0, waveform.length, 0, width);
		var y = map(waveform[i], -1, 1, height, 0);
		vertex(x, y);
	}
	endShape();
}