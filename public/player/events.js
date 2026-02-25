import { generateName } from '../names.js';
import { drawQuestion } from './question_pool.js';
import { resetState, state, updateState } from './util/state.js';

export const connectToRoom = (roomCode) => {
  console.log(roomCode);
  state.socket.emit('connect to room', {
    roomCode: roomCode
  });
};

const joinGame = () => {
  state.socket.emit('join game', {
    name: document.getElementById('player-name').value,
    roomCode: state.roomCode
  });
};

export const setupEventListeners = () => {
  document.getElementById('app').addEventListener('click', (event) => {
    console.log(event.target);
    if (event.target.matches('#connect-button'))
      connectToRoom(document.getElementById('room-code').value);
    if (event.target.matches('#join-button')) joinGame();
    if (event.target.matches('#answer-button')) {
      console.log(document.getElementById('answer-input').value);
      console.log(state.currentPair[0] * state.currentPair[1]);
      if (
        state.currentPair[0] * state.currentPair[1] ==
        document.getElementById('answer-input').value
      ) {
        console.log('correct');
        state.socket.emit('player scored');
        drawQuestion();
      } else console.log('wrong');
    }
  });
};

export const setupSocketEvents = () => {
  state.socket.on('connected to room', (data) => {
    if (data.error) {
      alert(data.error);
      return;
    } else alert('Joined Room');

    let playerName = null;
    let defaultName = false;
    if (data.defaultNames) {
      playerName = generateName();
      defaultName = true;
    }

    console.log(playerName, defaultName);

    console.log(data);
    updateState({
      roomCode: data.roomCode,
      playerName: playerName,
      defaultName: defaultName
    });

    window.location.hash = '/name';
  });

  state.socket.on('joined game', (player) => {
    if (player.id != state.socket.id) return;

    window.location.hash = '/lobby';
  });

  state.socket.on('failed to join', (error) => {
    alert(error);
    window.location.hash = '/';
  });

  state.socket.on('host disconnected', () => {
    alert('Host disconnected');
    resetState();
    window.location.hash = '/';
  });

  state.socket.on('game started', () => {
    console.log('game started');
    drawQuestion();
    window.location.hash = '/game';
  });
};
