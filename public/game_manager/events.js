import { renderContent, state, updateState } from './util/state.js';

// Add event listeners
export function setupEventListeners() {
  // Listen for UI events
  document.getElementById('app').addEventListener('click', function (event) {
    if (event.target.matches('#host-button')) {
      state.get('socket').emit('create room');
      window.location.hash = '/lobby';
      getQRCodeSrc();
    }

    if (event.target.matches('#start-button')) {
      state.get('socket').emit('start game', roomCode);
    }
  });

  document.getElementById('app').addEventListener('change', function (event) {
    if (!event.target.matches('#default-names-checkbox')) return;

    console.log('enable default names');
    state.get('socket').emit('set default names', {
      value: event.target.checked,
      roomCode: state.get('roomCode')
    });
  });
}

export function setupSocketEvents() {
  state.get('socket').on('room created', (data) => {
    updateState({ key: 'roomCode', value: data.roomCode });
  });

  state.get('socket').on('joined game', (player) => {
    console.log(`Host: Add player ${player}`);
    updateState({
      key: 'playerListMap',
      value: playerListMap.set(player.id, `<li>${player.name}</li>`)
    });
    playerList.innerHTML = Array.from(state.get('playerListMap').values()).join(
      ' '
    );
    playerCount.innerText = `${state.get('playerListMap').size}/30`;
    startButton.classList.remove('hidden');
  });

  state.get('socket').on('disconnected', (id) => {
    state.get('socket').emit('remove player', { id, roomCode });
    state.get('playerListMap').delete(id);
    renderContent();
  });
}

async function getQRCodeSrc() {
  // Generate QR code
  const qrCodeSrc = await QRCode.toDataURL(
    `localhost:3000/join?room=${state.get('roomCode')}`
  );

  updateState({ key: 'qrCodeSrc', value: qrCodeSrc });
}
