const http = require('http');
const PORT = 5000;

function setLedsToState(state) {
    let colors = ["red", "green", "blue", "yellow", "reset"]
    let color = colors[-1];
    switch (state) {
        case "idle":
            color = colors[1]
            break;
        case "pouring":
            color = colors[0]
            break;
        default:
            color = colors[-1];
    }
    try {
        http.get(`http://localhost:${PORT}/${color}`).on('error', () => {
            console.log('[ERROR] Can not connect to LED Server');
        })
    } catch (err) {
        console.log('[ERROR] Can not connect to LED Server');
    }
    

}

module.exports.setLEDsToState = setLedsToState