const express = require('express');
const app = express();
const http = require('http');
const SocketIO = require('socket.io');
const gpio = require('rpi-gpio');

const server = http.createServer(app);

const io = SocketIO(server);

io.origins('*:*');
io.listen(7000);


const gpiop = gpio.promise;
const webroot = __dirname + '/../';

console.log('HERERE');
app.use(express.static(webroot));

const PUMP_1 = 2;

gpiop.setup(PUMP_1, gpio.DIR_OUT);

io.sockets.on('connection', function(socket) {
    let state = 'on';

    socket.on('state', function(data) {
        state = data;
        console.log(state);

        if(state === 'on') {
            gpio.write(PUMP_1, true);
        } else if (state === 'off') {
            gpio.write(PUMP_1, false);
        } else {
            gpio.write(PUMP_1, false);
        }
    });
});

process.on('SIGINT', function() {
    gpio.destroy(() => {
        console.log('All pins unexported');
        process.exit();
    });
});

server.listen(8080, () => { console.log(`Listening on port 8080`)});