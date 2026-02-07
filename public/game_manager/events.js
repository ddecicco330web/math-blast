import { handleRoute } from './util/router.js';
import { state, updateState } from './util/state.js';

// Add event listeners
export function setupEventListeners() {
  // Listen for navigation events
  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);

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
}

export function setupSocketEvents() {
  state.socket.on('room created', (data) => {
    updateState({ loading: false, roomCode: data.roomCode });
  });
}

async function getQRCodeSrc() {
  // Generate QR code
  const qrCodeSrc = await QRCode.toDataURL(
    `localhost:3000/join?room=${state.roomCode}`
  );

  updateState({
    isLoading: false,
    roomCode: state.roomCode,
    qrCodeSrc: qrCodeSrc
  });
}
