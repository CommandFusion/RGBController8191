# Quasar Electronics RGB Controller
This module allows iViewer to control RGB LEDs via RS232 commands using the [8191 RGB Controller from Quasar Electronics](http://www.quasarelectronics.co.uk/8191-3-channel-high-current-rgb-led-controller-serial-rs232-ttl.htm).

## Protocol Documentation
There is a PDF included that contains the [protocol documentation](blob/master/8191_Protocol.pdf) that was used to create the module.

## Module Design
This module uses JavaScript to implement the controller's protocol.

### Instantiation
To create a new RGB Controller object, you pass the object some paramters:

```javascript
var myRGB = new RGBController({
	systemName: "RGBController", // The name of the system in guiDesigner where commands will be sent to
	address: 0x4C // The device address, by default it is 0x4C. This can later be changed using the setAddress convenience function
});
```

### Convenience Functions
There are a few convenience functions built in:

* setChannelLevel
* setAllLevels
* setAddress
* startSequence
* setSequenceTime
* sendData

The `sendData` function simply takes an array of integers representing a single protocol command, and creates the byte array with prefix and address bytes as per the protocol documentation, then sends it to the controller.