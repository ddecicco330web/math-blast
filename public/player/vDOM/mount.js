export default ($node, $target) => {
  //console.log($target);
  $target.replaceWith($node);
  return $node;
};
