const socket = io();

const codeInput = document.getElementById('room-code');
const connectButton = document.getElementById('connect-button');

const nameInput = document.getElementById('player-name');
const nextButton = document.getElementById('next-button');

const joinGame = () => {
  const roomCode = codeInput.innerText;
  socket.emit('join room', { roomCode: roomCode });
};

document.getElementById('connect-button').onclick = joinGame;

socket.on('joined room', (data) => {
  if (data.error) alert(data.error);
});
