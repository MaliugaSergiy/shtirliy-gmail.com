import { ready, polyfils } from "./utils";
import Modals from './modals';
import SetInputState from './set-input-state';
import initPhoneMaskSetter from './phone-mask';

import ElementQueries from "css-element-queries/src/ElementQueries";

// import initSmoothScrollToAnchor from "./smooth-scroll-to-anchor";




ready(() => {
  polyfils();

  ElementQueries.init();

  new Modals({})

  new SetInputState({
    inputHolderSelector: '.js-input',
    filledClass: 'input--isFilled',
    focudedClass: 'input--isFocused'
  });

  initPhoneMaskSetter({
    inputSelector: '.js-phone-input'
  });


});
