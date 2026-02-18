import {
  connectToRoom,
  setupEventListeners,
  setupSocketEvents
} from './events.js';
import {
  getGamePage,
  getLobbyPage,
  getNamePage,
  getRoomCodePage
} from './pages.js';
import { routes } from './util/router.js';
import { initializeState } from './util/state.js';

// Set Routes
routes.set('#/', getRoomCodePage);
routes.set('#/name', getNamePage);
routes.set('#/lobby', getLobbyPage);
routes.set('#/game', getGamePage);

const socket = io();
// Set State
initializeState({
  socket: socket,
  isLoading: false,
  roomCode: null,
  playerName: null,
  defaultName: false
});

setupEventListeners();
setupSocketEvents();
