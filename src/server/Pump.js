const gpio = require('rpi-gpio');
const gpiop = gpio.promise;
const db = require('./db/index');

const PUMPS = [];
module.exports.PUMPS = PUMPS;

class Pump {
    constructor(pinNumber, fluid, shotDelay) {
        this.pinNumber = pinNumber;
        this.fluid = fluid;
        this.shotDelay = shotDelay
        this.setupPin(pinNumber);
        PUMPS.push(this);
    }

    setupPin(pinNumber) {
        gpiop.setup(this.pinNumber, gpio.DIR_HIGH).catch((e) => {
            console.log('Error assigning pin  ' + pinNumber  + e);
        })
    }

    turnOn() {
        gpio.write(this.pinNumber, false);
    }

    turnOff() {
        gpio.write(this.pinNumber, true);
    }

    async pourOneShot(){
        let top = this;
        this.turnOn();
        sleep(1100).finally(() => {
            top.turnOff();
        })
    } // TODO

    async pourShots(numShots) {
        let top = this;
        time = this.shotDelay * numShots;
        this.turnOn();
        sleep(time).finally(() => {
            top.turnOff();
        })
        
    }
}

module.exports = Pump;

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.createPumpsFromPinNumbers = (pinNumbers, shotdelays) => {
    for(let i = 0; i < pinNumbers.length; i++) {
        let pump = new Pump(pinNumbers[i], "Pump " + i, shotdelays[i]);
    }
}
function getPumpByPumpNumber(pumpNumber) {
    return PUMPS[pumpNumber];
}
module.exports.getPumpByPumpNumber = getPumpByPumpNumber;

module.exports.getPumpByFluidName = (fluidName) => {
    let pumpNumber = -1;
    let pumps = db.pumps.find();
    console.log(fluidName);
    for(let pump of pumps) {
        console.log(`Comparing ${fluidName} to ${pump.fluid}`);
        if (pump.fluid === fluidName) {
            pumpNumber = pump.pumpNumber;
            break;
        }
    }
    if (pumpNumber < 0) return -1;
    return getPumpByPumpNumber(pumpNumber);
} 
