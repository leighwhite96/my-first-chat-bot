import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

export const chat = (cb,value) => {
  socket.on('fromClient', msg => cb(null,msg));
  socket.emit('fromClient', value );
}

export default chat
