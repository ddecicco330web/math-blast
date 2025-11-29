const socket = io();

const codeInput = document.getElementById('room-code');
const connectButton = document.getElementById('connect-button');

const nameInput = document.getElementById('player-name');
const joinButton = document.getElementById('join-button');

let roomCode = null;

// Send Events
const connectToRoom = () => {
  socket.emit('connect to room', { roomCode: codeInput.value });
};

connectButton.onclick = connectToRoom;

const joinGame = () => {
  socket.emit('join game', { name: nameInput.value, roomCode: roomCode });
};

joinButton.onclick = joinGame;

// Receive Events
socket.on('connected to room', (data) => {
  if (data.error) {
    alert(data.error);
    return;
  } else alert('Joined Room');

  roomCode = codeInput.value;

  // Show Name Form
  codeInput.classList.add('hidden');
  connectButton.classList.add('hidden');
  nameInput.classList.remove('hidden');
  joinButton.classList.remove('hidden');
});
