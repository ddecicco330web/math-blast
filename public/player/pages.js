import { connectToRoom } from './events.js';

export const getRoomCodePage = () => {
  // Extract Room Code from URL
  const urlParams = new URLSearchParams(window.location.search);
  let roomCode = urlParams.get('room');

  if (roomCode) {
    connectToRoom(roomCode);
    return;
  }

  return `<h1>Math Blast</h1>
    <input type="text" placeholder="Enter Code" id="room-code" />
    <button id="connect-button">Connect</button>`;
};

export const getNamePage = () => {
  return `<h1>Math Blast</h1>
  <input
      type="text"
      placeholder="Enter Name"
      id="player-name"
    />
    <button id="join-button">Join</button>`;
};

export const getLobbyPage = () => {
  return `<p id="waiting-text">Waiting for host...</p>`;
};

export const getGamePage = () => {
  return ` <p id="starting-text">Game Started</p>`;
};
