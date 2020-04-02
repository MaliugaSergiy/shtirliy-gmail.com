import {
  scrollTo
} from "./utils";

const DEFAULT_PROPS = {
  selector: "a[href^='#']",
  hideNonActiveAnchors: true,
  duration: 300,
  offsetElementSelector: ".js-page-header",
  offset: 0,
  callback: null
};

// function isHidden(el) {
//   return (el.offsetParent === null)
// }

function getIsHiddenElement(el) {
  if (!el) {
    return false
  }
  var style = window.getComputedStyle(el);
  return style.display === "none";
}

function getAnchorsRelatedToExistingTargets(element) {
  const targetElement = document.getElementById(element.hash.substr(1));
  const isDisplayTarget = !getIsHiddenElement(targetElement);
  return isDisplayTarget;
}

function getIdFromHash(element) {
  return element.hash.substr(1);
}

export default function initSmoothScrollToAnchor(props) {
  const _props = {
    ...DEFAULT_PROPS,
    ...props
  };

  const {
    selector,
    hideNonActiveAnchors,
    ...rest
  } = _props;

  const anchorElement = document.querySelector(selector);

  if (!anchorElement) {
    return;
  }

  const anchorElements = Array.from(document.querySelectorAll(selector));
  const hashedAnchorElements = anchorElements.filter(getIdFromHash);
  const anchorsRelatedToExistingTargets = hashedAnchorElements.filter(
    getAnchorsRelatedToExistingTargets
  );

  anchorsRelatedToExistingTargets.forEach(element => {
    new SmoothScrollToAnchor({
      element,
      ...rest
    });
  });
}

export class SmoothScrollToAnchor {
  _props = null;
  _id = null;
  _target = null;
  _scrollOffset = 0;

  constructor(props) {
    this._props = props;
    const {
      element
    } = this._props;

    if (!element) {
      return
    }

    this._id = getIdFromHash(element);
    this._target = document.getElementById(this._id);
    if (!this._target) {
      return
    }

    this._scrollOffset = this.getDataScrollOffset(this._target);

    element.addEventListener("click", this.handleClick);
  }

  getDataScrollOffset = target => {
    const {
      offsetElementSelector,
      offset: _offset
    } = this._props;
    const offsetElement = document.querySelector(offsetElementSelector);
    let offset = target.dataset.scroll_offset;

    if (offsetElement) {
      const elementOffset = offsetElement.getBoundingClientRect().height;

      offset = offset - elementOffset + _offset;
    }

    return offset ? +offset : 0;
  };

  handleClick = e => {
    const {
      duration,
      callback
    } = this._props;
    e.preventDefault();

    const final = this._target.offsetTop + this._scrollOffset;

    scrollTo(final, duration, callback);
  };
}