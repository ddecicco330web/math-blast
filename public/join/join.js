import { generateName } from '../names.js';

const socket = io();

const codeInput = document.getElementById('room-code');
const connectButton = document.getElementById('connect-button');

const nameInput = document.getElementById('player-name');
const joinButton = document.getElementById('join-button');

const waitingText = document.getElementById('waiting-text');
const startingText = document.getElementById('starting-text');

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

  if (data.defaultNames) {
    nameInput.value = generateName();
    nameInput.disabled = true;
  }
});

socket.on('joined game', (player) => {
  if (player.id != socket.id) return;
  // Show waiting text
  nameInput.classList.add('hidden');
  joinButton.classList.add('hidden');
  waitingText.classList.remove('hidden');
});

socket.on('failed to join', (error) => {
  alert(error);

  // Reset
  nameInput.classList.add('hidden');
  joinButton.classList.add('hidden');
  waitingText.classList.add('hidden');
  codeInput.classList.remove('hidden');
  connectButton.classList.remove('hidden');
  codeInput.value = '';
});

socket.on('host disconnected', () => {
  alert('Host disconnected');

  // Reset
  nameInput.classList.add('hidden');
  joinButton.classList.add('hidden');
  waitingText.classList.add('hidden');
  codeInput.classList.remove('hidden');
  connectButton.classList.remove('hidden');
  codeInput.value = '';
});

socket.on('game started', () => {
  waitingText.classList.add('hidden');
  startingText.classList.remove('hidden');
});
