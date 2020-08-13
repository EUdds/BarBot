const gpio = require('rpi-gpio');

const gpiop = gpio.promise;

const DELAY = 1200;
const PIN_NUMBER = 7;

gpiop.setup(PIN_NUMBER, gpio.DIR_HIGH).catch(e => {
    console.error('Error assigning pin ' + PIN_NUMBER);
});

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const turnOn = () => {
    gpio.write(PIN_NUMBER, false);
}

const turnOff = () => {
    gpio.write(PIN_NUMBER, true);
}


function main() {
    turnOn();
    sleep(DELAY).finally(() => {
        turnOff();
    })
}
