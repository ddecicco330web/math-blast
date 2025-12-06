const socket = io();

const hostButton = document.getElementById('host-button');
const roomCodeText = document.getElementById('room-code');
const playerList = document.getElementById('player-list');
const playerCount = document.getElementById('player-count');
const startButton = document.getElementById('start-button');
const startingText = document.getElementById('starting-text');

const playerListMap = new Map();

let roomCode;

const hostGame = () => {
  socket.emit('create room');
};

hostButton.onclick = hostGame;

const startGame = () => {
  socket.emit('start game', roomCode);
  roomCodeText.classList.add('hidden');
  playerList.classList.add('hidden');
  playerCount.classList.add('hidden');
  startButton.classList.add('hidden');
  startingText.classList.remove('hidden');
};

startButton.onclick = startGame;

socket.on('room created', (data) => {
  alert(`Room Code: ${data.roomCode}`);

  // Show code, player list, and player count
  hostButton.classList.add('hidden');
  roomCodeText.innerText = data.roomCode;
  roomCode = data.roomCode;
  roomCodeText.classList.remove('hidden');
  playerList.classList.remove('hidden');
  playerCount.classList.remove('hidden');
  playerCount.innerText = '0/30';
});

socket.on('joined game', (player) => {
  console.log(`Host: Add player ${player}`);
  playerListMap.set(player.id, `<li>${player.name}</li>`);
  playerList.innerHTML = Array.from(playerListMap.values()).join(' ');
  playerCount.innerText = `${playerListMap.size}/30`;
  startButton.classList.remove('hidden');
});

socket.on('disconnected', (id) => {
  socket.emit('remove player', { id, roomCode });
  playerListMap.delete(id);
  playerList.innerHTML = Array.from(playerListMap.values()).join(' ');
  playerCount.innerText = `${playerListMap.size}/30`;

  if (playerListMap.size <= 0) startButton.classList.add('hidden');
});
