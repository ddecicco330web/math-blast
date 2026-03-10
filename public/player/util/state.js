import diff from '../vDOM/diff.js';
import mount from '../vDOM/mount.js';
import render from '../vDOM/render.js';
import { routes } from './router.js';

// Define state object
export const state = {};
const initState = {};

let rootNode = null;
let oldTree = null;

export const initializeState = (init) => {
  Object.assign(initState, init);
  Object.assign(state, initState);
};

export const resetState = () => {
  Object.assign(state, initState);
};

// Update state and refresh view
export const updateState = (changes) => {
  Object.assign(state, changes);
  renderContent();
};

// Render content based on state
export const renderContent = () => {
  const view = routes.get(window.location.hash || '#/')();
  const root = document.getElementById('root');
  console.log(`view for ${window.location.hash}`, view);
  console.log('rootNode', rootNode);
  if (!rootNode) {
    rootNode = render(view);
    rootNode = mount(rootNode, root);
    console.log('Root node after mount', rootNode);
  } else {
    console.log('view', view);
    console.log('old', oldTree);
    const patch = diff(view, oldTree);
    rootNode = patch(rootNode);
  }
  // if (state.isLoading) {
  //   appDiv.innerHTML = '<div>Loading...</div>';
  //   return;
  // }
  // appDiv.innerHTML = routes.get(window.location.hash || '#/')();
  oldTree = view;
  console.log(view);
};
