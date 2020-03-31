export default function getIsMatchedMediaQuery(mediaQuery) {
  const matchedMedia = window.matchMedia(`(${mediaQuery})`);
  if (!mediaQuery) {
    return false;
  }

  if (typeof mediaQuery !== 'string') {
    return false;
  }

  if (matchedMedia.media === 'not all' || matchedMedia.media === 'invalid') {
    console.warn('do not correct mediaQuery');
    return false;
  }
  return matchedMedia.matches;
}
