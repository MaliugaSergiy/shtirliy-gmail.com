import { ready, polyfils } from "./utils";


import ElementQueries from "css-element-queries/src/ElementQueries";

// import initSmoothScrollToAnchor from "./smooth-scroll-to-anchor";




ready(() => {
  polyfils();

  ElementQueries.init();

  rulesAllower();
});
