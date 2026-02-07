import { state } from './util/state.js';

// Define page content functions
export function getHostPage() {
  return `<h1>Math Blast</h1>
    <button id="host-button">Host Game</button>`;
}

export function getLobbyPage() {
  return `<h1>Math Blast</h1>
    <p id="room-code">${state.roomCode}</p>
    ${state.qrCodeSrc ? `<img id="qr-code-image" src=${state.qrCodeSrc} />` : ''}
    <input type="checkbox" id="default-names-checkbox" />
    <label for="default-names" id="default-names-label">Default Names</label>
    <p id="player-count"></p>
    <ul id="player-list">${state.playerListMap.size ? state.playerListMap.forEach((player) => player) : ''}</ul>
    <button id="start-button" ${state.playerListMap.size ? '' : `class="hidden"`}>Start</button>`;
}

export function getGamePage() {
  return `<p id="starting-text" >Game Started</p>`;
}
