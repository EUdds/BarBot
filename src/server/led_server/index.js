const NUM_LEDS = 12;
const PORT = 7890;


var ParseStream = require('openpixelcontrol-stream').OpcParseStream,
    net = require('net'),
    ws281x = require('rpi-ws281x-native');


var server = net.createServer(function(conn) {
    var parser = new ParseStream({
        channel: 1,
        dataFormat: ParseStream.DataFormat.UINT32_ARRAY
    });

    parser.on('setpixelcolors', function(data) {
        ws281x.render(data);
    });

    conn.pipe(parser);
});

ws281x.init(NUM_LEDS);
server.listen(PORT);