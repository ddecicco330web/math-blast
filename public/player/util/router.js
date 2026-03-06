import mount from '../vDOM/mount.js';
import render from '../vDOM/render.js';
import { renderContent } from './state.js';
import createElement from '../vDOM/createElement.js';

// Listen for navigation events
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);

// Create routing table
export const routes = new Map();

// Handle URL changes
export function handleRoute() {
  const hash = window.location.hash || '#/';
  const root = document.getElementById('root');
  routes.get(hash)
    ? renderContent()
    : mount(render(createElement('h1', { children: 'Page Not Found' })), root);
  //document.getElementById('app').innerHTML = content;
}
