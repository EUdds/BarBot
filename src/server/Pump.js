const gpio = require('rpi-gpio');
const gpiop = gpio.promise;
const db = require('./db/index');

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
        sleep(1100).then(() => {
            top.turnOff();
        })
    } // TODO
}

module.exports = Pump;

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.createPumpsFromPinNumbers = (pinNumbers) => {
    for(let i = 0; i < pinNumbers.length; i++) {
        let pump = new Pump(pinNumbers[i], "Pump " + i);
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
