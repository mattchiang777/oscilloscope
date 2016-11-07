// Originally written by Felix Turner @felixturner
// Modified by Matthew Chiang


var ControlsHandler = function() {

	var osc = new p5.Oscillator;
	var modulator;

	var params = {
		wave         : 'sine',
		amplitude    : 0.5,
		frequency    : 440,
		addModulator : function() {
			modulator= new ControlsHandler();
			modulator.init();
			// Begin the modulator's oscillator 
			modulator.osc.start();
			osc.freq(modulator.osc);
		}
	};

	function init() {
		// Init oscillator associated with these controls
		osc.start();

		// Init DAT GUI control panel
		gui = new dat.GUI({autoPlace: false});
		$('#controls').append(gui.domElement);

		// Folder for picking different types of wave functions
		var f1 = gui.addFolder('Wave Functions');
		var waveSelection = f1.add(params, 'wave', ['sine', 'triangle', 'square', 'sawtooth']);
		f1.add(params, 'addModulator');
		f1.open();

		// Folder for toggling visualizations
		var f2 = gui.addFolder('Parameters');
		var ampSelection = f2.add(params, 'amplitude', 0, 1).step(0.1);
		// humans can hear 20-20000Hz
		var freqSelection = f2.add(params, 'frequency', 20, 2000);
		f2.open();

		setListeners(waveSelection, ampSelection, freqSelection);
	}

	/**
	 * @param {waveCtrl} control handler for wave function
	 * @param {ampCtrl} control handler for amplitude
	 * @param {freqCtrl} control handler for frequency
	 */
	function setListeners(waveCtrl, ampCtrl, freqCtrl) {
	// Fires on every change, drag, keypress, etc
		waveCtrl.onChange(function(value) {
			osc.setType(params.wave);
		});
		ampCtrl.onChange(function(value) {
			osc.amp(params.amplitude);
		})
		freqCtrl.onChange(function(value) {
			osc.freq(params.frequency);
		})
	}

	return {
		init:init,
		osc:osc,
		params: params
	};
};