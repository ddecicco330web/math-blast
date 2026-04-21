import { connectToRoom } from './events.js';
import { state } from './util/state.js';
import createElement from './vDOM/createElement.js';

export const getRoomCodePage = () => {
  if (!state.roomCode) {
    // Extract Room Code from URL
    const urlParams = new URLSearchParams(window.location.search);
    let roomCode = urlParams.get('room');

    if (roomCode) {
      connectToRoom(roomCode);
    }
  }

  return createElement('div', {
    attrs: { id: 'root' },
    children: [
      createElement('h1', { children: ['Math Blast'] }),
      createElement('input', {
        attrs: { type: 'text', placeholder: 'Enter Code', id: 'room-code' }
      }),
      createElement('button', {
        attrs: { id: 'connect-button' },
        children: ['Connect']
      })
    ]
  });

  // return `<h1>Math Blast</h1>
  //   <input type="text" placeholder="Enter Code" id="room-code" />
  //   <button id="connect-button">Connect</button>`;
};

export const getNamePage = () => {
  return createElement('div', {
    attrs: { id: 'root' },
    children: [
      createElement('h1', { children: ['Math Blast'] }),
      createElement('input', {
        attrs: {
          type: 'text',
          placeholder: 'Enter Name',
          id: 'player-name',
          value: state.playerName ? `${state.playerName}` : '',
          ...(state.defaultNames && { disabled: true })
        }
      }),
      createElement('button', {
        attrs: { id: 'join-button' },
        children: ['Join']
      })
    ]
  });

  // return `<h1>Math Blast</h1>
  // <input
  //     type="text"
  //     placeholder="Enter Name"
  //     id="player-name"
  //     ${state.playerName ? `value = ${state.playerName}` : ''}
  //     ${state.defaultName ? 'disabled' : ''}
  //   />
  //   <button id="join-button">Join</button>`;
};

export const getLobbyPage = () => {
  return createElement('div', {
    attrs: { id: 'root' },
    children: [
      createElement('p', {
        attrs: { id: 'waiting-text' },
        children: ['Waiting for host...']
      })
    ]
  });
  //return `<p id="waiting-text">Waiting for host...</p>`;
};

const getGameMainPanel = () => {
  const dragStyle =
    state.draggedAnswer && state.dragPosition
      ? `position: fixed; left: ${state.dragPosition.left}px; top: ${state.dragPosition.top}px; width: ${state.dragPosition.width}px; height: ${state.dragPosition.height}px; z-index: 1000; pointer-events: none;`
      : '';

  return createElement('section', {
    attrs: { class: 'game-main-panel' },
    children: [
      createElement('div', {
        attrs: { class: 'current-answer-slot' },
        children: state.currentAnswer
          ? [
              createElement('div', {
                attrs: {
                  class: `current-answer-dragger${state.draggedAnswer ? ' is-dragging' : ''}`,
                  'data-current-answer': 'true',
                  style: dragStyle
                },
                children: [state.currentAnswer]
              })
            ]
          : [
              createElement('p', {
                attrs: { class: 'answer-panel-empty' },
                children: ['No answer ready.']
              })
            ]
      }),
      createElement('div', {
        attrs: { class: 'game-board-column' },
        children: [state.board]
      })
    ]
  });
};

export const getGamePage = () => {
  //if (state.questionTime <= 0 || !state.currentPair) drawQuestion();

  //const seconds = Math.floor((state.questionTime % 60000) / 1000);

  return createElement('div', {
    attrs: { id: 'root', class: 'game-page' },
    children: [
      createElement('div', {
        attrs: { class: 'game-layout' },
        children: [getGameMainPanel()]
      })
    ]
  });

  // return `<p>${String(seconds).padStart(2, '0')}</p>
  // <p id="starting-text">${state.currentPair[0]} * ${state.currentPair[1]}</p>
  // <input type="number" id="answer-input"/>
  //   <button id="answer-button">Submit</button>`;
};

export const getGameOverPage = () => {
  return createElement('div', {
    attrs: { id: 'root' },
    children: [
      createElement('p', {
        children: ['Game Over']
      })
    ]
  });
  //return ` <p>Game Over</p>`;
};
