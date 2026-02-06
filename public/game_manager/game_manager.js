import { updateState } from './app.js';

const playerListMap = new Map();

let roomCode;

// defaultNamesCheckbox.addEventListener('change', function () {
//   if (this.checked) {
//     console.log('enable default names');
//     socket.emit('set default names', { value: true, roomCode: roomCode });
//   } else {
//     socket.emit('set default names', { value: false, roomCode: roomCode });
//   }
// });
export function setupSocketEvents(socket) {
  socket.on('room created', (data) => {
    alert(`Room Code: ${data.roomCode}`);

    updateState({ loading: false, roomCode: data.roomCode });
    // Generate QR code
    // QRCode.toDataURL(`localhost:3000/join?room=${roomCode}`).then((dataURL) => {
    //   qrCodeImage.src = dataURL;
    // });
  });
}

// socket.on('joined game', (player) => {
//   console.log(`Host: Add player ${player}`);
//   playerListMap.set(player.id, `<li>${player.name}</li>`);
//   playerList.innerHTML = Array.from(playerListMap.values()).join(' ');
//   playerCount.innerText = `${playerListMap.size}/30`;
//   startButton.classList.remove('hidden');
// });

// socket.on('disconnected', (id) => {
//   socket.emit('remove player', { id, roomCode });
//   playerListMap.delete(id);
//   playerList.innerHTML = Array.from(playerListMap.values()).join(' ');
//   playerCount.innerText = `${playerListMap.size}/30`;

//   if (playerListMap.size <= 0) startButton.classList.add('hidden');
// });
