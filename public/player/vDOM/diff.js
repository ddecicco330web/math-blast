import render from './render.js';

const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];

  // set newAttrs
  if (newAttrs) {
    for (const [key, value] of Object.entries(newAttrs)) {
      patches.push(($node) => {
        //console.log('attr patch set', key, value);
        if (key === 'value' && 'value' in $node) {
          $node.value = value ?? '';
        } else {
          $node.setAttribute(key, value);
        }
        return $node;
      });
    }
  }

  // remove attrs
  if (oldAttrs) {
    for (const key in oldAttrs) {
      if (!newAttrs || !(key in newAttrs)) {
        patches.push(($node) => {
          //console.log('attr patch remove', key);
          if (key === 'value' && 'value' in $node) $node.value = '';
          $node.removeAttribute(key);
          return $node;
        });
      }
    }
  }

  return ($node) => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

const diffChildren = (oldVChildren, newVChildren) => {
  const childPatches = [];
  if (oldVChildren) {
    oldVChildren.forEach((oldVChild, i) => {
      //console.log('child patch push', newVChildren[i]);
      childPatches.push(diff(newVChildren[i], oldVChild));
    });
  }

  const additionalPatches = [];
  if (newVChildren) {
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
      additionalPatches.push(($node) => {
        //console.log('child patch append', additionalVChild);
        $node.appendChild(render(additionalVChild));
      });
    }
  }

  return ($parent) => {
    const childNodes = Array.from($parent.childNodes);
    childPatches.forEach((patch, i) => {
      const $child = childNodes[i];
      if ($child) patch($child);
    });

    // $parent.childNodes.forEach(($child, i) => {
    //   childPatches[i]($child);
    // });

    for (const patch of additionalPatches) {
      patch($parent);
    }
    return $parent;
  };
};

const diff = (newVTree, oldVTree) => {
  //console.log('oldV', oldVTree);
  //console.log('newV', newVTree);
  if (newVTree === undefined || newVTree === null) {
    return ($node) => {
      $node.remove();

      return undefined;
    };
  }

  if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
    if (oldVTree !== newVTree) {
      return ($node) => {
        const $newNode = render(newVTree);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return ($node) => $node;
    }
  }

  if (oldVTree.tagName !== newVTree.tagName) {
    return ($node) => {
      const $newNode = render(newVTree);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
  const patchChildren = diffChildren(oldVTree.children, newVTree.children);

  return ($node) => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};

export default diff;
