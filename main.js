var myRGB = new RGBController({systemName: "RGBController", address: 0x4C});
var myColorPicker;

// Only one CF.userMain function in all scripts is allowed!
CF.userMain = function() {
	myColorPicker = new ColorPicker("picker.png", "s2", null, 250, function (r, g, b, x, y) {
		// This code will be run everytime the pixel color is obtained, along with the pixel data as parameters
		//CF.log("R: " + r + ", G: " + g + ", B: " + b);
		myRGB.setChannelLevel(1, r);
		myRGB.setChannelLevel(2, g);
		myRGB.setChannelLevel(3, b);
		// Show the color levels on the portrait page sliders
		CF.setJoins([
			{join: "a1", value: r*257},
			{join: "a2", value: g*257},
			{join: "a3", value: b*257}
		]);
	});
	// Setup the colorpicker object after it was created above
	myColorPicker.setup();
};