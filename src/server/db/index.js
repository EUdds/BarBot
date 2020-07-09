const diskdb = require('diskdb');
db = diskdb.connect(`${__dirname}/data`, ['pumps', 'fluids', 'drinks']);

module.exports = db;