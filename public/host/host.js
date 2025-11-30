const socket = io();

const hostButton = document.getElementById('host-button');
const roomCode = document.getElementById('room-code');
const playerList = document.getElementById('player-list');

const hostGame = () => {
  socket.emit('create room');
};

hostButton.onclick = hostGame;

socket.on('room created', (data) => {
  alert(`Room Code: ${data.roomCode}`);

  // Show code and player list
  hostButton.classList.add('hidden');
  roomCode.innerText = data.roomCode;
  roomCode.classList.remove('hidden');
  playerList.classList.remove('hidden');
});

socket.on('joined game', (player) => {
  console.log(`Host: Add player ${player}`);
  playerList.innerHTML += `<li>${player.name}</li>`;
});
