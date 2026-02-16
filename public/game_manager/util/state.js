import { routes } from './router.js';

// Define state object
export const state = {};

// Update state and refresh view
export const updateState = (changes) => {
  console.log(state);
  Object.assign(state, changes);
  console.log(state);
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
