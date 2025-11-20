const socket = io();

const hostGame = () => {
  socket.emit('create room');
};

document.getElementById('host-button').onclick = hostGame;

socket.on('room created', (data) => {
  alert(`Room Code: ${data.roomCode}`);
});
