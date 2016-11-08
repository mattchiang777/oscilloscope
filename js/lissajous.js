var osc, fft1, fft2;

var AX, BX;

var a;
var b;
var delta;

var x, y;
var t = 10;
var inc_t = 1;

var sound1, sound2;

function preload() {
	// sound1 = loadSound('0001.mp3');
}

function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.mouseClicked(togglePlay);

	frameRate(30);

	// sound2 = new p5.AudioIn();
	// sound1.play();
	// sound2.start();
	delta = PI/2;

	AX = 200;
	BX = 200;

	fft1 = new p5.FFT();
	fft1.setInput(sound1);
	fft2 = new p5.FFT();
	fft2.setInput(sound2);
}

function draw() {
	background(255);

	a = fft1.waveform();
	b = fft2.waveform();
	// console.log(a[600]);

	beginShape();
	strokeWeight(0);
	for (var i = 0; i < 1000; i++) {
		// x = drawLissajousX(mouseX, 10*abs(a[600]), millis(), delta) + mouseX;
		// y = drawLissajousY(mouseY, 7, millis()) + mouseY;
		// x = drawLissajousX(200, 3, i, delta) + windowWidth/2;
		// y = drawLissajousY(200, 2, i) + windowHeight/2;

		// static with mouse interactions
		x = drawLissajousX(mouseX, 3, i, millis()/100) + windowWidth/2;
		y = drawLissajousY(mouseY, 2, i) + windowHeight/2;		
		
		// 1 and 2.01
		// vertex(x, y); // keeps it sharp cause it's a vertex
		fill(0, 0, 0);
		ellipse(x, y, 10, 10);
	}
	endShape();

	// t += inc_t;
}

// x = Asin(at + delta) where A is the amplitude, a is freq, delta is the phase shift
function drawLissajousX(A, a, t, delta) {
	return A * sin(a * t + delta);
	// console.log(millis());
}

/**
 * Get the correct Y point value for the curve
 * y = Bsin(bt)
 * @param  {float} B is the amplitude
 * @param  {float} b is the frequency of this song
 * @return {float} y is the Lissajous curve coordinate
 */
function drawLissajousY(B, b, t) {
	return B * sin(b * t);
}

// fade sound if mouse is over canvas
function togglePlay() {
	if (sound1.isPlaying()) {
		sound1.pause();
	} else {
		sound1.play();
	}
}