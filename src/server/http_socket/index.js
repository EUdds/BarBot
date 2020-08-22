const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const SocketIO = require('socket.io');
const gpio = require('rpi-gpio');
const ledDriver = require('../led_server/');



const db = require('./db');
const {Pump, createPumpsFromPinNumbers, getPumpByPumpNumber, getPumpByFluidName} = require('./Pump');

const pumpRouter = require('./db/routes/pump.router');
const fluidRouter = require('./db/routes/fluids.router');
const drinkRouter = require('./db/routes/drinks.router');

app.use('/api', pumpRouter);
app.use('/api', fluidRouter);
app.use('/api', drinkRouter);

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());



const io = SocketIO(server);

io.listen(7000, (err) => {
    console.log(err);
});

io.httpServer.on('listening', function () {
    console.log('Socket.IO listening on port', io.httpServer.address().port)
});

const server = http.createServer(app);
server.listen(8080, () => { console.log(`HTTP Server listening on port 8080`)});


const webroot = __dirname + '/../';

app.use(express.static(webroot));

const PIN_NUMBERS = [7, 11, 13, 15, 12, 16, 18, 22];
const SHOT_DELAYS = [1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200]

function main() {
    createPumpsFromPinNumbers(PIN_NUMBERS, SHOT_DELAYS);
    ledDriver.setLEDsToState("idle");
}


io.sockets.on('connection', function(socket) {
    let state = 'off';

    socket.on('state', function(data) {
        pumpNumber = data[0];
        state = data[1];
        let pump = getPumpByPumpNumber(pumpNumber);
        if(state === 'on') {
            ledDriver.setLEDsToState("pouring");
            pump.turnOn();
        } else if (state === 'off') {
            ledDriver.setLEDsToState("idle");
            pump.turnOff();
        } else {
            ledDriver.setLEDsToState("idle");
            pump.turnOff();
        }
    });

    socket.on('makeDrink', async function(data) {
        ledDriver.setLEDsToState("pouring");
        let {drink, pos} = data;
        let {ingredients} = drink;
        for(let ingredient of ingredients) {
            let pump = getPumpByFluidName(ingredient.name);
            console.log(pump);
            if (pump === -1) return; // TODO error handling
            await pump.pourShots(ingredient.shots);
        }
        sleep(1000).finally(() => {
            ledDriver.setLEDsToState("idle");
        });
    });
});

process.on('SIGINT', function() {
    gpio.destroy(() => {
        console.log('All pins unexported');
        process.exit();
    });
});

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}




main();
