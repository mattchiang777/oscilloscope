var osc, fft, ch1, ch2;

var paused = false;

var oscControls = ControlsHandler();
oscControls.init();

function setup() {
	createCanvas(windowWidth, windowHeight / 2);
	background(255);

	ch1 = oscControls.osc;
	ch1.start();

	fft = new p5.FFT();
}

function draw() {
	background(0);

	var waveform = fft.waveform();
	beginShape();
	strokeWeight(2);
	noFill();
	stroke('#fff');
	for (var i = 0; i < waveform.length; i++) {
		var x = map(i, 0, waveform.length, 0, width);
		var y = map(waveform[i], -1, 1, height, 0);
		vertex(x, y);
	}
	endShape();
}

function mouseClicked() {
	if (mouseX > 0 && mouseX < width && mouseY < height && mouseY > 0) {
		if (!paused) {
			noLoop();
			paused = true;
		} else {
			loop();
			paused = false;
		}
	}
}