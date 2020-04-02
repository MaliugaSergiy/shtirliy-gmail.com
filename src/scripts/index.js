import { ready, polyfils } from "./utils";
import Modals from './modals';
import SetInputState from './set-input-state';
import initPhoneMaskSetter from './phone-mask';
import initSmoothScrollToAnchor from "./smooth-scroll-to-anchor";
import SertificatPreview from "./sertificatPreviev";


import ElementQueries from "css-element-queries/src/ElementQueries";

// import initSmoothScrollToAnchor from "./smooth-scroll-to-anchor";




ready(() => {
  polyfils();
  initSmoothScrollToAnchor();

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


});
