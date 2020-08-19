const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const SocketIO = require('socket.io');
const gpio = require('rpi-gpio');
const ClientStream = require('openpixelcontrol-stream').OpcClientStream;
const net = require('net');

const NUM_LEDS = 12;
const OPC_CHANNEL = 0;
const LED_PORT = 7890

const ledClient = new ClientStream();



const db = require('./db');
const {Pump, createPumpsFromPinNumbers, getPumpByPumpNumber, getPumpByFluidName} = require('./Pump');

const pumpRouter = require('./http_socket/db/routes/pump.router');
const fluidRouter = require('./http_socket/db/routes/fluids.router');
const drinkRouter = require('./http_socket/db/routes/drinks.router');
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());
app.use('/api', pumpRouter);
app.use('/api', fluidRouter);
app.use('/api', drinkRouter)


app.get('/', (req, res) => {
    res.send('Hello World!');
})

const io = SocketIO(server);

io.listen(7000, (err) => {
    console.log(err);
});

io.httpServer.on('listening', function () {
    console.log('Socket.IO listening on port', io.httpServer.address().port)
});


const gpiop = gpio.promise;
const webroot = __dirname + '/../';

app.use(express.static(webroot));

const PIN_NUMBERS = [7, 11, 13, 15, 12, 16, 18, 8];
const SHOT_DELAYS = [1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200]

function main() {
    createPumpsFromPinNumbers(PIN_NUMBERS, SHOT_DELAYS);
    setLedsToState("idle");
}


io.sockets.on('connection', function(socket) {
    let state = 'off';

    socket.on('state', function(data) {
        const ledSocket = net.createConnection(LED_PORT, 'localhost', function() {
            ledClient.pipe(ledSocket);
            ledClient.setPixelColors(OPC_CHANNEL, new Uint32Array(NUM_LEDS));
        });
        pumpNumber = data[0];
        state = data[1];
        let pump = getPumpByPumpNumber(pumpNumber);
        if(state === 'on') {
            pump.turnOn();
        } else if (state === 'off') {
            pump.turnOff();
        } else {
            pump.turnOff();
        }
    });

    socket.on('makeDrink', async function(data) {
        let {drink, pos} = data;
        let {ingredients} = drink;
        for(let ingredient of ingredients) {
            let pump = getPumpByFluidName(ingredient.name);
            console.log(pump);
            if (pump === -1) return; // TODO error handling
            for(let i=0; i < ingredient.shots; i++) {
                await pump.pourOneShot();
            } 
        }
    });
});

process.on('SIGINT', function() {
    gpio.destroy(() => {
        console.log('All pins unexported');
        process.exit();
    });
});

server.listen(8080, () => { console.log(`HTTP Server listening on port 8080`)});

function setLedsToState(state) {
    switch (state) {
        case "idle":
            
    }
}

main();