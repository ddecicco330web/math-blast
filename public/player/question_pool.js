import { updateState, state } from './util/state.js';
import { QUESTION_TIME } from './app.js';

let available = [];
let used = [];
let timer;

for (let left = 0; left <= 12; left++) {
  for (let right = 0; right <= 12; right++) {
    available.push([left, right]);
  }
}

console.log(available);

export const drawQuestion = () => {
  if (timer) clearInterval(timer);

  const index = Math.floor(Math.random() * (available.length - 1));

  const numberPair = available.splice(index, 1)[0];

  if (available.length === 0) {
    available = [...used];
    used = [];
    return;
  }

  console.log(numberPair);
  used.push(numberPair);

  timer = setInterval(() => {
    updateState({ questionTime: state.questionTime - 1000 });
  }, 1000);
  updateState({ currentPair: numberPair, questionTime: QUESTION_TIME });
};
