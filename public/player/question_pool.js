const available = [];
const used = [];

for (let left = 0; left <= 12; left++) {
  for (let right = 0; right <= 12; right++) {
    available.push([left, right]);
  }
}

console.log(available);

export const drawQuestion = () => {
  const index = Math.floor(Math.random() * (available.length - 1));
  console.log('Index', index);
  const numberPair = available.splice(index, 1)[0];

  if (available.length === 0) {
    available = [...used];
    used = [];
    return;
  }

  console.log(numberPair);
  used.push(numberPair);
  return numberPair;
};
