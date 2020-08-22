const gpio = require('rpi-gpio');
const gpiop = gpio.promise;
const db = require('./db/index');
const ledDriver = require('../led_server')

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
        let pump = this;
        return new Promise(function(resolve, reject) {
           
            console.log('POURING ' + numShots + ' SHOTS');
            let time = pump.shotDelay * numShots;
            pump.turnOn();
            sleep(time).finally(() => {
                pump.turnOff();
                resolve();
            }).catch((err) => reject(err));
        });

        
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
