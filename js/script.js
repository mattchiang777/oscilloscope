// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var osc = context.createOscillator();
var gain = context.createGain();
var dest = context.destination;
var analyser = context.createAnalyser();

analyser.fftSize = 2048; // represents size of FFT to be used to determine frequency domain

osc.connect(gain);
gain.connect(dest);
gain.connect(analyser);

osc.frequency.value = 110;
osc.type = 'square';
gain.gain.value = 0.5;
osc.start();

var scopeCtx = document.getElementById('scope').getContext('2d');
var spectCtx = document.getElementById('spectrum').getContext('2d');

draw();

function gainInp(val) {
	document.querySelector('#gainVal').value = val;
	gain.gain.value = val;
}

function freqInp(val) {
	document.querySelector('#freqVal').value = val;
	osc.frequency.value = val;
}

function shapeInp(val) {
	document.querySelector('#shapeVal').value = val;

	switch (val) {
		case '2':
			osc.type = 'square';
			break;
		case '3':
			osc.type = 'sawtoooth';
			break;
		case '4':
			osc.type = 'triangle';
			break;
		default:
			osc.type = 'sine';
			break;
	}
}

function silence() {
	gain.gain.value = 0;
}

function draw() {
	drawSpectrum(analyser, spectCtx);
	drawScope(analyser, scopeCtx);

	requestAnimationFrame(draw);
}


// function loadSound(url) {
// 	var request = new XMLHttpRequest();
// 	request.open('GET', url, true);
// 	request.responseType = 'arraybuffer';

// 	// Decode asynchronously
// 	request.onload = function() {
// 		context.decodeAudioData(request.response, function(buffer) {
// 			soundBuffer = buffer;
// 		}, onError)
// 	}
// 	request.send();
// }

// function playSound(buffer) {
// 	var source = context.createBufferSource(); // creates a sound source
// 	source.buffer = buffer; // tell the source which sound to play
// 	source.connect(context.destination); // connect the source to the context's destination (the speakers)
// 	source.start(0); // play the source now
// }

