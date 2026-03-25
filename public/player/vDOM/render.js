const renderElem = (vNode) => {
  //console.log(vNode);
  const $el = document.createElement(vNode.tagName);

  // Set attributes to element
  if (vNode.attrs) {
    for (const [key, value] of Object.entries(vNode.attrs)) {
      $el.setAttribute(key, value);
    }
  }

  // Append children to element
  if (vNode.children) {
    for (const child of vNode.children) {
      $el.appendChild(render(child));
    }
  }

  return $el;
};

const render = (vNode) => {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }

  return renderElem(vNode);
};

export default render;
