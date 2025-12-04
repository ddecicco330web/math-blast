const socket = io();

const hostButton = document.getElementById('host-button');
const roomCodeText = document.getElementById('room-code');
const playerList = document.getElementById('player-list');

const playerListMap = new Map();

let roomCode;

const hostGame = () => {
  socket.emit('create room');
};

hostButton.onclick = hostGame;

socket.on('room created', (data) => {
  alert(`Room Code: ${data.roomCode}`);

  // Show code and player list
  hostButton.classList.add('hidden');
  roomCodeText.innerText = data.roomCode;
  roomCode = data.roomCode;
  roomCodeText.classList.remove('hidden');
  playerList.classList.remove('hidden');
});

socket.on('joined game', (player) => {
  console.log(`Host: Add player ${player}`);
  playerListMap.set(player.id, `<li>${player.name}</li>`);
  playerList.innerHTML = Array.from(playerListMap.values()).join(' ');
});

socket.on('disconnected', (id) => {
  socket.emit('remove player', { id, roomCode });
  playerListMap.delete(id);
  playerList.innerHTML = Array.from(playerListMap.values()).join(' ');
});
