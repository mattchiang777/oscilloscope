var osc, fft;

var ch1, ch2;

var oscControls = ControlsHandler();
oscControls.init();

var oscControls2 = ControlsHandler();
oscControls2.init();

function preload() {
	ch1 = oscControls.osc;
	ch2 = loadSound('0001.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	// frameRate(45);

	fft = new p5.FFT();
	fft.setInput(oscControls.osc);

	fft2 = new p5.FFT();
	fft2.setInput(oscControls2.osc);

	ch2.amp(0.2);
	// ch2.play();
}

function draw() {
	background(255);

	// var waveform = fft.waveform();
	beginShape();
	strokeWeight(2);
	for (var i = 0; i < mouseX + mouseY; i++) {
		// var x = map(i, 0, waveform.length, 0, width);
		var x = drawLissajousX(200, 3, 0, millis()) + windowWidth/2;
		// var y = map(waveform[i], -1, 1, height, 0);
		var y = drawLissajousY(200, 4, millis()) + windowHeight/2;
		vertex(x, y);
		// console.log('x: ' + x);
		// console.log('y: ' + y);
	}
	endShape();
}

// x = Asin(at + delta) where A is the amplitude, a is freq, delta is the phase shift
// y = Bsin(bt)
function drawLissajousX(A, a, delta, t) {
	var x = A * sin(a * t + delta);
	return x;
}

/**
 * Get the correct Y point value for the curve
 * @param  {float} B is the amplitude
 * @param  {float} b is the frequency of this song
 * @return {float} y is the Lissajous curve coordinate
 */
function drawLissajousY(B, b, t) {
	var y = B * sin(b * t);
	return y;
}