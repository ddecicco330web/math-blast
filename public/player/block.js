import createElement from './vDOM/createElement.js';

export const getFactorBlock = (number) => {
  return createElement('div', {
    attrs: { class: 'factor-block' },
    children: [`${number}`]
  });
};

export const getSolutionBlock = (left, right) => {
  return createElement('div', {
    attrs: { class: 'solution-block' },
    children: [`${left * right}`]
  });
};
