import { getFactorBlock, getSolutionBlock } from './block.js';
import { updateState } from './util/state.js';
import createElement from './vDOM/createElement.js';

const BOARD_WIDTH = 9;
const BOARD_HEIGHT = 3;
const EQUATION_WIDTH = 3;
const OPERATORS = ['x', '='];
const LEFT_NUM_INDEX = 0;
const RIGHT_NUM_INDEX = 2;
const SOLUTION_INDEX = 4;

const getGroup = (groupIndex, rowIndex) => {
  // Each group renders one equation segment: slot, operator, slot, operator, slot.
  return Array.from({ length: EQUATION_WIDTH }, (_, slotIndex) => {
    const columnIndex = groupIndex * EQUATION_WIDTH + slotIndex;
    const boardIndex = rowIndex * BOARD_WIDTH + columnIndex;
    const parts = [
      createElement('div', {
        attrs: {
          class: 'board-slot',
          'data-slot-index': String(boardIndex),
          'data-row': String(rowIndex),
          'data-column': String(columnIndex)
        },
        children: []
      })
    ];

    // The first two slots in each equation get their visual operators after them.
    if (slotIndex < OPERATORS.length) {
      parts.push(
        createElement('div', {
          attrs: {
            class: 'board-operator',
            'aria-hidden': 'true'
          },
          children: [OPERATORS[slotIndex]]
        })
      );
    }

    return parts;
  }).flat();
};

const getRow = (rowIndex) => {
  // A row is made of three equation groups across the board width.
  return Array.from({ length: BOARD_WIDTH / EQUATION_WIDTH }, (_, groupIndex) =>
    createElement('div', {
      attrs: { class: 'equation-group' },
      children: getGroup(groupIndex, rowIndex)
    })
  );
};

export const getBoard = () => {
  const rows = Array.from({ length: BOARD_HEIGHT }, (_, rowIndex) =>
    createElement('div', {
      attrs: {
        class: 'board-row',
        'data-row': String(rowIndex)
      },
      children: getRow(rowIndex)
    })
  );

  return createElement('div', {
    attrs: {
      class: 'board-shell'
    },
    children: [
      createElement('div', {
        attrs: {
          id: 'game-board',
          class: 'game-board'
        },
        children: rows
      })
    ]
  });
};

export const generateRow = () => {
  const newBoard = getBoard();
  const bottomRowIndex = BOARD_HEIGHT - 1;

  // Replace the last row in-place so the board keeps its fixed height.
  newBoard.children[0].children[bottomRowIndex] = createElement('div', {
    attrs: {
      class: 'board-row',
      'data-row': String(bottomRowIndex)
    },
    children: populateRow(getRow(bottomRowIndex))
  });

  updateState({ board: newBoard });
};

const populateRow = (row) => {
  row.forEach((group) => {
    const left = Math.floor(Math.random() * 13);
    const right = Math.floor(Math.random() * 13);

    const blank = Math.floor(Math.random() * 3);

    if (blank != 0)
      group.children[LEFT_NUM_INDEX].children.push(getFactorBlock(left));

    if (blank != 1)
      group.children[RIGHT_NUM_INDEX].children.push(getFactorBlock(right));

    if (blank != 2)
      group.children[SOLUTION_INDEX].children.push(
        getSolutionBlock(left, right)
      );
  });

  return row;
};
