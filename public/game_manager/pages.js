import { state } from './util/state.js';

// Define page content functions
export const getHostPage = () => {
  return `<h1>Math Blast</h1>
    <button id="host-button">Host Game</button>`;
};

export const getLobbyPage = () => {
  return `<h1>Math Blast</h1>
    <p id="room-code">${state.roomCode ? state.roomCode : 'Loading...'}</p>
    ${state.qrCodeSrc ? `<img id="qr-code-image" src=${state.qrCodeSrc} />` : ''}
    <input type="checkbox" id="default-names-checkbox" />
    <label for="default-names" id="default-names-label">Default Names</label>
    <p id="player-count">0/30</p>
    <ul id="player-list">${state.playerListMap.size ? state.playerListMap.forEach((player) => player) : ''}</ul>
    <button id="start-button" ${state.playerListMap.size ? '' : `class="hidden"`}>Start</button>`;
};

export const getGamePage = () => {
  return `<p id="starting-text" >Game Started</p>`;
};
