const gpio = require('rpi-gpio');
const gpiop = gpio.promise;

const PUMPS = [];
module.exports.PUMPS = PUMPS;

class Pump {
    constructor(pinNumber, fluid) {
        this.pinNumber = pinNumber;
        this.fluid = fluid;
        this.setupPin(pinNumber);
        PUMPS.push(this);
    }

    setupPin(pinNumber) {
        gpiop.setup(this.pinNumber, gpio.DIR_HIGH);
    }

    turnOn() {
        gpio.write(this.pinNumber, false);
    }

    turnOff() {
        gpio.write(this.pinNumber, true);
    }

    pourOneShot(){} // TODO
}

module.exports = Pump;

module.exports.createPumpsFromPinNumbers = (pinNumbers) => {
    for(let i = 0; i < pinNumbers.length; i++) {
        let pump = new Pump(pinNumbers[i], "Pump " + i);
    }
}

module.exports.getPumpByPumpNumber = (pumpNumber) => {
    return PUMPS[pumpNumber];
}
