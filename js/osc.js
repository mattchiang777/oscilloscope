var osc, fft;

ControlsHandler.init();

function setup() {
	createCanvas(720, 256);

	osc = new p5.Oscillator;
	osc.amp(.5);
	// var osc2 = new p5.TriOsc();
	// osc2.freq(2000);
	// osc.freq(osc2);
	// osc2.start();

	fft = new p5.FFT();
	osc.start();
}

function draw() {
	background(255);

	checkControlsHandlerSettings();

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


function checkControlsHandlerSettings() {
	osc.setType(ControlsHandler.params.wave);
	osc.amp(ControlsHandler.params.amplitude);
	osc.freq(ControlsHandler.params.frequency);
	// osc.freq(new p5.SawOsc(200));
}