const express = require('express');
const app = express();
const http = require('http');
const SocketIO = require('socket.io');
const gpio = require('rpi-gpio');
const {Pump, createPumpsFromPinNumbers, getPumpByPumpNumber} = require('./Pump');

const server = http.createServer(app);

const io = SocketIO(server);

io.listen(7000, (err) => {
    console.log(err);
});

io.httpServer.on('listening', function () {
    console.log('Socket.IO listening on port', io.httpServer.address().port)
})


const gpiop = gpio.promise;
const webroot = __dirname + '/../';

app.use(express.static(webroot));

const PIN_NUMBERS = [7, 11, 13, 15, 12, 16, 18, 22];

function main() {
    createPumpsFromPinNumbers(PIN_NUMBERS);
}


io.sockets.on('connection', function(socket) {
    let state = 'off';

    socket.on('state', function(data) {
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
});

process.on('SIGINT', function() {
    gpio.destroy(() => {
        console.log('All pins unexported');
        process.exit();
    });
});

server.listen(8080, () => { console.log(`HTTP Server listening on port 8080`)});

main();