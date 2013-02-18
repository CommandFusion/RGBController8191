var myRGB = new RGBController({systemName: "RGBController", address: 0x4C, CFLink: { id: 0x10, command: "TMODSPW", module: "", port: "" }});
//var myRGB = new RGBController({systemName: "RGBController", address: 0x4C});
var myColorPicker, fireRunning = false;

// Only one CF.userMain function in all scripts is allowed!
CF.userMain = function() {

	myColorPicker = new ColorPicker("picker-large.png", "s2", null, 100, function (r, g, b, a, x, y, wasDragged) {
		// This code will be run everytime the pixel color is obtained, along with the pixel data as parameters
		myRGB.setRGBLevels(r, g, b, !wasDragged);

		// Show the color levels on the portrait page sliders
		CF.setJoins([
			{join: "a1", value: r*257}, // Multiply by 257 to scale values from 0-255 range to the 0-65535 range used by sliders
			{join: "a2", value: g*257},
			{join: "a3", value: b*257},
			{join: "s11", value: r},
			{join: "s12", value: g},
			{join: "s13", value: b},
			{join: "s15", value: a}
		]);
	});

	// This function gets called whenever a single channel of the controller is changed
	myRGB.callback = function (channel, level) {
		CF.log("test");
		CF.setJoin("s1" + channel, level);
	}

	// Setup the colorpicker object after it was created above
	myColorPicker.setup();

	//flickeringFire();
};

function toggleFire() {
	// Toggle effect status
	fireRunning = !fireRunning;
	if (fireRunning) {
		// start the effect if needed
		flickeringFire();
	}
}

var lastR = 0, lastG = 0;
var rFader = new Fader(myRGB);
var gFader = new Fader(myRGB);
function flickeringFire() {
	// Calculate random light level for the fire
	var r = Math.floor((Math.random()*30)+20);
	var g = Math.floor((Math.random()*10));
	var delay = Math.floor((Math.random()*200)+100);
	rFader.startFade("r", lastR, r, delay, delay/5)
	gFader.startFade("g", lastG, g, delay, delay/5)
	lastR = r;
	lastG = g;
	//myRGB.setRGBLevels(r, g, 0, false);
	// Calculate random delay time for next light change (1-100)
	if (fireRunning) {
		setTimeout(function() { flickeringFire(); }, delay);
	}
}

function fade() {
	// rgbController, from, to, time, steps, ks
	rFader.startFade("r");
}
