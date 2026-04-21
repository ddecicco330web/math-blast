import { getFactorBlock, getSolutionBlock } from './block.js';
import { state, updateState } from './util/state.js';
import createElement from './vDOM/createElement.js';

const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 5;
const EQUATION_WIDTH = 3;
const OPERATORS = ['x', '='];
const LEFT_NUM_INDEX = 0;
const RIGHT_NUM_INDEX = 2;
const SOLUTION_INDEX = 4;
const NUM_ROWS_TO_POPULATE = 3;

// These metadata entries describe the three fillable parts of `a x b = c`.
// `childIndex` points at the slot inside a rendered group; operators sit between slots.
const QUESTION_PARTS = [
  {
    blankValue: 0,
    childIndex: LEFT_NUM_INDEX,
    getBlock: ({ left }) => getFactorBlock(left)
  },
  {
    blankValue: 1,
    childIndex: RIGHT_NUM_INDEX,
    getBlock: ({ right }) => getFactorBlock(right)
  },
  {
    blankValue: 2,
    childIndex: SOLUTION_INDEX,
    getBlock: ({ left, right }) => getSolutionBlock(left, right)
  }
];

const shuffleList = (list) => {
  for (let i = list.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [list[i], list[randomIndex]] = [list[randomIndex], list[i]];
  }
};

const getGroup = (groupIndex, rowIndex) => {
  // Each group renders one equation segment: slot, operator, slot, operator, slot.
  return Array.from({ length: EQUATION_WIDTH }, (_, slotIndex) => {
    const columnIndex = groupIndex * EQUATION_WIDTH + slotIndex;
    // Slots are addressed on the whole board, not just within a row/group.
    // That lets drag/drop and events refer to one flat index everywhere else.
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

export const generateBoard = () => {
  const board = getBoard();
  const answerList = [];

  // Populate bottom rows with questions
  for (let i = 1; i <= NUM_ROWS_TO_POPULATE; i++) {
    board.children[0].children[BOARD_HEIGHT - i] = createElement('div', {
      attrs: {
        class: 'board-row',
        'data-row': String(BOARD_HEIGHT - i)
      },
      children: populateRow(
        getRow(BOARD_HEIGHT - i),
        answerList,
        // If top layer, don't hide group
        i === NUM_ROWS_TO_POPULATE ? false : true
      )
    });
  }

  return { board, answerList };
};

export const generateRow = () => {
  const newBoard = getBoard();
  const bottomRowIndex = BOARD_HEIGHT - 1;
  const answerList = [];

  // Replace the last row in-place so the board keeps its fixed height.
  // Only the bottom row gets numbers; the rows above stay empty scaffolding for now.
  newBoard.children[0].children[bottomRowIndex] = createElement('div', {
    attrs: {
      class: 'board-row',
      'data-row': String(bottomRowIndex)
    },
    children: populateRow(getRow(bottomRowIndex), answerList)
  });

  updateState({ board: newBoard, answerList });
};

const populateRow = (row, answerList = [], hide = true) => {
  row.forEach((group) => {
    if (hide) {
      group.children.push(
        createElement('div', { attrs: { class: 'blocker' } })
      );
      return;
    }

    // Each group becomes one multiplication prompt with one missing piece.
    const question = {
      left: Math.floor(Math.random() * 13),
      right: Math.floor(Math.random() * 13),
      blank: Math.floor(Math.random() * QUESTION_PARTS.length)
    };

    QUESTION_PARTS.forEach(({ blankValue, childIndex, getBlock }) => {
      const block = getBlock(question);

      // Store the missing block so the game can surface it elsewhere later.
      if (question.blank === blankValue) {
        answerList.push(block);
        return;
      }

      group.children[childIndex].children.push(block);
    });
  });

  if (!hide) shuffleList(answerList);

  return row;
};
