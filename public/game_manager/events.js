import { renderContent, state, updateState } from './util/state.js';

// Add event listeners
export const setupEventListeners = () => {
  // Listen for UI events
  document.getElementById('app').addEventListener('click', (event) => {
    if (event.target.matches('#host-button')) {
      state.socket.emit('create room');
      window.location.hash = '/lobby';
      getQRCodeSrc();
    }

    if (event.target.matches('#start-button')) {
      state.socket.emit('start game', state.roomCode);
      console.log('start game');
    }
  });

  document.getElementById('app').addEventListener('change', (event) => {
    if (!event.target.matches('#default-names-checkbox')) return;

    console.log('enable default names');
    state.socket.emit('set default names', {
      value: event.target.checked,
      roomCode: state.roomCode
    });
  });
};

export const setupSocketEvents = () => {
  state.socket.on('room created', (data) => {
    updateState({ roomCode: data.roomCode });
  });

  state.socket.on('joined game', (player) => {
    console.log(`Host: Add player ${player}`);

    state.playerListMap.set(player.id, `<li>${player.name}</li>`);
    renderContent();
  });

  state.socket.on('disconnected', (id) => {
    state.socket.emit('remove player', { id, roomCode: state.roomCode });
    state.playerListMap.delete(id);
    renderContent();
  });
};

const getQRCodeSrc = async () => {
  // Generate QR code
  const qrCodeSrc = await QRCode.toDataURL(
    `localhost:3000/join?room=${state.roomCode}`
  );

  updateState({ qrCodeSrc: qrCodeSrc });
};
