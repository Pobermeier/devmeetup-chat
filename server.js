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
  console.log('New web socket connection');
});
