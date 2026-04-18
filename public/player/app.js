import { generateBoard } from './board.js';
import { setupEventListeners, setupSocketEvents } from './events.js';
import {
  getGameOverPage,
  getGamePage,
  getLobbyPage,
  getNamePage,
  getRoomCodePage
} from './pages.js';
import { routes } from './util/router.js';
import { initializeState } from './util/state.js';

export const QUESTION_TIME = 10000; // 10 seconds
export const POINT_MULTIPLIER = 100;

// Set Routes
routes.set('#/', getRoomCodePage);
routes.set('#/name', getNamePage);
routes.set('#/lobby', getLobbyPage);
routes.set('#/game', getGamePage);
routes.set('#/gameover', getGameOverPage);

const socket = io();
const { board, answerList } = generateBoard();
// Set State
initializeState({
  socket: socket,
  isLoading: false,
  roomCode: null,
  playerName: null,
  defaultName: false,
  currentPair: [],
  questionTime: QUESTION_TIME,
  textInput: '',
  answerList: answerList,
  currentAnswer: answerList.pop(),
  draggedAnswer: null,
  dragPosition: null,
  dragOffset: null,
  board: board
});

setupEventListeners();
setupSocketEvents();
