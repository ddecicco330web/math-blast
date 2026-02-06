import { setupSocketEvents } from './game_manager.js';

const socket = io();
setupEventListeners();
setupSocketEvents(socket);

// Define page content functions
function getHostPage() {
  return `<h1>Math Blast</h1>
    <button id="host-button">Host Game</button>`;
}

function getLobbyPage() {
  return `<h1>Math Blast</h1>
    <p id="room-code">${state.roomCode}</p>
    <img id="qr-code-image" class="hidden" />
    <input type="checkbox" id="default-names-checkbox" />
    <label for="default-names" id="default-names-label">Default Names</label>
    <p id="player-count"></p>
    <ul id="player-list"></ul>
    <button id="start-button">Start</button>`;
}

function getGamePage() {
  return `<p id="starting-text" >Game Started</p>`;
}

// Set routing table
const routes = {
  '#/host': getHostPage,
  '#/lobby': getLobbyPage,
  '#/game': getGamePage
};

// Handle URL changes
function handleRoute() {
  const hash = window.location.hash || '#/host';
  console.log(hash);
  const content = routes[hash] ? routes[hash]() : `<h1>Page Not Found</h1>`;
  document.getElementById('app').innerHTML = content;
}

// Listen for navigation events
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);

// Define state object
const state = {
  isLoading: false,
  roomCode: null
};

// Update state and refresh view
export function updateState(newState) {
  Object.assign(state, newState);
  renderContent();
}

// Render content based on state
function renderContent() {
  const appDiv = document.getElementById('app');

  if (state.isLoading) {
    appDiv.innerHTML = '<div>Loading...</div>';
    return;
  }

  appDiv.innerHTML = routes[window.location.hash || '#/host']();
}

// Add event listeners
function setupEventListeners() {
  document.getElementById('app').addEventListener('click', function (event) {
    if (event.target.matches('#host-button')) {
      socket.emit('create room');
      window.location.hash = '/lobby';
    }

    if (event.target.matches('#start-button')) {
      socket.emit('start game', roomCode);
    }
  });
}
