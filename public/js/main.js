const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.querySelector('#room-name');
const userList = document.querySelector('#users');

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit('joinRoom', { username, room });

socket.on('message', (message) => {
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = e.target.elements.msg.value;

  socket.emit('chatMessage', message);

  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
   <p class="text">${message.text}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

function outputUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join('')}
  `;
}

function outputRoomName(room) {
  roomName.innerText = room;
}
