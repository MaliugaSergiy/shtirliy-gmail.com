const checkByDisplayStyle = element => {
  const style = window.getComputedStyle(element);

  return style.display === 'none';
};

const checkByVisibilityStyle = element => {
  const style = window.getComputedStyle(element);

  return style.visibility === 'hidden';
};

const checkByOffsetParent = element => {
  return element.offsetParent === null;
};

// const checkByVisibility = element => {
//   console.log('TCL: element', element);
//   return !(
//     elem.offsetWidth ||
//     elem.offsetHeight ||
//     elem.getClientRects().length
//   );
// };

export default function isNodeHidden(element) {
  let _element = {};
  _element =
    typeof element === 'string' ? document.querySelector(element) : element;

  return checkByOffsetParent(_element);
}
