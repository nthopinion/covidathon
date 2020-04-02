//Source: https://github.com/nguymin4/react-videocall/blob/master/server/lib/server.js

const express = require('express');
const { createServer } = require('http');
const io = require('socket.io');

const app = express();
const server = createServer(app);
var cors = require('cors')
const userIds = {};
const noop = () => {};

app.use(cors())

app.use(express.static(__dirname + '/build'));

app.get('*', function(req, res){
  res.sendfile(__dirname + '/build/index.html');
});
// app.get('/', express.static(`${process.cwd()}/../build/index.html`));
console.log(`${process.cwd()}/build/index.html`)




var keys = ['patient', 'physician']
var lastOne = '';
const MIN = 1000;
const MAX = 9999;

function randomID(callback) {
  console.log('userIds', userIds)
  const num = Math.round(Math.random());
  const numK = Math.floor(Math.random() * ((MAX + 1) - MIN)) + MIN;
  const numM = Math.floor(Math.random() * ((MAX + 1) - MIN)) + MIN;

  var id = keys[num];
  if (lastOne === id ) id = keys[num===0?1:0];
  lastOne=id;
  callback(id+'-'+numK+'-'+numM);
}

/**
 * Send data to friend
 */
function sendTo(to, done, fail) {
  const receiver = userIds[to];
  if (receiver) {
    const next = typeof done === 'function' ? done : noop;
    next(receiver);
  } else {
    const next = typeof fail === 'function' ? fail : noop;
    next();
  }
}
// [START hello_world]
// Say hello!
app.get('/test', (req, res) => {
  res.status(200).send('Hello, world!');
});

module.exports.run = (config) => {
  server.listen(config.PORT);
  console.log(`Server is listening at :${config.PORT}`);
  let id;

  io.listen(server, { log: true,  origins: '*:*' })
    .on('connection', (client) => {
      client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
      });
        client.on('init', () => {
          randomID((_id) => {
          id = _id;
          userIds[id] = client;
          client.emit('init', { id });
          });
        })
        client.on('request', (data) => {
          sendTo(data.to, to => to.emit('request', { from: id }));
        })
        client.on('call', (data) => {
          sendTo(
          data.to,
          to => to.emit('call', { ...data, from: id }),
          () => client.emit('failed')
          );
        })
        client.on('end', (data) => {
          sendTo(data.to, to => to.emit('end'));
        })
      client.on('stream',function(image){
            console.log('stream', image);
            client.broadcast.emit('stream',image);
        });
      client.on('SEND_MESSAGE', function(data){
            console.log('SEND_MESSAGE', data);
            client.emit('RECEIVE_MESSAGE', data);
            client.broadcast.emit('RECEIVE_MESSAGE',data);

        });
    })

};
