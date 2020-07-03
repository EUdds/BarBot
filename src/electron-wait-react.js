const net = require('net');

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: 3000}, () => {
  //  console.log('Trying to connect');
    client.end();
       if(!startedElectron) {
           startedElectron = true;
           const exec = require('child_process').exec;
          // console.log('EXECUTING');
          const electron = exec('DISPLAY=:0 nohup npm run electron');
           electron.stdout.on('data', function(data) {
               console.log('Child Process: ' + data.toString());
              });
     }
});

tryConnection();

client.on('error', (error) => {
    //  console.log(startedElectron);
      setTimeout(tryConnection, 2000);
});
