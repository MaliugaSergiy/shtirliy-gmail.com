import { ready, polyfils } from "./utils";
import Modals from './modals';
import SetInputState from './set-input-state';
import initPhoneMaskSetter from './phone-mask';
import initSmoothScrollToAnchor from "./smooth-scroll-to-anchor";
import SertificatPreview from "./sertificatPreviev";
import indicateTouchDevices from './indicate-touch-devices';
import indicateMobileDevices from './indicate-mobile-devices';
import indicateMobileOrTabletDevices from './indicate-mobile-and-tablet-devices';
import KeyboardUsingState from './keyboard-using-state';

import ElementQueries from "css-element-queries/src/ElementQueries";

// import initSmoothScrollToAnchor from "./smooth-scroll-to-anchor";

const KEY_CODE_TAB = 9;
const KEY_CODE_ARROW_LEFT = 37;
const KEY_CODE_ARROW_RIGHT = 39;
const KEY_CODE_ARROW_UP = 38;
const KEY_CODE_ARROW_DOWN = 40;

const KEY_CODE_LIST = [
  KEY_CODE_TAB,
  KEY_CODE_ARROW_LEFT,
  KEY_CODE_ARROW_RIGHT,
  KEY_CODE_ARROW_UP,
  KEY_CODE_ARROW_DOWN
];
const ARROWS_KEY_CODE_LIST = [
  KEY_CODE_ARROW_LEFT,
  KEY_CODE_ARROW_RIGHT,
  KEY_CODE_ARROW_UP,
  KEY_CODE_ARROW_DOWN
];


ready(() => {
  polyfils();
  initSmoothScrollToAnchor();
  indicateTouchDevices('body');
  indicateMobileDevices('body');
  indicateMobileOrTabletDevices('body');

  ElementQueries.init();

  new Modals({})

  new SetInputState({
    inputHolderSelector: '.js-input',
    filledClass: 'input--isFilled',
    focudedClass: 'input--isFocused'
  });

  new SertificatPreview({
    holderSelector:".js-sertificatToogler",
    previewSelector:".js-sertificatPreview"
  })

  initPhoneMaskSetter({
    inputSelector: '.js-phone-input'
  });

  new KeyboardUsingState({
    listenerSelector: null,
    targetSelector: 'body',
    keyCodes: KEY_CODE_LIST,
    keyUsingClass: 'isKeyboardUsing'
  });

  new KeyboardUsingState({
    listenerSelector: null,
    targetSelector: 'body',
    keyCodes: ARROWS_KEY_CODE_LIST,
    keyUsingClass: 'isArrowsUsing'
  });

  new KeyboardUsingState({
    listenerSelector: null,
    targetSelector: 'body',
    keyCodes: KEY_CODE_TAB,
    keyUsingClass: 'isTabUsing'
  });


});
