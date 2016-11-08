var sound;

function preload() {
	sound = loadSound('0001.mp3');
}

function setup() {
	var cnv = createCanvas(windowWidth, 480);
	cnv.mouseClicked(togglePlay);

	fft = new p5.FFT();
	sound.amp(0.2);
	sound.play();
}

function draw() {
	background(0);

	var spectrum = fft.analyze();
	noStroke();
	fill(0, 255, 0); // spectrum is green
	for (var i = 0; i < spectrum.length; i++) {
		var x = map(i, 0, spectrum.length, 0, width);
		var h = -height + map(spectrum[i], 0, 255, height, 0);
		rect(x, height, width/spectrum.length, h);
	}
	// console.log(spectrum.length);

	var waveform = fft.waveform();
	noFill();
	noStroke();
	beginShape();
	stroke(255, 0, 0); // waveform is red
	strokeWeight(1);
	for (var i = 0; i < waveform.length; i++) {
		var x = map(i, 0, waveform.length, 0, width);
		var y = map(waveform[i], -1, 1, height, 0);
		vertex(x, y);
	}
	endShape();

	// console.log("Bass energy: " + fft.getEnergy("bass"));
}

// fade sound if mouse is over canvas
function togglePlay() {
	if (sound.isPlaying()) {
		sound.pause();
	} else {
		sound.loop();
	}
}