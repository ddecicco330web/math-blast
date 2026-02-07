import { getGamePage, getHostPage, getLobbyPage } from '../pages.js';

// Set routing table
export const routes = {
  '#/host': getHostPage,
  '#/lobby': getLobbyPage,
  '#/game': getGamePage
};

// Handle URL changes
export function handleRoute() {
  const hash = window.location.hash || '#/host';
  console.log(hash);
  const content = routes[hash] ? routes[hash]() : `<h1>Page Not Found</h1>`;
  document.getElementById('app').innerHTML = content;
}
