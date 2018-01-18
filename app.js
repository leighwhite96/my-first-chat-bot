const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const api = require('./api');

io.on('connection', socket => {
  //client connected
  socket.on('fromClient', data => {
    console.log('DATA INSIDE fromClient', data)
    api.getResponse(data)
    .then(res => {
      console.log('RESPONSE', res);
      socket.emit('fromServer', {server: res})
    })
  })
});

app.get('/', (req,res) => {
  res.json({'message': 'HOME'})
})

server.listen(5000, () => console.log('listening on 5000'))
