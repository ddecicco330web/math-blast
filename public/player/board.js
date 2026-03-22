import createElement from './vDOM/createElement.js';

const BOARD_WIDTH = 9;
const BOARD_HEIGHT = 3;
const EQUATION_WIDTH = 3;
const OPERATORS = ['x', '='];

export const getBoard = () => {
  const rows = Array.from({ length: BOARD_HEIGHT }, (_, rowIndex) =>
    createElement('div', {
      attrs: {
        class: 'board-row',
        'data-row': String(rowIndex)
      },
      children: Array.from({ length: BOARD_WIDTH / EQUATION_WIDTH }, (_, groupIndex) =>
          createElement('div', {
            attrs: { class: 'equation-group' },
            children: Array.from({ length: EQUATION_WIDTH }, (_, slotIndex) => {
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
            }).flat()
          })
      )
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
