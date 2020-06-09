const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  getCurrentUser,
  userJoin,
  getRoomUsers,
  userLeave,
} = require('./utils/users');

const PORT = process.env.PORT || 3000;
const botName = 'DevMeetup Chat Bot';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    socket.emit('message', formatMessage(botName, 'Welcome to DevMeetup Chat'));

    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat!`),
      );

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on('chatMessage', (message) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit(
      'message',
      formatMessage(`${user.username}`, message),
    );
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`),
      );

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});
