import { handleRoute } from './util/router.js';
import { renderContent, state, updateState } from './util/state.js';

// Add event listeners
export function setupEventListeners() {
  // Listen for navigation events
  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);

  // Listen for UI events
  document.getElementById('app').addEventListener('click', function (event) {
    if (event.target.matches('#host-button')) {
      state.socket.emit('create room');
      window.location.hash = '/lobby';
      getQRCodeSrc();
    }

    if (event.target.matches('#start-button')) {
      state.socket.emit('start game', roomCode);
    }
  });

  document.getElementById('app').addEventListener('change', function (event) {
    if (!event.target.matches('#default-names-checkbox')) return;

    console.log('enable default names');
    state.socket.emit('set default names', {
      value: event.target.checked,
      roomCode: state.roomCode
    });
  });
}

export function setupSocketEvents() {
  state.socket.on('room created', (data) => {
    updateState({ key: 'roomCode', value: data.roomCode });
  });

  state.socket.on('joined game', (player) => {
    console.log(`Host: Add player ${player}`);
    updateState({
      key: 'playerListMap',
      value: playerListMap.set(player.id, `<li>${player.name}</li>`)
    });
    playerList.innerHTML = Array.from(state.playerListMap.values()).join(' ');
    playerCount.innerText = `${state.playerListMap.size}/30`;
    startButton.classList.remove('hidden');
  });

  state.socket.on('disconnected', (id) => {
    state.socket.emit('remove player', { id, roomCode });
    state.playerListMap.delete(id);
    renderContent();
  });
}

async function getQRCodeSrc() {
  // Generate QR code
  const qrCodeSrc = await QRCode.toDataURL(
    `localhost:3000/join?room=${state.roomCode}`
  );

  updateState({ key: 'qrCodeSrc', value: qrCodeSrc });
}
