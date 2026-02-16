import { setupEventListeners, setupSocketEvents } from './events.js';
import { getGamePage, getHostPage, getLobbyPage } from './pages.js';
import { routes } from './util/router.js';
import { state, updateState } from './util/state.js';

// Set Routes
routes.set('#/', getHostPage);
routes.set('#/host', getHostPage);
routes.set('#/lobby', getLobbyPage);
routes.set('#/game', getGamePage);

const socket = io();
console.log(socket);

const initState = {
  socket: socket,
  isLoading: false,
  roomCode: null,
  playerListMap: new Map()
};

updateState(initState);
setupEventListeners();
setupSocketEvents();
