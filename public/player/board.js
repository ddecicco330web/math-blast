import { getFactorBlock, getSolutionBlock } from './block.js';
import { updateState } from './util/state.js';
import createElement from './vDOM/createElement.js';

const BOARD_WIDTH = 9;
const BOARD_HEIGHT = 3;
const EQUATION_WIDTH = 3;
const OPERATORS = ['x', '='];

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
  // `newBoard.children[0]` is the `.game-board` container whose children are the rows.
  newBoard.children[0].children.push(
    createElement('div', {
      attrs: {
        class: 'board-row',
        'data-row': String(3)
      },
      children: populateRow(getRow(3))
    })
  );
  updateState({ board: newBoard });
};

const populateRow = (row) => {
  // `row` is an array of equation-group vnodes. These indexes reach into the
  // first group's slot children to place blocks in specific board positions.
  row[0].children[0].children.push(getFactorBlock(6));
  row[0].children[4].children.push(getSolutionBlock(6, 7));
  return row;
};
