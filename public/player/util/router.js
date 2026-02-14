// Listen for navigation events
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);

// Create routing table
export const routes = new Map();

// Handle URL changes
export function handleRoute() {
  const hash = window.location.hash || '#/';
  console.log(hash);
  const content = routes.get(hash)
    ? routes.get(hash)()
    : `<h1>Page Not Found</h1>`;
  document.getElementById('app').innerHTML = content;
}
