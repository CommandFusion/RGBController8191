var RGBController = function(params) {
	params = params || {};

	var self = {
		prefix: 0xFE,
		address: params.address || 0x4C,
		systemName: params.systemName || "RGBController"
	};

	self.setAddress = function(newAddress) {
		self.sendData(0x41, newAddress);
	};

	self.setChannelLevel = function(channel, level) {
		if ([1,2,3].indexOf(channel) == -1) {
			CF.log("setChannelLevel: channel must be 1, 2 or 3. '" + channel + "' is not a valid channel.");
			return;
		}
		if (level < 0) {
			level = 0;
		} else if (level > 255) {
			level = 255;
		}
		self.sendData(0x42, channel, parseInt(level/1.02));
	};

	self.setAllLevels = function(level) {
		if (level < 0) {
			level = 0;
		} else if (level > 255) {
			level = 255;
		}
		self.sendData(0x52, parseInt(level/1.02));
	};

	self.setRGBLevels = function(r, g, b) {
		self.setChannelLevel(1, r);
		self.setChannelLevel(2, g);
		self.setChannelLevel(3, b);
	};

	self.startSequence = function(seqNumber) {
		if ([1,2,3,4,5,6,7].indexOf(seqNumber) == -1) {
			CF.log("startSequence: sequence number must be between 1 and 7. '" + seqNumber + "' is not a valid sequence number.");
			return;
		}
		self.sendData(0x43, seqNumber);
	};

	self.setSequenceTime = function(seqNumber) {
		self.sendData(0x43, seqNumber);
	};

	self.sendData = function() {
		// Create an array from the arguments object
		var args = Array.prototype.slice.call(arguments);
		// prepend the prefix and address bytes
		args.unshift(self.prefix, self.address);
		// send command as a string generated from each integer passed to this function
		CF.send(self.systemName, String.fromCharCode.apply(null, args));
	}

	return self;
};

CF.modules.push({
	name: "RGBController",	// the name of the module (mostly for display purposes)
	object: RGBController,	// the object to which the setup function belongs ("this")
	version: 1.0	// An optional module version number that is displayed in the Remote Debugger
});