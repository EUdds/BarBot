const express = require('express');
const app = express();
const http = require('http');
const SocketIO = require('socket.io');
const gpio = require('rpi-gpio');

const server = http.createServer(app);

const io = SocketIO(server);

io.listen(7000, (err) => {
    console.log(err);
});

io.httpServer.on('listening', function () {
    console.log('listening on port', io.httpServer.address().port)
})


const gpiop = gpio.promise;
const webroot = __dirname + '/../';

console.log('HERERE');
app.use(express.static(webroot));

const PUMP_1 = 7;
const PUMP_2 = 11;
const PUMP_3 = 13;
const PUMP_4 = 15;
const PUMP_5 = 12;
const PUMP_6 = 16;
/* TODO
const PUMP_7 = 18;
CONST PUMP_8 = 22;
*/

gpiop.setup(PUMP_1, gpio.DIR_HIGH);
io.sockets.on('connection', function(socket) {
    let state = 'on';
    gpio.write(PUMP_1, true);

    socket.on('state', function(data) {
        state = data;
        console.log(state);

        if(state === 'on') {
            gpio.write(PUMP_1, false);
        } else if (state === 'off') {
            gpio.write(PUMP_1, true);
        } else {
            gpio.write(PUMP_1, true);
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
