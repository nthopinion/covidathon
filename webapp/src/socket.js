import openSocket from 'socket.io-client';

var HOST = window.location.origin.replace(/^http/, 'ws')

if(HOST.indexOf('localhost') > -1){
  HOST='localhost:4200'
}
const  socket = openSocket(HOST);

export default socket;
