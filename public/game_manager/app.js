import { setupEventListeners, setupSocketEvents } from './events.js';
import {
  getGameOverPage,
  getGamePage,
  getHostPage,
  getLobbyPage
} from './pages.js';
import { routes } from './util/router.js';
import { updateState } from './util/state.js';

// Set Routes
routes.set('#/', getHostPage);
routes.set('#/host', getHostPage);
routes.set('#/lobby', getLobbyPage);
routes.set('#/game', getGamePage);
routes.set('#/gameover', getGameOverPage);

const socket = io();

const initState = {
  socket: socket,
  isLoading: false,
  roomCode: null,
  leaderboard: [],
  time: 60000 // 1 minute
};

updateState(initState);
setupEventListeners();
setupSocketEvents();
