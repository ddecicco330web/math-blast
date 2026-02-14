import { state } from './util/state.js';

// Define page content functions
export function getHostPage() {
  return `<h1>Math Blast</h1>
    <button id="host-button">Host Game</button>`;
}

export function getLobbyPage() {
  return `<h1>Math Blast</h1>
    <p id="room-code">${state.get('roomCode') ? state.get('roomCode') : 'Loading...'}</p>
    ${state.get('qrCodeSrc') ? `<img id="qr-code-image" src=${state.get('qrCodeSrc')} />` : ''}
    <input type="checkbox" id="default-names-checkbox" />
    <label for="default-names" id="default-names-label">Default Names</label>
    <p id="player-count">0/30</p>
    <ul id="player-list">${state.get('playerListMap').size ? state.get('playerListMap').forEach((player) => player) : ''}</ul>
    <button id="start-button" ${state.get('playerListMap').size ? '' : `class="hidden"`}>Start</button>`;
}

export function getGamePage() {
  return `<p id="starting-text" >Game Started</p>`;
}
