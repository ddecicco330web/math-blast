import { connectToRoom } from './events.js';
import { state } from './util/state.js';

export const getRoomCodePage = () => {
  if (!state.roomCode) {
    // Extract Room Code from URL
    const urlParams = new URLSearchParams(window.location.search);
    let roomCode = urlParams.get('room');

    if (roomCode) {
      connectToRoom(roomCode);
    }
  }

  return `<h1>Math Blast</h1>
    <input type="text" placeholder="Enter Code" id="room-code" />
    <button id="connect-button">Connect</button>`;
};

export const getNamePage = () => {
  console.log(state);
  return `<h1>Math Blast</h1>
  <input
      type="text"
      placeholder="Enter Name"
      id="player-name"
      ${state.playerName ? `value = ${state.playerName}` : ''}
      ${state.defaultName ? 'disabled' : ''}
    />
    <button id="join-button">Join</button>`;
};

export const getLobbyPage = () => {
  return `<p id="waiting-text">Waiting for host...</p>`;
};

export const getGamePage = () => {
  return ` <p id="starting-text">Game Started</p>`;
};
