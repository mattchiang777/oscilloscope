// Originally written by Felix Turner @felixturner
// Modified by Matthew Chiang

var ControlsHandler = function() {

	var params = {
		wave: 'sine',
		amplitude: 0.5,
		frequency: 440,
		addModulator: function() {
			console.log("add modulator");
		}
	};

	function init() {
		// Init DAT GUI control panel
		gui = new dat.GUI({autoPlace: false});
		$('#controls').append(gui.domElement);

		// Folder for picking different types of wave functions
		var f1 = gui.addFolder('Wave Functions');
		f1.add(params, 'wave', ['sine', 'triangle', 'square', 'sawtooth']);
		f1.open();

		// Folder for toggling visualizations
		var f2 = gui.addFolder('Parameters');
		f2.add(params, 'amplitude', 0, 1).step(0.1);
		// humans can hear 20-20000Hz
		f2.add(params, 'frequency', 20, 2000);
		f2.open();
	}

	return {
		init:init,
		params: params
	};
}();