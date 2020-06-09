const path = require('path');
const express = require('express');
const socketio = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = socketio(server);

io.on('connection', (socket) => {
  socket.emit('message', 'Welcome to DevMeetup Chat');

  socket.broadcast.emit('message', 'A user has joined the chat!');

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });

  socket.on('chatMessage', (message) => {
    io.emit('message', message);
  });
});
