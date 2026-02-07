import { routes } from './router.js';

// Define state object
export const state = {
  socket: null,
  isLoading: false,
  roomCode: null,
  qrCodeSrc: null,
  playerListMap: new Map()
};

// Update state and refresh view
export function updateState(args) {
  if (args.key) state[args.key] = args.value;
  else Object.assign(state, args);
  renderContent();
}

// Render content based on state
export function renderContent() {
  const appDiv = document.getElementById('app');

  if (state.isLoading) {
    appDiv.innerHTML = '<div>Loading...</div>';
    return;
  }

  appDiv.innerHTML = routes[window.location.hash || '#/host']();
}
