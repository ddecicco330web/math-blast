import { setupEventListeners, setupSocketEvents } from './events.js';
import { updateState } from './util/state.js';

const socket = io();
updateState({ key: 'socket', value: socket });
setupEventListeners();
setupSocketEvents();
