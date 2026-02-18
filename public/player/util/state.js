import { routes } from './router.js';

// Define state object
export const state = {};
const initState = {};

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
  const appDiv = document.getElementById('app');

  if (state.isLoading) {
    appDiv.innerHTML = '<div>Loading...</div>';
    return;
  }

  appDiv.innerHTML = routes.get(window.location.hash || '#/')();
};
