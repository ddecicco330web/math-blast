import { adjectives } from './adjectives.js';
import { animals } from './animals.js';

export const generateName = () => {
  const adjective =
    adjectives[Math.floor(Math.random() * (adjectives.length - 1))];
  const animal = animals[Math.floor(Math.random() * (animals.length - 1))];

  return adjective + animal;
};
