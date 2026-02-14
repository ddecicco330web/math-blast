import { setupEventListeners, setupSocketEvents } from './events.js';
import { getGamePage, getHostPage, getLobbyPage } from './pages.js';
import { routes } from './util/router.js';
import { state, updateState } from './util/state.js';

// Set Routes
routes.set('#/', getHostPage);
routes.set('#/host', getHostPage);
routes.set('#/lobby', getLobbyPage);
routes.set('#/game', getGamePage);

// Set State
state.set('socket', null);
state.set('isLoading', false);
state.set('roomCode', null);
state.set('qrCodeSrc', null);
state.set('playerListMap', new Map());

const socket = io();
updateState({ key: 'socket', value: socket });
setupEventListeners();
setupSocketEvents();
