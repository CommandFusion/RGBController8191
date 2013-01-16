var myRGB = new RGBController({systemName: "RGBController", address: 0x4C, CFLink: { id: 0x10, command: "TMODSPW", module: "", port: "" }});
//var myRGB = new RGBController({systemName: "RGBController", address: 0x4C});
var myColorPicker, fireRunning = false;

// Only one CF.userMain function in all scripts is allowed!
CF.userMain = function() {

	myColorPicker = new ColorPicker("picker-large.png", "s2", null, 100, function (r, g, b, a, x, y) {
		// This code will be run everytime the pixel color is obtained, along with the pixel data as parameters
		myRGB.setRGBLevels(r, g, b, false);
		// Show the color levels on the portrait page sliders
		CF.setJoins([
			{join: "a1", value: r*257}, // Multiply by 257 to scale values from 0-255 range to the 0-65535 range used by sliders
			{join: "a2", value: g*257},
			{join: "a3", value: b*257},
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

function flickeringFire() {
	// Calculate random light level for the fire
	var r = Math.floor((Math.random()*100)+151);
	var g = Math.floor((Math.random()*30)+10);
	myRGB.setRGBLevels(r, g, 0, false);
	// Calculate random delay time for next light change (1-100)
	var delay = Math.floor((Math.random()*300)+1);
	if (fireRunning) {
		setTimeout(function() { flickeringFire(); }, delay);
	}
}