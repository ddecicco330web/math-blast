import { timer } from './events.js';
import { state } from './util/state.js';

// Define page content functions
export const getHostPage = () => {
  return `<h1>Math Blast</h1>
    <button id="host-button">Host Game</button>`;
};

export const getLobbyPage = () => {
  const leaderboardList = state.leaderboard
    .map((player) => `<li>${player.name}</li>`)
    .join('');

  return `<h1>Math Blast</h1>
    <p id="room-code">${state.roomCode ? state.roomCode : 'Loading...'}</p>
    ${state.qrCodeSrc ? `<img id="qr-code-image" src=${state.qrCodeSrc} />` : ''}
    <input type="checkbox" id="default-names-checkbox" />
    <label for="default-names" id="default-names-label">Default Names</label>
    <p id="player-count">${state.leaderboard.length}/30</p>
    <ul id="player-list">${leaderboardList}</ul>
    <button id="start-button" ${state.leaderboard.length ? '' : `class="hidden"`}>Start</button>`;
};

export const getGamePage = () => {
  if (state.time <= 0) {
    clearInterval(timer);
  }
  const minutes = Math.floor(state.time / 60000);
  const seconds = Math.floor((state.time % 60000) / 1000);
  const leaderboardList = state.leaderboard
    .map((player) => `<li>${player.name}: ${player.score}</li>`)
    .join('');

  return `<p id="time" >${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}</p>
    <ul id="player-list">${leaderboardList}</ul>`;
};
