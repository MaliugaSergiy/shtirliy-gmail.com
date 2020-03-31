export default function getIsTouchDevice() {
  return (
    'ontouchstart' in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch) ||
    navigator.MaxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
