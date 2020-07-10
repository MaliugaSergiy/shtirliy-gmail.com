// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../scripts/utils/scroll-to.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollTo;

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

function scrollTo(final, duration, callback) {
  var start = window.scrollY || document.documentElement.scrollTop,
      currentTime = null;

  var animateScroll = function animateScroll(timestamp) {
    if (!currentTime) currentTime = timestamp;
    var progress = timestamp - currentTime;
    if (progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final - start, duration);
    window.scrollTo(0, val);

    if (progress < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      callback && callback();
    }
  };

  window.requestAnimationFrame(animateScroll);
}

;
},{}],"../scripts/utils/move-focus.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = moveFocus;

function moveFocus(element) {
  if (!element) element = document.getElementsByTagName('body')[0];
  element.focus();

  if (document.activeElement !== element) {
    element.setAttribute('tabindex', '-1');
    element.focus();
  }
}
},{}],"../scripts/utils/find-focusable-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findFocusableElement;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function findFocusableElement(containerElement) {
  var additionalSelectors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var additionalContainer = arguments.length > 2 ? arguments[2] : undefined;
  var selector = ["button", "[href]", "input", "select", "textarea", "[tabindex]:not([tabindex='-1'])"].concat(_toConsumableArray(additionalSelectors)).join(", ");
  var all = Array.from(containerElement.querySelectorAll(selector));

  if (additionalContainer) {
    var additionalContainerNode = document.querySelector(additionalContainer);
    var additionalNodes = Array.from(additionalContainerNode.querySelectorAll(selector));
    all = [].concat(_toConsumableArray(all), _toConsumableArray(additionalNodes));
  }

  var allNotDisabled = all.filter(function (node) {
    return !node.disabled;
  });
  var allDisabled = all.filter(function (node) {
    return node.disabled;
  });
  return {
    all: {
      first: all[0],
      last: all[all.length - 1],
      all: all
    },
    notDisabled: {
      first: allNotDisabled[0],
      last: allNotDisabled[allNotDisabled.length - 1],
      all: allNotDisabled
    },
    disabled: {
      first: allDisabled[0],
      last: allDisabled[allDisabled.length - 1],
      all: allDisabled
    }
  };
}
},{}],"../scripts/utils/set-height.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setHeight;

function setHeight(start, to, element, duration, cb) {
  var change = to - start,
      currentTime = null;

  var animateHeight = function animateHeight(timestamp) {
    if (!currentTime) currentTime = timestamp;
    var progress = timestamp - currentTime;
    var val = parseInt(progress / duration * change + start);
    element.setAttribute("style", "height:" + val + "px;");

    if (progress < duration) {
      window.requestAnimationFrame(animateHeight);
    } else {
      cb();
    }
  }; //set the height of the element before starting animation -> fix bug on Safari


  element.setAttribute("style", "height:" + start + "px;");
  window.requestAnimationFrame(animateHeight);
}
},{}],"../scripts/utils/is-node-hidden.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNodeHidden;

var checkByDisplayStyle = function checkByDisplayStyle(element) {
  var style = window.getComputedStyle(element);
  return style.display === 'none';
};

var checkByVisibilityStyle = function checkByVisibilityStyle(element) {
  var style = window.getComputedStyle(element);
  return style.visibility === 'hidden';
};

var checkByOffsetParent = function checkByOffsetParent(element) {
  return element.offsetParent === null;
}; // const checkByVisibility = element => {
//   console.log('TCL: element', element);
//   return !(
//     elem.offsetWidth ||
//     elem.offsetHeight ||
//     elem.getClientRects().length
//   );
// };


function isNodeHidden(element) {
  var _element = {};
  _element = typeof element === 'string' ? document.querySelector(element) : element;
  return checkByOffsetParent(_element);
}
},{}],"../scripts/utils/add-listeners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addListener;

function addListener(elements, event, callback) {
  Array.from(elements).forEach(function (element, index, array) {
    return element.addEventListener(event, callback({
      element: element,
      index: index,
      array: array
    }));
  });
}
},{}],"../scripts/utils/throttle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;

function throttle(fn) {
  var threshhold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var scope = arguments.length > 2 ? arguments[2] : undefined;
  var last;
  var deferTimer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = scope || this;
    var now = +new Date();

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
},{}],"../scripts/utils/throttle-lead.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttleLead;

function throttleLead(fn) {
  var threshhold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var scope = arguments.length > 2 ? arguments[2] : undefined;
  var last;
  return function () {
    var context = scope || this;
    var now = +new Date();

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (last && now > last + threshhold) {
      last = now;
      fn.apply(context, args);
    } else if (!last) {
      last = now;
      fn.apply(context, args);
    }
  };
}
},{}],"../scripts/utils/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
},{}],"../scripts/utils/fade-in.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var fadeIn = function fadeIn(element) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
  element.style.opacity = 0;
  var last = +new Date();

  var tick = function tick() {
    element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
    last = +new Date();

    if (+element.style.opacity < 1) {
      window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
    }
  };

  tick();
};

var _default = fadeIn;
exports.default = _default;
},{}],"../scripts/utils/highlight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = require("./");

var highlight = function highlight(element, highlightedClass) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
  (0, _.addClass)(element, highlightedClass);
  setTimeout(function () {
    return (0, _.removeClass)(element, highlightedClass);
  }, duration);
};

var _default = highlight;
exports.default = _default;
},{"./":"../scripts/utils/index.js"}],"../scripts/utils/wrap-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapElement;

function wrapElement(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}
},{}],"../scripts/utils/text-slicer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function indexOf(str, exp) {
  var match = str.match(exp);
  return str.indexOf(match[0]);
}

function textSlicer(text, amount) {
  var endSymbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';

  if (typeof text !== 'string') {
    return text;
  }

  var trimmedText = text.trim();

  if (amount >= trimmedText.length) {
    return text;
  }

  var minPosition = Math.max(indexOf(trimmedText, /[^а-яёa-z]/i) - 1, 3);
  var slicePosition = Math.max(minPosition, amount - 1);

  for (slicePosition; slicePosition > minPosition; slicePosition--) {
    var prevWord = trimmedText.substring(slicePosition - 3, slicePosition + 1);

    if (!/^[а-яёa-z]+$/i.test(prevWord) || /^[а-яёa-z]+$/i.test(trimmedText[slicePosition + 1])) {
      continue;
    }

    break;
  }

  var rest = text.slice(slicePosition + 1);
  var isTextEnd = false;

  if (!/[а-яёa-z0-9]/i.test(rest)) {
    isTextEnd = true;

    for (var i = 0; i < rest.length; i++) {
      if (/[?!.]/.test(rest[i])) {
        slicePosition++;
        continue;
      }

      break;
    }
  }

  return text.slice(0, slicePosition + 1) + (!isTextEnd ? endSymbol : '');
}

var _default = textSlicer;
exports.default = _default;
},{}],"../scripts/utils/chunk-substr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chunkSubstr;

function chunkSubstr(str, size) {
  var numChunks = Math.ceil(str.length / size);
  var chunks = new Array(numChunks);

  for (var i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}
},{}],"../scripts/utils/smart-chunk-substring.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = smartChunkSubstring;

function smartChunkSubstring(str, maxLength) {
  // initialize array (not required but verbose)
  var slices = []; // while string is not empty
  // take {maxLength} characters
  // check witch one was the last space or if the end of the line is reached
  // then => push them in slices
  // then => remove them from the string

  while (str != '') {
    var lastSpace = 0;

    for (var i = 0; i < str.length && i < maxLength; i++) {
      if (str[i] == ' ') {
        lastSpace = i;
      }

      if (i == str.length - 1) {
        lastSpace = str.length;
      }
    } // insert into array (including trailing space, see below the codeblock)


    slices.push(str.slice(0, lastSpace));
    str = str.slice(lastSpace);
  }

  return slices;
}
},{}],"../scripts/utils/get-is-touch-device.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIsTouchDevice;

function getIsTouchDevice() {
  return 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}
},{}],"../scripts/utils/get-is-mobile-device.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIsMobileDevice;

function getIsMobileDevice() {
  var check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
}
},{}],"../scripts/utils/transliterate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transliterate;

function transliterate(word) {
  var answer = '',
      a = {};
  a['Ё'] = 'YO';
  a['Й'] = 'I';
  a['Ц'] = 'TS';
  a['У'] = 'U';
  a['К'] = 'K';
  a['Е'] = 'E';
  a['Н'] = 'N';
  a['Г'] = 'G';
  a['Ш'] = 'SH';
  a['Щ'] = 'SCH';
  a['З'] = 'Z';
  a['Х'] = 'H';
  a['Ъ'] = "'";
  a['ё'] = 'yo';
  a['й'] = 'i';
  a['ц'] = 'ts';
  a['у'] = 'u';
  a['к'] = 'k';
  a['е'] = 'e';
  a['н'] = 'n';
  a['г'] = 'g';
  a['ш'] = 'sh';
  a['щ'] = 'sch';
  a['з'] = 'z';
  a['х'] = 'h';
  a['ъ'] = "'";
  a['Ф'] = 'F';
  a['Ы'] = 'I';
  a['В'] = 'V';
  a['А'] = 'a';
  a['П'] = 'P';
  a['Р'] = 'R';
  a['О'] = 'O';
  a['Л'] = 'L';
  a['Д'] = 'D';
  a['Ж'] = 'ZH';
  a['Э'] = 'E';
  a['ф'] = 'f';
  a['ы'] = 'i';
  a['в'] = 'v';
  a['а'] = 'a';
  a['п'] = 'p';
  a['р'] = 'r';
  a['о'] = 'o';
  a['л'] = 'l';
  a['д'] = 'd';
  a['ж'] = 'zh';
  a['э'] = 'e';
  a['Я'] = 'Ya';
  a['Ч'] = 'CH';
  a['С'] = 'S';
  a['М'] = 'M';
  a['И'] = 'I';
  a['Т'] = 'T';
  a['Ь'] = "'";
  a['Б'] = 'B';
  a['Ю'] = 'YU';
  a['я'] = 'ya';
  a['ч'] = 'ch';
  a['с'] = 's';
  a['м'] = 'm';
  a['и'] = 'i';
  a['т'] = 't';
  a['ь'] = "'";
  a['б'] = 'b';
  a['ю'] = 'yu';
  a['і'] = 'i';
  a['ї'] = 'i';
  a['є'] = 'e';

  for (var i in word) {
    if (word.hasOwnProperty(i)) {
      if (a[word[i]] === undefined) {
        answer += word[i];
      } else {
        answer += a[word[i]];
      }
    }
  }

  return answer;
}
},{}],"../scripts/utils/shuffle-array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shuffle;

function shuffle(array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex; // While there remain elements to shuffle...

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1; // And swap it with the current element.

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
},{}],"../scripts/utils/ready.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ready;

function ready(callback) {
  if (document.readyState != 'loading') callback();else document.addEventListener('DOMContentLoaded', callback);
}
},{}],"../../node_modules/smoothscroll-polyfill/dist/smoothscroll.js":[function(require,module,exports) {
/* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  // polyfill
  function polyfill() {
    // aliases
    var w = window;
    var d = document;

    // return if scroll behavior is supported and polyfill is not forced
    if (
      'scrollBehavior' in d.documentElement.style &&
      w.__forceSmoothScrollPolyfill__ !== true
    ) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now =
      w.performance && w.performance.now
        ? w.performance.now.bind(w.performance)
        : Date.now;

    /**
     * indicates if a the current browser is made by Microsoft
     * @method isMicrosoftBrowser
     * @param {String} userAgent
     * @returns {Boolean}
     */
    function isMicrosoftBrowser(userAgent) {
      var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

      return new RegExp(userAgentPatterns.join('|')).test(userAgent);
    }

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (
        firstArg === null ||
        typeof firstArg !== 'object' ||
        firstArg.behavior === undefined ||
        firstArg.behavior === 'auto' ||
        firstArg.behavior === 'instant'
      ) {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError(
        'behavior member of ScrollOptions ' +
          firstArg.behavior +
          ' is not a valid value for enumeration ScrollBehavior.'
      );
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
      }

      if (axis === 'X') {
        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      while (el !== d.body && isScrollable(el) === false) {
        el = el.parentNode || el.host;
      }

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : w.scrollX || w.pageXOffset,
          // use top prop, second argument if present or fallback to scrollY
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
              ? arguments[1]
              : w.scrollY || w.pageYOffset
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : w.scrollX || w.pageXOffset,
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : w.scrollY || w.pageYOffset
      );
    };

    // w.scrollBy
    w.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object' ? arguments[0] : 0,
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined ? arguments[1] : 0
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value could not be converted');
        }

        original.elementScroll.call(
          this,
          // use left prop, first number argument or fallback to scrollLeft
          arguments[0].left !== undefined
            ? ~~arguments[0].left
            : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
          // use top prop, second argument or fallback to scrollTop
          arguments[0].top !== undefined
            ? ~~arguments[0].top
            : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
        );

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        this,
        this,
        typeof left === 'undefined' ? this.scrollLeft : ~~left,
        typeof top === 'undefined' ? this.scrollTop : ~~top
      );
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(
          this,
          arguments[0].left !== undefined
            ? ~~arguments[0].left + this.scrollLeft
            : ~~arguments[0] + this.scrollLeft,
          arguments[0].top !== undefined
            ? ~~arguments[0].top + this.scrollTop
            : ~~arguments[1] + this.scrollTop
        );

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(
          this,
          arguments[0] === undefined ? true : arguments[0]
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(
          this,
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (typeof exports === 'object' && typeof module !== 'undefined') {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }

}());

},{}],"../scripts/utils/polyfils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initPolyfils;

var _smoothscrollPolyfill = _interopRequireDefault(require("smoothscroll-polyfill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// kick off the polyfill!
_smoothscrollPolyfill.default.polyfill();
/* 
	Polyfills
*/
//Closest() method


function initPolyfils() {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this;
      if (!document.documentElement.contains(el)) return null;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);

      return null;
    };
  } //Custom Event() constructor


  if (typeof window.CustomEvent !== 'function') {
    var CustomEvent = function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }
}
},{"smoothscroll-polyfill":"../../node_modules/smoothscroll-polyfill/dist/smoothscroll.js"}],"../scripts/utils/array-to-object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arrayToObject;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function arrayToObject(arr, keyField, dataAttr) {
  if (dataAttr) {
    return Object.assign.apply(Object, [{}].concat(_toConsumableArray(arr.map(function (item) {
      return _defineProperty({}, item[keyField][dataAttr], item);
    }))));
  }

  return Object.assign.apply(Object, [{}].concat(_toConsumableArray(arr.map(function (item) {
    return _defineProperty({}, item[keyField], item);
  }))));
}
},{}],"../scripts/utils/get-is-mobile-or-tablet-device.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIsMobileOrTabletDevice;

function getIsMobileOrTabletDevice() {
  var check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
}
},{}],"../scripts/utils/get-is-matched-media-query.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIsMatchedMediaQuery;

function getIsMatchedMediaQuery(mediaQuery) {
  var matchedMedia = window.matchMedia("(".concat(mediaQuery, ")"));

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
},{}],"../scripts/utils/class-name.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.setAttributes = setAttributes;
exports.getChildrenByClassName = getChildrenByClassName;

function hasClass(element, className) {
  if (element.classList) return element.classList.contains(className);else return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

;

function addClass(element, className) {
  var classList = className.split(' ');
  if (element.classList) element.classList.add(classList[0]);else if (!hasClass(element, classList[0])) element.className += " " + classList[0];
  if (classList.length > 1) addClass(element, classList.slice(1).join(' '));
}

;

function removeClass(element, className) {
  var classList = className.split(' ');
  if (element.classList) element.classList.remove(classList[0]);else if (hasClass(element, classList[0])) {
    var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
    element.className = element.className.replace(reg, ' ');
  }
  if (classList.length > 1) removeClass(element, classList.slice(1).join(' '));
}

;

function toggleClass(element, className, bool) {
  if (bool) addClass(element, className);else removeClass(element, className);
}

;

function setAttributes(element, attrs) {
  for (var key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
}

;
/* 
  DOM manipulation
*/

function getChildrenByClassName(element, className) {
  var children = element.children,
      childrenByClass = [];

  for (var i = 0; i < children.length; i++) {
    if (hasClass(element.children[i], className)) childrenByClass.push(element.children[i]);
  }

  return childrenByClass;
}

;
},{}],"../scripts/utils/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "scrollTo", {
  enumerable: true,
  get: function () {
    return _scrollTo.default;
  }
});
Object.defineProperty(exports, "moveFocus", {
  enumerable: true,
  get: function () {
    return _moveFocus.default;
  }
});
Object.defineProperty(exports, "findFocusableElement", {
  enumerable: true,
  get: function () {
    return _findFocusableElement.default;
  }
});
Object.defineProperty(exports, "setHeight", {
  enumerable: true,
  get: function () {
    return _setHeight.default;
  }
});
Object.defineProperty(exports, "isNodeHidden", {
  enumerable: true,
  get: function () {
    return _isNodeHidden.default;
  }
});
Object.defineProperty(exports, "addListener", {
  enumerable: true,
  get: function () {
    return _addListeners.default;
  }
});
Object.defineProperty(exports, "throttle", {
  enumerable: true,
  get: function () {
    return _throttle.default;
  }
});
Object.defineProperty(exports, "throttleLead", {
  enumerable: true,
  get: function () {
    return _throttleLead.default;
  }
});
Object.defineProperty(exports, "debounce", {
  enumerable: true,
  get: function () {
    return _debounce.default;
  }
});
Object.defineProperty(exports, "fadeIn", {
  enumerable: true,
  get: function () {
    return _fadeIn.default;
  }
});
Object.defineProperty(exports, "highlight", {
  enumerable: true,
  get: function () {
    return _highlight.default;
  }
});
Object.defineProperty(exports, "wrapElement", {
  enumerable: true,
  get: function () {
    return _wrapElement.default;
  }
});
Object.defineProperty(exports, "textSlicer", {
  enumerable: true,
  get: function () {
    return _textSlicer.default;
  }
});
Object.defineProperty(exports, "chunkSubstr", {
  enumerable: true,
  get: function () {
    return _chunkSubstr.default;
  }
});
Object.defineProperty(exports, "smartChunkSubstring", {
  enumerable: true,
  get: function () {
    return _smartChunkSubstring.default;
  }
});
Object.defineProperty(exports, "getIsTouchDevice", {
  enumerable: true,
  get: function () {
    return _getIsTouchDevice.default;
  }
});
Object.defineProperty(exports, "getIsMobileDevice", {
  enumerable: true,
  get: function () {
    return _getIsMobileDevice.default;
  }
});
Object.defineProperty(exports, "transliterate", {
  enumerable: true,
  get: function () {
    return _transliterate.default;
  }
});
Object.defineProperty(exports, "shuffle", {
  enumerable: true,
  get: function () {
    return _shuffleArray.default;
  }
});
Object.defineProperty(exports, "ready", {
  enumerable: true,
  get: function () {
    return _ready.default;
  }
});
Object.defineProperty(exports, "polyfils", {
  enumerable: true,
  get: function () {
    return _polyfils.default;
  }
});
Object.defineProperty(exports, "arrayToObject", {
  enumerable: true,
  get: function () {
    return _arrayToObject.default;
  }
});
Object.defineProperty(exports, "getIsMobileOrTabletDevice", {
  enumerable: true,
  get: function () {
    return _getIsMobileOrTabletDevice.default;
  }
});
Object.defineProperty(exports, "getIsMatchedMediaQuery", {
  enumerable: true,
  get: function () {
    return _getIsMatchedMediaQuery.default;
  }
});
Object.defineProperty(exports, "hasClass", {
  enumerable: true,
  get: function () {
    return _className.hasClass;
  }
});
Object.defineProperty(exports, "addClass", {
  enumerable: true,
  get: function () {
    return _className.addClass;
  }
});
Object.defineProperty(exports, "removeClass", {
  enumerable: true,
  get: function () {
    return _className.removeClass;
  }
});
Object.defineProperty(exports, "toggleClass", {
  enumerable: true,
  get: function () {
    return _className.toggleClass;
  }
});
Object.defineProperty(exports, "setAttributes", {
  enumerable: true,
  get: function () {
    return _className.setAttributes;
  }
});
Object.defineProperty(exports, "getChildrenByClassName", {
  enumerable: true,
  get: function () {
    return _className.getChildrenByClassName;
  }
});

var _scrollTo = _interopRequireDefault(require("./scroll-to"));

var _moveFocus = _interopRequireDefault(require("./move-focus"));

var _findFocusableElement = _interopRequireDefault(require("./find-focusable-element"));

var _setHeight = _interopRequireDefault(require("./set-height"));

var _isNodeHidden = _interopRequireDefault(require("./is-node-hidden.js"));

var _addListeners = _interopRequireDefault(require("./add-listeners"));

var _throttle = _interopRequireDefault(require("./throttle"));

var _throttleLead = _interopRequireDefault(require("./throttle-lead"));

var _debounce = _interopRequireDefault(require("./debounce"));

var _fadeIn = _interopRequireDefault(require("./fade-in"));

var _highlight = _interopRequireDefault(require("./highlight"));

var _wrapElement = _interopRequireDefault(require("./wrap-element"));

var _textSlicer = _interopRequireDefault(require("./text-slicer"));

var _chunkSubstr = _interopRequireDefault(require("./chunk-substr"));

var _smartChunkSubstring = _interopRequireDefault(require("./smart-chunk-substring"));

var _getIsTouchDevice = _interopRequireDefault(require("./get-is-touch-device"));

var _getIsMobileDevice = _interopRequireDefault(require("./get-is-mobile-device"));

var _transliterate = _interopRequireDefault(require("./transliterate"));

var _shuffleArray = _interopRequireDefault(require("./shuffle-array"));

var _ready = _interopRequireDefault(require("./ready"));

var _polyfils = _interopRequireDefault(require("./polyfils"));

var _arrayToObject = _interopRequireDefault(require("./array-to-object"));

var _getIsMobileOrTabletDevice = _interopRequireDefault(require("./get-is-mobile-or-tablet-device"));

var _getIsMatchedMediaQuery = _interopRequireDefault(require("./get-is-matched-media-query"));

var _className = require("./class-name");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./scroll-to":"../scripts/utils/scroll-to.js","./move-focus":"../scripts/utils/move-focus.js","./find-focusable-element":"../scripts/utils/find-focusable-element.js","./set-height":"../scripts/utils/set-height.js","./is-node-hidden.js":"../scripts/utils/is-node-hidden.js","./add-listeners":"../scripts/utils/add-listeners.js","./throttle":"../scripts/utils/throttle.js","./throttle-lead":"../scripts/utils/throttle-lead.js","./debounce":"../scripts/utils/debounce.js","./fade-in":"../scripts/utils/fade-in.js","./highlight":"../scripts/utils/highlight.js","./wrap-element":"../scripts/utils/wrap-element.js","./text-slicer":"../scripts/utils/text-slicer.js","./chunk-substr":"../scripts/utils/chunk-substr.js","./smart-chunk-substring":"../scripts/utils/smart-chunk-substring.js","./get-is-touch-device":"../scripts/utils/get-is-touch-device.js","./get-is-mobile-device":"../scripts/utils/get-is-mobile-device.js","./transliterate":"../scripts/utils/transliterate.js","./shuffle-array":"../scripts/utils/shuffle-array.js","./ready":"../scripts/utils/ready.js","./polyfils":"../scripts/utils/polyfils.js","./array-to-object":"../scripts/utils/array-to-object.js","./get-is-mobile-or-tablet-device":"../scripts/utils/get-is-mobile-or-tablet-device.js","./get-is-matched-media-query":"../scripts/utils/get-is-matched-media-query.js","./class-name":"../scripts/utils/class-name.js"}],"../../node_modules/@babel/runtime/helpers/interopRequireDefault.js":[function(require,module,exports) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],"../../node_modules/dom-helpers/util/inDOM.js":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.default = void 0;

var _default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports.default = _default;
module.exports = exports["default"];
},{}],"../../node_modules/dom-helpers/util/scrollbarSize.js":[function(require,module,exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = scrollbarSize;

var _inDOM = _interopRequireDefault(require("./inDOM"));

var size;

function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (_inDOM.default) {
      var scrollDiv = document.createElement('div');
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
}

module.exports = exports["default"];
},{"@babel/runtime/helpers/interopRequireDefault":"../../node_modules/@babel/runtime/helpers/interopRequireDefault.js","./inDOM":"../../node_modules/dom-helpers/util/inDOM.js"}],"../../node_modules/resize-detector/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListener = addListener;
exports.removeListener = removeListener;
let raf = null;

function requestAnimationFrame(callback) {
  if (!raf) {
    raf = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      return setTimeout(callback, 16);
    }).bind(window);
  }

  return raf(callback);
}

let caf = null;

function cancelAnimationFrame(id) {
  if (!caf) {
    caf = (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (id) {
      clearTimeout(id);
    }).bind(window);
  }

  caf(id);
}

function createStyles(styleText) {
  var style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = styleText;
  } else {
    style.appendChild(document.createTextNode(styleText));
  }

  (document.querySelector('head') || document.body).appendChild(style);
  return style;
}

function createElement(tagName, props = {}) {
  let elem = document.createElement(tagName);
  Object.keys(props).forEach(key => {
    elem[key] = props[key];
  });
  return elem;
}

function getComputedStyle(elem, prop, pseudo) {
  // for older versions of Firefox, `getComputedStyle` required
  // the second argument and may return `null` for some elements
  // when `display: none`
  let computedStyle = window.getComputedStyle(elem, pseudo || null) || {
    display: 'none'
  };
  return computedStyle[prop];
}

function getRenderInfo(elem) {
  if (!document.documentElement.contains(elem)) {
    return {
      detached: true,
      rendered: false
    };
  }

  let current = elem;

  while (current !== document) {
    if (getComputedStyle(current, 'display') === 'none') {
      return {
        detached: false,
        rendered: false
      };
    }

    current = current.parentNode;
  }

  return {
    detached: false,
    rendered: true
  };
}

var css = ".resize-triggers{visibility:hidden;opacity:0}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:\"\";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}";
let total = 0;
let style = null;

function addListener(elem, callback) {
  if (!elem.__resize_mutation_handler__) {
    elem.__resize_mutation_handler__ = handleMutation.bind(elem);
  }

  let listeners = elem.__resize_listeners__;

  if (!listeners) {
    elem.__resize_listeners__ = [];

    if (window.ResizeObserver) {
      let {
        offsetWidth,
        offsetHeight
      } = elem;
      let ro = new ResizeObserver(() => {
        if (!elem.__resize_observer_triggered__) {
          elem.__resize_observer_triggered__ = true;

          if (elem.offsetWidth === offsetWidth && elem.offsetHeight === offsetHeight) {
            return;
          }
        }

        runCallbacks(elem);
      }); // initially display none won't trigger ResizeObserver callback

      let {
        detached,
        rendered
      } = getRenderInfo(elem);
      elem.__resize_observer_triggered__ = detached === false && rendered === false;
      elem.__resize_observer__ = ro;
      ro.observe(elem);
    } else if (elem.attachEvent && elem.addEventListener) {
      // targeting IE9/10
      elem.__resize_legacy_resize_handler__ = function handleLegacyResize() {
        runCallbacks(elem);
      };

      elem.attachEvent('onresize', elem.__resize_legacy_resize_handler__);
      document.addEventListener('DOMSubtreeModified', elem.__resize_mutation_handler__);
    } else {
      if (!total) {
        style = createStyles(css);
      }

      initTriggers(elem);
      elem.__resize_rendered__ = getRenderInfo(elem).rendered;

      if (window.MutationObserver) {
        let mo = new MutationObserver(elem.__resize_mutation_handler__);
        mo.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
        elem.__resize_mutation_observer__ = mo;
      }
    }
  }

  elem.__resize_listeners__.push(callback);

  total++;
}

function removeListener(elem, callback) {
  let listeners = elem.__resize_listeners__;

  if (!listeners) {
    return;
  }

  if (callback) {
    listeners.splice(listeners.indexOf(callback), 1);
  } // no listeners exist, or removing all listeners


  if (!listeners.length || !callback) {
    // targeting IE9/10
    if (elem.detachEvent && elem.removeEventListener) {
      elem.detachEvent('onresize', elem.__resize_legacy_resize_handler__);
      document.removeEventListener('DOMSubtreeModified', elem.__resize_mutation_handler__);
      return;
    }

    if (elem.__resize_observer__) {
      elem.__resize_observer__.unobserve(elem);

      elem.__resize_observer__.disconnect();

      elem.__resize_observer__ = null;
    } else {
      if (elem.__resize_mutation_observer__) {
        elem.__resize_mutation_observer__.disconnect();

        elem.__resize_mutation_observer__ = null;
      }

      elem.removeEventListener('scroll', handleScroll);
      elem.removeChild(elem.__resize_triggers__.triggers);
      elem.__resize_triggers__ = null;
    }

    elem.__resize_listeners__ = null;
  }

  if (! --total && style) {
    style.parentNode.removeChild(style);
  }
}

function getUpdatedSize(elem) {
  let {
    width,
    height
  } = elem.__resize_last__;
  let {
    offsetWidth,
    offsetHeight
  } = elem;

  if (offsetWidth !== width || offsetHeight !== height) {
    return {
      width: offsetWidth,
      height: offsetHeight
    };
  }

  return null;
}

function handleMutation() {
  // `this` denotes the scrolling element
  let {
    rendered,
    detached
  } = getRenderInfo(this);

  if (rendered !== this.__resize_rendered__) {
    if (!detached && this.__resize_triggers__) {
      resetTriggers(this);
      this.addEventListener('scroll', handleScroll, true);
    }

    this.__resize_rendered__ = rendered;
    runCallbacks(this);
  }
}

function handleScroll() {
  // `this` denotes the scrolling element
  resetTriggers(this);

  if (this.__resize_raf__) {
    cancelAnimationFrame(this.__resize_raf__);
  }

  this.__resize_raf__ = requestAnimationFrame(() => {
    let updated = getUpdatedSize(this);

    if (updated) {
      this.__resize_last__ = updated;
      runCallbacks(this);
    }
  });
}

function runCallbacks(elem) {
  if (!elem || !elem.__resize_listeners__) {
    return;
  }

  elem.__resize_listeners__.forEach(callback => {
    callback.call(elem);
  });
}

function initTriggers(elem) {
  let position = getComputedStyle(elem, 'position');

  if (!position || position === 'static') {
    elem.style.position = 'relative';
  }

  elem.__resize_old_position__ = position;
  elem.__resize_last__ = {};
  let triggers = createElement('div', {
    className: 'resize-triggers'
  });
  let expand = createElement('div', {
    className: 'resize-expand-trigger'
  });
  let expandChild = createElement('div');
  let contract = createElement('div', {
    className: 'resize-contract-trigger'
  });
  expand.appendChild(expandChild);
  triggers.appendChild(expand);
  triggers.appendChild(contract);
  elem.appendChild(triggers);
  elem.__resize_triggers__ = {
    triggers,
    expand,
    expandChild,
    contract
  };
  resetTriggers(elem);
  elem.addEventListener('scroll', handleScroll, true);
  elem.__resize_last__ = {
    width: elem.offsetWidth,
    height: elem.offsetHeight
  };
}

function resetTriggers(elem) {
  let {
    expand,
    expandChild,
    contract
  } = elem.__resize_triggers__; // batch read

  let {
    scrollWidth: csw,
    scrollHeight: csh
  } = contract;
  let {
    offsetWidth: eow,
    offsetHeight: eoh,
    scrollWidth: esw,
    scrollHeight: esh
  } = expand; // batch write

  contract.scrollLeft = csw;
  contract.scrollTop = csh;
  expandChild.style.width = eow + 1 + 'px';
  expandChild.style.height = eoh + 1 + 'px';
  expand.scrollLeft = esw;
  expand.scrollTop = esh;
}
},{}],"../../node_modules/micromodal/dist/micromodal.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const MicroModal = (() => {
  const FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

  class Modal {
    constructor({
      targetModal,
      triggers = [],
      onShow = () => {},
      onClose = () => {},
      openTrigger = 'data-micromodal-trigger',
      closeTrigger = 'data-micromodal-close',
      disableScroll = false,
      disableFocus = false,
      awaitCloseAnimation = false,
      awaitOpenAnimation = false,
      debugMode = false
    }) {
      // Save a reference of the modal
      this.modal = document.getElementById(targetModal); // Save a reference to the passed config

      this.config = {
        debugMode,
        disableScroll,
        openTrigger,
        closeTrigger,
        onShow,
        onClose,
        awaitCloseAnimation,
        awaitOpenAnimation,
        disableFocus // Register click events only if pre binding eventListeners

      };
      if (triggers.length > 0) this.registerTriggers(...triggers); // pre bind functions for event listeners

      this.onClick = this.onClick.bind(this);
      this.onKeydown = this.onKeydown.bind(this);
    }
    /**
     * Loops through all openTriggers and binds click event
     * @param  {array} triggers [Array of node elements]
     * @return {void}
     */


    registerTriggers(...triggers) {
      triggers.filter(Boolean).forEach(trigger => {
        trigger.addEventListener('click', event => this.showModal(event));
      });
    }

    showModal() {
      this.activeElement = document.activeElement;
      this.modal.setAttribute('aria-hidden', 'false');
      this.modal.classList.add('is-open');
      this.scrollBehaviour('disable');
      this.addEventListeners();

      if (this.config.awaitOpenAnimation) {
        const handler = () => {
          this.modal.removeEventListener('animationend', handler, false);
          this.setFocusToFirstNode();
        };

        this.modal.addEventListener('animationend', handler, false);
      } else {
        this.setFocusToFirstNode();
      }

      this.config.onShow(this.modal, this.activeElement);
    }

    closeModal() {
      const modal = this.modal;
      this.modal.setAttribute('aria-hidden', 'true');
      this.removeEventListeners();
      this.scrollBehaviour('enable');

      if (this.activeElement) {
        this.activeElement.focus();
      }

      this.config.onClose(this.modal);

      if (this.config.awaitCloseAnimation) {
        this.modal.addEventListener('animationend', function handler() {
          modal.classList.remove('is-open');
          modal.removeEventListener('animationend', handler, false);
        }, false);
      } else {
        modal.classList.remove('is-open');
      }
    }

    closeModalById(targetModal) {
      this.modal = document.getElementById(targetModal);
      if (this.modal) this.closeModal();
    }

    scrollBehaviour(toggle) {
      if (!this.config.disableScroll) return;
      const body = document.querySelector('body');

      switch (toggle) {
        case 'enable':
          Object.assign(body.style, {
            overflow: '',
            height: ''
          });
          break;

        case 'disable':
          Object.assign(body.style, {
            overflow: 'hidden',
            height: '100vh'
          });
          break;

        default:
      }
    }

    addEventListeners() {
      this.modal.addEventListener('touchstart', this.onClick);
      this.modal.addEventListener('click', this.onClick);
      document.addEventListener('keydown', this.onKeydown);
    }

    removeEventListeners() {
      this.modal.removeEventListener('touchstart', this.onClick);
      this.modal.removeEventListener('click', this.onClick);
      document.removeEventListener('keydown', this.onKeydown);
    }

    onClick(event) {
      if (event.target.hasAttribute(this.config.closeTrigger)) {
        this.closeModal();
        event.preventDefault();
      }
    }

    onKeydown(event) {
      if (event.keyCode === 27) this.closeModal(event);
      if (event.keyCode === 9) this.maintainFocus(event);
    }

    getFocusableNodes() {
      const nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS);
      return Array(...nodes);
    }

    setFocusToFirstNode() {
      if (this.config.disableFocus) return;
      const focusableNodes = this.getFocusableNodes();
      if (focusableNodes.length) focusableNodes[0].focus();
    }

    maintainFocus(event) {
      const focusableNodes = this.getFocusableNodes(); // if disableFocus is true

      if (!this.modal.contains(document.activeElement)) {
        focusableNodes[0].focus();
      } else {
        const focusedItemIndex = focusableNodes.indexOf(document.activeElement);

        if (event.shiftKey && focusedItemIndex === 0) {
          focusableNodes[focusableNodes.length - 1].focus();
          event.preventDefault();
        }

        if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
          focusableNodes[0].focus();
          event.preventDefault();
        }
      }
    }

  }
  /**
   * Modal prototype ends.
   * Here on code is responsible for detecting and
   * auto binding event handlers on modal triggers
   */
  // Keep a reference to the opened modal


  let activeModal = null;
  /**
   * Generates an associative array of modals and it's
   * respective triggers
   * @param  {array} triggers     An array of all triggers
   * @param  {string} triggerAttr The data-attribute which triggers the module
   * @return {array}
   */

  const generateTriggerMap = (triggers, triggerAttr) => {
    const triggerMap = [];
    triggers.forEach(trigger => {
      const targetModal = trigger.attributes[triggerAttr].value;
      if (triggerMap[targetModal] === undefined) triggerMap[targetModal] = [];
      triggerMap[targetModal].push(trigger);
    });
    return triggerMap;
  };
  /**
   * Validates whether a modal of the given id exists
   * in the DOM
   * @param  {number} id  The id of the modal
   * @return {boolean}
   */


  const validateModalPresence = id => {
    if (!document.getElementById(id)) {
      console.warn(`MicroModal: \u2757Seems like you have missed %c'${id}'`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'ID somewhere in your code. Refer example below to resolve it.');
      console.warn(`%cExample:`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', `<div class="modal" id="${id}"></div>`);
      return false;
    }
  };
  /**
   * Validates if there are modal triggers present
   * in the DOM
   * @param  {array} triggers An array of data-triggers
   * @return {boolean}
   */


  const validateTriggerPresence = triggers => {
    if (triggers.length <= 0) {
      console.warn(`MicroModal: \u2757Please specify at least one %c'micromodal-trigger'`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.');
      console.warn(`%cExample:`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', `<a href="#" data-micromodal-trigger="my-modal"></a>`);
      return false;
    }
  };
  /**
   * Checks if triggers and their corresponding modals
   * are present in the DOM
   * @param  {array} triggers   Array of DOM nodes which have data-triggers
   * @param  {array} triggerMap Associative array of modals and their triggers
   * @return {boolean}
   */


  const validateArgs = (triggers, triggerMap) => {
    validateTriggerPresence(triggers);
    if (!triggerMap) return true;

    for (var id in triggerMap) validateModalPresence(id);

    return true;
  };
  /**
   * Binds click handlers to all modal triggers
   * @param  {object} config [description]
   * @return void
   */


  const init = config => {
    // Create an config object with default openTrigger
    const options = Object.assign({}, {
      openTrigger: 'data-micromodal-trigger'
    }, config); // Collects all the nodes with the trigger

    const triggers = [...document.querySelectorAll(`[${options.openTrigger}]`)]; // Makes a mappings of modals with their trigger nodes

    const triggerMap = generateTriggerMap(triggers, options.openTrigger); // Checks if modals and triggers exist in dom

    if (options.debugMode === true && validateArgs(triggers, triggerMap) === false) return; // For every target modal creates a new instance

    for (var key in triggerMap) {
      let value = triggerMap[key];
      options.targetModal = key;
      options.triggers = [...value];
      activeModal = new Modal(options); // eslint-disable-line no-new
    }
  };
  /**
   * Shows a particular modal
   * @param  {string} targetModal [The id of the modal to display]
   * @param  {object} config [The configuration object to pass]
   * @return {void}
   */


  const show = (targetModal, config) => {
    const options = config || {};
    options.targetModal = targetModal; // Checks if modals and triggers exist in dom

    if (options.debugMode === true && validateModalPresence(targetModal) === false) return; // stores reference to active modal

    activeModal = new Modal(options); // eslint-disable-line no-new

    activeModal.showModal();
  };
  /**
   * Closes the active modal
   * @param  {string} targetModal [The id of the modal to close]
   * @return {void}
   */


  const close = targetModal => {
    targetModal ? activeModal.closeModalById(targetModal) : activeModal.closeModal();
  };

  return {
    init,
    show,
    close
  };
})();

var _default = MicroModal;
exports.default = _default;
},{}],"../scripts/modals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _scrollbarSize = _interopRequireDefault(require("dom-helpers/util/scrollbarSize"));

var _resizeDetector = require("resize-detector");

var _micromodal = _interopRequireDefault(require("micromodal"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_PROPS = {
  modalContentSelector: '[data-modal_id]',
  defaultProperties: {
    additionalClass: '',
    classes: {
      modal: 'modal',
      overlay: 'modal-overlay',
      container: 'modal-container',
      header: 'modal-header',
      title: 'modal-title',
      closeButton: 'modal-close',
      contentHolder: 'modal-contentHolder',
      content: 'modal-content'
    }
  }
};

var Modals = /*#__PURE__*/function () {
  function Modals(props) {
    var _this = this;

    _classCallCheck(this, Modals);

    _defineProperty(this, "_props", null);

    _defineProperty(this, "_modalContentNodes", []);

    _defineProperty(this, "_modalsProperties", []);

    _defineProperty(this, "_openers", []);

    _defineProperty(this, "_modalElements", []);

    _defineProperty(this, "_activeModalId", null);

    _defineProperty(this, "handleContentResize", function (element, index) {
      return function () {
        _this.setHeaderWidth(element, index);
      };
    });

    _defineProperty(this, "openDialog", function (id) {
      var openersTree = (0, _utils.arrayToObject)(_this._openers, "dataset", "customOpen");
      var opener = openersTree[id];
      var targetDialog = (0, _utils.arrayToObject)(_this._modalElements, "id")[id];

      if (!targetDialog) {
        console.log("there is no dialid with id: ".concat(id));
        return;
      }

      if (opener) {
        opener.click();
      }
    });

    _defineProperty(this, "setHeaderWidth", function (element, index) {
      var _element$getBoundingC = element.getBoundingClientRect(),
          width = _element$getBoundingC.width;

      var header = _this._modalElements[index].querySelector('header');

      header.style.width = "".concat(width, "px");
    });

    _defineProperty(this, "wrapModalContents", function (element, index) {
      var _this$_modalsProperti = _this._modalsProperties[index],
          id = _this$_modalsProperti.id,
          title = _this$_modalsProperti.title,
          additionalClass = _this$_modalsProperti.additionalClass,
          classes = _this$_modalsProperti.classes;
      var overlayElement, containerElement, headerElement, titleElement, closeButtonElement, contentElement;
      _this._modalElements[index] = document.createElement('div');
      (0, _utils.setAttributes)(_this._modalElements[index], {
        class: classes.modal + ' ' + additionalClass,
        id: id,
        'aria-hidden': true
      });
      overlayElement = document.createElement('div');
      (0, _utils.setAttributes)(overlayElement, {
        class: classes.overlay,
        tabindex: '-1',
        'data-custom-close': true
      });
      containerElement = document.createElement('div');
      (0, _utils.setAttributes)(containerElement, {
        class: classes.container,
        role: 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': "".concat(id, "-title")
      });
      headerElement = document.createElement('header');
      (0, _utils.setAttributes)(headerElement, {
        class: classes.header
      });
      titleElement = document.createElement('h2');
      (0, _utils.setAttributes)(titleElement, {
        class: classes.title,
        id: "".concat(id, "-title")
      });
      titleElement.textContent = title;
      closeButtonElement = document.createElement('button');
      (0, _utils.setAttributes)(closeButtonElement, {
        class: classes.closeButton,
        'aria-label': 'Close modal',
        'data-custom-close': true
      });
      contentElement = document.createElement('div');
      (0, _utils.setAttributes)(contentElement, {
        class: classes.content,
        id: "".concat(id, "-content")
      });
      (0, _utils.addClass)(contentElement, 'js-init-scroll-shadow');
      (0, _utils.wrapElement)(element, contentElement);
      (0, _utils.wrapElement)(contentElement, containerElement);
      (0, _utils.wrapElement)(containerElement, overlayElement);
      (0, _utils.wrapElement)(overlayElement, _this._modalElements[index]);
      containerElement.insertAdjacentElement('afterbegin', headerElement);
      headerElement.insertAdjacentElement('afterbegin', closeButtonElement);
      title && headerElement.insertAdjacentElement('afterbegin', titleElement);
    });

    _defineProperty(this, "getDataProperties", function (defaultProperties) {
      return function (element) {
        var _element$dataset = element.dataset,
            modal_id = _element$dataset.modal_id,
            modal_title = _element$dataset.modal_title,
            modal_additional_class = _element$dataset.modal_additional_class;
        var properties = {};
        if (modal_id !== undefined) properties.id = modal_id;
        if (modal_title !== undefined) properties.title = modal_title;
        if (modal_additional_class !== undefined) properties.additionalClass = modal_additional_class;
        return _objectSpread(_objectSpread({}, defaultProperties), properties);
      };
    });

    _defineProperty(this, "handleDialogShow", function (modal) {
      _this._activeModalId = modal.id;

      _this.setBodyStyle();
    });

    _defineProperty(this, "handleDialogClose", function (modal) {
      _this._activeModalId = null;

      _this.resetBodyStyle();

      _this.pauseAllYoutubeVideos(modal);

      _this.pauseAllVideos(modal);
    });

    this._props = _objectSpread(_objectSpread({}, DEFAULT_PROPS), props);
    var _this$_props = this._props,
        modalContentSelector = _this$_props.modalContentSelector,
        _defaultProperties = _this$_props.defaultProperties;

    if (!document.querySelector(modalContentSelector)) {
      return;
    }

    this._modalContentNodes = Array.from(document.querySelectorAll(modalContentSelector));
    this._modalsProperties = this._modalContentNodes.map(this.getDataProperties(_defaultProperties));
    this._modalContentNodes[0].parentElement.style.display = 'block';

    this._modalContentNodes.map(this.wrapModalContents);

    this._openers = Array.from(document.querySelectorAll("[data-custom-open]"));

    _micromodal.default.init({
      onShow: this.handleDialogShow,
      onClose: this.handleDialogClose,
      openTrigger: 'data-custom-open',
      closeTrigger: 'data-custom-close',
      disableScroll: true,
      disableFocus: false,
      awaitCloseAnimation: false,
      debugMode: true
    });

    this.setHeaderWidthByContent();
  }

  _createClass(Modals, [{
    key: "setHeaderWidthByContent",
    value: function setHeaderWidthByContent() {
      var _this2 = this;

      var _modalContentNodes = this._modalContentNodes;

      _modalContentNodes.forEach(this.setHeaderWidth);

      _modalContentNodes.forEach(function (contentElement, index) {
        (0, _resizeDetector.addListener)(contentElement, _this2.handleContentResize(contentElement, index));
      });
    }
  }, {
    key: "setBodyStyle",
    value: function setBodyStyle() {
      var bodyElement = document.body;
      bodyElement.style.paddingRight = "".concat((0, _scrollbarSize.default)(), "px");
      bodyElement.children[0].style.webkitFilter = 'blur(3px)';
      bodyElement.children[0].style.msFilter = 'blur(3px)';
      bodyElement.children[0].style.OFilter = 'blur(3px)';
      bodyElement.children[0].style.MozFilter = 'blur(3px)';
      bodyElement.children[0].style.filter = 'blur(3px)';
    }
  }, {
    key: "resetBodyStyle",
    value: function resetBodyStyle() {
      var bodyElement = document.body;
      bodyElement.style.paddingRight = '';
      bodyElement.children[0].style.filter = '';
      bodyElement.children[0].style.webkitFilter = '';
      bodyElement.children[0].style.msFilter = '';
      bodyElement.children[0].style.OFilter = '';
      bodyElement.children[0].style.MozFilter = '';
    }
  }, {
    key: "pauseAllYoutubeVideos",
    value: function pauseAllYoutubeVideos(modal) {
      if (!modal.querySelector('.youtubeVideoModal-video')) {
        return;
      }

      try {
        var videos = Array.from(modal.querySelectorAll('.youtubeVideoModal-video'));
        videos.forEach(function (video) {
          video.src = video.src;
        }); // videos.forEach(video => {
        //   video.contentWindow.postMessage(
        //     '{"event":"command","func":"stopVideo","args":""}',
        //     '*'
        //     );
        //   });
        // videos.forEach(video => {
        //   console.log("Modals -> pauseAllYoutubeVideos -> video", Boolean(video.contentWindow))
        //   video.stopVideo();
        // });
      } catch (error) {
        console.warn("Can't stop video", error);
      }
    }
  }, {
    key: "pauseAllVideos",
    value: function pauseAllVideos(modal) {
      if (!modal.querySelector('video')) {
        return;
      }

      var videos = Array.from(modal.querySelectorAll('video'));
      videos.forEach(function (video) {
        video.pause();
      });
    }
  }]);

  return Modals;
}();

exports.default = Modals;
},{"dom-helpers/util/scrollbarSize":"../../node_modules/dom-helpers/util/scrollbarSize.js","resize-detector":"../../node_modules/resize-detector/esm/index.js","micromodal":"../../node_modules/micromodal/dist/micromodal.es.js","./utils":"../scripts/utils/index.js"}],"../scripts/set-input-state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// document.addEventListener('DOMContentLoaded', () => {
//   new SetInputState({
//     inputHolderSelector: '.js-input',
//     filledClass: 'input--isFilled',
//     focudedClass: 'input--isFocused'
//   });
// });
var SetInputState = function SetInputState(props) {
  var _this = this;

  _classCallCheck(this, SetInputState);

  _defineProperty(this, "_props", null);

  _defineProperty(this, "handleFocusInput", function (inputHolder) {
    return function () {
      var _this$_props = _this._props,
          filledClass = _this$_props.filledClass,
          focudedClass = _this$_props.focudedClass;
      inputHolder.classList.add(filledClass);
      inputHolder.classList.add(focudedClass);
    };
  });

  _defineProperty(this, "handleBlurInput", function (inputHolder, inputField) {
    return function () {
      var _this$_props2 = _this._props,
          filledClass = _this$_props2.filledClass,
          focudedClass = _this$_props2.focudedClass;
      inputHolder.classList.remove(focudedClass);

      if (!!inputField.value.trim()) {
        return;
      }

      inputField.value = '';
      inputHolder.classList.remove(filledClass);
    };
  });

  this._props = props;
  var inputHolderSelector = this._props.inputHolderSelector;
  var inputHolders = Array.from(document.querySelectorAll(inputHolderSelector));
  inputHolders.forEach(function (element) {
    var inputField = element.querySelector('input, textarea');
    inputField.addEventListener('focus', _this.handleFocusInput(element, inputField));
    inputField.addEventListener('blur', _this.handleBlurInput(element, inputField));
  });
};

var _default = SetInputState;
exports.default = _default;
},{}],"../../node_modules/vanilla-text-mask/dist/vanillaTextMask.js":[function(require,module,exports) {
var define;
!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.vanillaTextMask=r():e.vanillaTextMask=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r=e.inputElement,t=(0,u.default)(e),n=function(e){var r=e.target.value;return t.update(r)};return r.addEventListener("input",n),t.update(r.value),{textMaskInputElement:t,destroy:function(){r.removeEventListener("input",n)}}}Object.defineProperty(r,"__esModule",{value:!0}),r.conformToMask=void 0,r.maskInput=o;var i=t(2);Object.defineProperty(r,"conformToMask",{enumerable:!0,get:function(){return n(i).default}});var a=t(5),u=n(a);r.default=o},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.placeholderChar="_",r.strFunction="function"},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,i.isArray)(r)){if(("undefined"==typeof r?"undefined":o(r))!==a.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");r=r(e,t),r=(0,i.processCaretTraps)(r).maskWithoutCaretTraps}var n=t.guide,s=void 0===n||n,f=t.previousConformedValue,d=void 0===f?l:f,c=t.placeholderChar,p=void 0===c?a.placeholderChar:c,v=t.placeholder,h=void 0===v?(0,i.convertMaskToPlaceholder)(r,p):v,m=t.currentCaretPosition,y=t.keepCharPositions,g=s===!1&&void 0!==d,b=e.length,C=d.length,k=h.length,x=r.length,P=b-C,T=P>0,O=m+(T?-P:0),M=O+Math.abs(P);if(y===!0&&!T){for(var w=l,S=O;S<M;S++)h[S]===p&&(w+=p);e=e.slice(0,O)+w+e.slice(O,b)}for(var _=e.split(l).map(function(e,r){return{char:e,isNew:r>=O&&r<M}}),j=b-1;j>=0;j--){var V=_[j].char;if(V!==p){var A=j>=O&&C===x;V===h[A?j-P:j]&&_.splice(j,1)}}var E=l,N=!1;e:for(var F=0;F<k;F++){var I=h[F];if(I===p){if(_.length>0)for(;_.length>0;){var L=_.shift(),R=L.char,J=L.isNew;if(R===p&&g!==!0){E+=p;continue e}if(r[F].test(R)){if(y===!0&&J!==!1&&d!==l&&s!==!1&&T){for(var W=_.length,q=null,z=0;z<W;z++){var B=_[z];if(B.char!==p&&B.isNew===!1)break;if(B.char===p){q=z;break}}null!==q?(E+=R,_.splice(q,1)):F--}else E+=R;continue e}N=!0}g===!1&&(E+=h.substr(F,k));break}E+=I}if(g&&T===!1){for(var D=null,G=0;G<E.length;G++)h[G]===p&&(D=G);E=null!==D?E.substr(0,D+1):l}return{conformedValue:E,meta:{someCharsRejected:N}}}Object.defineProperty(r,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=n;var i=t(3),a=t(1),u=[],l=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l.placeholderChar;if(!o(e))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(e.indexOf(r)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(r)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?r:e}).join("")}function o(e){return Array.isArray&&Array.isArray(e)||e instanceof Array}function i(e){return"string"==typeof e||e instanceof String}function a(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function u(e){for(var r=[],t=void 0;t=e.indexOf(f),t!==-1;)r.push(t),e.splice(t,1);return{maskWithoutCaretTraps:e,indexes:r}}Object.defineProperty(r,"__esModule",{value:!0}),r.convertMaskToPlaceholder=n,r.isArray=o,r.isString=i,r.isNumber=a,r.processCaretTraps=u;var l=t(1),s=[],f="[]"},function(e,r){"use strict";function t(e){var r=e.previousConformedValue,t=void 0===r?o:r,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,l=void 0===u?0:u,s=e.conformedValue,f=e.rawValue,d=e.placeholderChar,c=e.placeholder,p=e.indexesOfPipedChars,v=void 0===p?n:p,h=e.caretTrapIndexes,m=void 0===h?n:h;if(0===l||!f.length)return 0;var y=f.length,g=t.length,b=c.length,C=s.length,k=y-g,x=k>0,P=0===g,T=k>1&&!x&&!P;if(T)return l;var O=x&&(t===s||s===c),M=0,w=void 0,S=void 0;if(O)M=l-k;else{var _=s.toLowerCase(),j=f.toLowerCase(),V=j.substr(0,l).split(o),A=V.filter(function(e){return _.indexOf(e)!==-1});S=A[A.length-1];var E=a.substr(0,A.length).split(o).filter(function(e){return e!==d}).length,N=c.substr(0,A.length).split(o).filter(function(e){return e!==d}).length,F=N!==E,I=void 0!==a[A.length-1]&&void 0!==c[A.length-2]&&a[A.length-1]!==d&&a[A.length-1]!==c[A.length-1]&&a[A.length-1]===c[A.length-2];!x&&(F||I)&&E>0&&c.indexOf(S)>-1&&void 0!==f[l]&&(w=!0,S=f[l]);for(var L=v.map(function(e){return _[e]}),R=L.filter(function(e){return e===S}).length,J=A.filter(function(e){return e===S}).length,W=c.substr(0,c.indexOf(d)).split(o).filter(function(e,r){return e===S&&f[r]!==e}).length,q=W+J+R+(w?1:0),z=0,B=0;B<C;B++){var D=_[B];if(M=B+1,D===S&&z++,z>=q)break}}if(x){for(var G=M,H=M;H<=b;H++)if(c[H]===d&&(G=H),c[H]===d||m.indexOf(H)!==-1||H===b)return G}else if(w){for(var K=M-1;K>=0;K--)if(s[K]===S||m.indexOf(K)!==-1||0===K)return K}else for(var Q=M;Q>=0;Q--)if(c[Q-1]===d||m.indexOf(Q)!==-1||0===Q)return Q}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t;var n=[],o=""},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:r,update:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,s=n.mask,d=n.guide,m=n.pipe,g=n.placeholderChar,b=void 0===g?v.placeholderChar:g,C=n.keepCharPositions,k=void 0!==C&&C,x=n.showMask,P=void 0!==x&&x;if("undefined"==typeof t&&(t=o.value),t!==r.previousConformedValue){("undefined"==typeof s?"undefined":l(s))===y&&void 0!==s.pipe&&void 0!==s.mask&&(m=s.pipe,s=s.mask);var T=void 0,O=void 0;if(s instanceof Array&&(T=(0,p.convertMaskToPlaceholder)(s,b)),s!==!1){var M=a(t),w=o.selectionEnd,S=r.previousConformedValue,_=r.previousPlaceholder,j=void 0;if(("undefined"==typeof s?"undefined":l(s))===v.strFunction){if(O=s(M,{currentCaretPosition:w,previousConformedValue:S,placeholderChar:b}),O===!1)return;var V=(0,p.processCaretTraps)(O),A=V.maskWithoutCaretTraps,E=V.indexes;O=A,j=E,T=(0,p.convertMaskToPlaceholder)(O,b)}else O=s;var N={previousConformedValue:S,guide:d,placeholderChar:b,pipe:m,placeholder:T,currentCaretPosition:w,keepCharPositions:k},F=(0,c.default)(M,O,N),I=F.conformedValue,L=("undefined"==typeof m?"undefined":l(m))===v.strFunction,R={};L&&(R=m(I,u({rawValue:M},N)),R===!1?R={value:S,rejected:!0}:(0,p.isString)(R)&&(R={value:R}));var J=L?R.value:I,W=(0,f.default)({previousConformedValue:S,previousPlaceholder:_,conformedValue:J,placeholder:T,rawValue:M,currentCaretPosition:w,placeholderChar:b,indexesOfPipedChars:R.indexesOfPipedChars,caretTrapIndexes:j}),q=J===T&&0===W,z=P?T:h,B=q?z:J;r.previousConformedValue=B,r.previousPlaceholder=T,o.value!==B&&(o.value=B,i(o,W))}}}}}function i(e,r){document.activeElement===e&&(g?b(function(){return e.setSelectionRange(r,r,m)},0):e.setSelectionRange(r,r,m))}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return h;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(r,"__esModule",{value:!0});var u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=o;var s=t(4),f=n(s),d=t(2),c=n(d),p=t(3),v=t(1),h="",m="none",y="object",g="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});
},{}],"../scripts/phone-mask.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initPhoneMaskSetter;

var _vanillaTextMask = _interopRequireDefault(require("vanilla-text-mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mask = ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];
var initialValue = '+7 (';

function initPhoneMaskSetter(_ref) {
  var inputSelector = _ref.inputSelector;

  var _inputElement = document.querySelector(inputSelector);

  if (!_inputElement) {
    return;
  }

  var inputElements = Array.from(document.querySelectorAll(inputSelector));
  inputElements.forEach(function (inputElement) {
    return new PhoneMaskSetter({
      inputElement: inputElement
    });
  });
}

var PhoneMaskSetter = function PhoneMaskSetter(props) {
  var _this = this;

  _classCallCheck(this, PhoneMaskSetter);

  _defineProperty(this, "_props", null);

  _defineProperty(this, "_inputNode", null);

  _defineProperty(this, "handleFocus", function () {
    var inputElement = _this._props.inputElement;

    if (!inputElement.value) {
      inputElement.value = initialValue;
    }
  });

  _defineProperty(this, "handleBlur", function () {// const { inputElement } = this._props;
    // if (inputElement.value === initialValue) {
    //   inputElement.value = "";
    // }
  });

  this._props = _objectSpread({}, props);
  var _inputElement2 = this._props.inputElement;

  _inputElement2.addEventListener('focus', this.handleFocus);

  _inputElement2.addEventListener('blur', this.handleBlur);

  (0, _vanillaTextMask.default)({
    inputElement: _inputElement2,
    mask: mask,
    guide: false
  });
};
},{"vanilla-text-mask":"../../node_modules/vanilla-text-mask/dist/vanillaTextMask.js"}],"../scripts/smooth-scroll-to-anchor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initSmoothScrollToAnchor;
exports.SmoothScrollToAnchor = void 0;

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_PROPS = {
  selector: "a[href^='#']",
  hideNonActiveAnchors: true,
  duration: 300,
  offsetElementSelector: ".js-page-header",
  offset: 0,
  callback: null
}; // function isHidden(el) {
//   return (el.offsetParent === null)
// }

function getIsHiddenElement(el) {
  if (!el) {
    return false;
  }

  var style = window.getComputedStyle(el);
  return style.display === "none";
}

function getAnchorsRelatedToExistingTargets(element) {
  var targetElement = document.getElementById(element.hash.substr(1));
  var isDisplayTarget = !getIsHiddenElement(targetElement);
  return isDisplayTarget;
}

function getIdFromHash(element) {
  return element.hash.substr(1);
}

function initSmoothScrollToAnchor(props) {
  var _props = _objectSpread(_objectSpread({}, DEFAULT_PROPS), props);

  var selector = _props.selector,
      hideNonActiveAnchors = _props.hideNonActiveAnchors,
      rest = _objectWithoutProperties(_props, ["selector", "hideNonActiveAnchors"]);

  var anchorElement = document.querySelector(selector);

  if (!anchorElement) {
    return;
  }

  var anchorElements = Array.from(document.querySelectorAll(selector));
  var hashedAnchorElements = anchorElements.filter(getIdFromHash);
  var anchorsRelatedToExistingTargets = hashedAnchorElements.filter(getAnchorsRelatedToExistingTargets);
  anchorsRelatedToExistingTargets.forEach(function (element) {
    new SmoothScrollToAnchor(_objectSpread({
      element: element
    }, rest));
  });
}

var SmoothScrollToAnchor = function SmoothScrollToAnchor(props) {
  var _this = this;

  _classCallCheck(this, SmoothScrollToAnchor);

  _defineProperty(this, "_props", null);

  _defineProperty(this, "_id", null);

  _defineProperty(this, "_target", null);

  _defineProperty(this, "_scrollOffset", 0);

  _defineProperty(this, "getDataScrollOffset", function (target) {
    var _this$_props = _this._props,
        offsetElementSelector = _this$_props.offsetElementSelector,
        _offset = _this$_props.offset;
    var offsetElement = document.querySelector(offsetElementSelector);
    var offset = target.dataset.scroll_offset;

    if (offsetElement) {
      var elementOffset = offsetElement.getBoundingClientRect().height;
      offset = offset - elementOffset + _offset;
    }

    return offset ? +offset : 0;
  });

  _defineProperty(this, "handleClick", function (e) {
    var _this$_props2 = _this._props,
        duration = _this$_props2.duration,
        callback = _this$_props2.callback;
    e.preventDefault();
    var final = _this._target.offsetTop + _this._scrollOffset;
    (0, _utils.scrollTo)(final, duration, callback);
  });

  this._props = props;
  var element = this._props.element;

  if (!element) {
    return;
  }

  this._id = getIdFromHash(element);
  this._target = document.getElementById(this._id);

  if (!this._target) {
    return;
  }

  this._scrollOffset = this.getDataScrollOffset(this._target);
  element.addEventListener("click", this.handleClick);
};

exports.SmoothScrollToAnchor = SmoothScrollToAnchor;
},{"./utils":"../scripts/utils/index.js"}],"../scripts/sertificatPreviev.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SertificatPreview = /*#__PURE__*/function () {
  function SertificatPreview(props) {
    var _this = this;

    _classCallCheck(this, SertificatPreview);

    _defineProperty(this, "_props", null);

    _defineProperty(this, "_previousActiveIndex", null);

    _defineProperty(this, "_activeIndex", null);

    _defineProperty(this, "_buttons", []);

    _defineProperty(this, "_images", []);

    _defineProperty(this, "handleRadioChange", function (index) {
      return function () {
        _this.setActive(index);
      };
    });

    this._props = _objectSpread({}, props);
    var _this$_props = this._props,
        holderSelector = _this$_props.holderSelector,
        previewSelector = _this$_props.previewSelector;
    var $sertificatToogler = document.querySelector(holderSelector);

    if (!$sertificatToogler) {
      return;
    }

    var $previewSelector = document.querySelector(previewSelector);

    if (!$previewSelector) {
      return;
    }

    this._buttons = Array.from($sertificatToogler.querySelectorAll("input[type='radio']"));

    if (!this._buttons || this._buttons.length === 0) {
      return;
    }

    this._images = Array.from($previewSelector.querySelectorAll("img"));

    if (!this._images || this._images.length === 0) {
      return;
    }

    this.setActive();
    this.setListeners();
  }

  _createClass(SertificatPreview, [{
    key: "setListeners",
    value: function setListeners() {
      var _this2 = this;

      this._buttons.forEach(function (radio, index) {
        radio.addEventListener("change", _this2.handleRadioChange(index));
      });
    }
  }, {
    key: "setActive",
    value: function setActive() {
      var activeIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this._buttons.forEach(function (button, index) {
        if (button.checked) {
          activeIndex = index;
        }
      });

      this._previousActiveIndex = this._activeIndex;
      this._activeIndex = activeIndex;
      this.setActiveToPeview();
    }
  }, {
    key: "setActiveToPeview",
    value: function setActiveToPeview() {
      var activeImage = this._images[this._activeIndex];

      if (activeImage) {
        (0, _utils.addClass)(activeImage, "active");
      }

      var previousActiveImage = this._images[this._previousActiveIndex];

      if (previousActiveImage) {
        (0, _utils.removeClass)(previousActiveImage, "active");
      }
    }
  }]);

  return SertificatPreview;
}();

var _default = SertificatPreview;
exports.default = _default;
},{"./utils":"../scripts/utils/index.js"}],"../scripts/indicate-touch-devices.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indicateMobileDevices;

var _utils = require("./utils");

var TOUCH_DEVICES_CLASS_NAME = 'is-touch-device';
var NO_TOUCH_DEVICES_CLASS_NAME = 'is-not-touch-device';

function indicateMobileDevices(targetSelector) {
  var target = targetSelector ? document.querySelector(targetSelector) : document.documentElement;

  if ((0, _utils.getIsTouchDevice)()) {
    (0, _utils.addClass)(target, TOUCH_DEVICES_CLASS_NAME);
  } else {
    (0, _utils.addClass)(target, NO_TOUCH_DEVICES_CLASS_NAME);
  }
}
},{"./utils":"../scripts/utils/index.js"}],"../scripts/indicate-mobile-devices.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indicateMobileDevices;

var _utils = require("./utils");

var MOBILE_DEVICES_CLASS_NAME = 'is-mobile-device';
var NO_MOBILE_DEVICES_CLASS_NAME = 'is-not-mobile-device';

function indicateMobileDevices(targetSelector) {
  var target = targetSelector ? document.querySelector(targetSelector) : document.documentElement;

  if ((0, _utils.getIsMobileDevice)()) {
    (0, _utils.addClass)(target, MOBILE_DEVICES_CLASS_NAME);
  } else {
    (0, _utils.addClass)(target, NO_MOBILE_DEVICES_CLASS_NAME);
  }
}
},{"./utils":"../scripts/utils/index.js"}],"../scripts/indicate-mobile-and-tablet-devices.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indicateMobileOrTabletDevices;

var _utils = require("./utils");

var MOBILE_AND_TABLET_DEVICES_CLASS_NAME = 'is-mobile-or-device';
var NO_MOBILE_AND_TABLET_DEVICES_CLASS_NAME = 'is-not-mobile-or-tablet-device';

function indicateMobileOrTabletDevices(targetSelector) {
  var target = targetSelector ? document.querySelector(targetSelector) : document.documentElement;

  if ((0, _utils.getIsMobileOrTabletDevice)()) {
    (0, _utils.addClass)(target, MOBILE_AND_TABLET_DEVICES_CLASS_NAME);
  } else {
    (0, _utils.addClass)(target, NO_MOBILE_AND_TABLET_DEVICES_CLASS_NAME);
  }
}
},{"./utils":"../scripts/utils/index.js"}],"../scripts/keyboard-using-state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const KEY_CODE_TAB = 9;
// const KEY_CODE_ARROW_LEFT = 37;
// const KEY_CODE_ARROW_RIGHT = 39;
// const KEY_CODE_ARROW_UP = 38;
// const KEY_CODE_ARROW_DOWN = 40;
// const KEY_CODE_LIST = [KEY_CODE_TAB, KEY_CODE_ARROW_LEFT, KEY_CODE_ARROW_RIGHT, KEY_CODE_ARROW_UP, KEY_CODE_ARROW_DOWN];
// document.addEventListener('DOMContentLoaded', () => {
//   new KeyboardUsingState({ listenerSelector: null, targetSelector: '.page', keyCodes: KEY_CODE_LIST, keyUsingClass: 'isKeyboardUsing' });
// });
var KeyboardUsingState = /*#__PURE__*/function () {
  function KeyboardUsingState(props) {
    var _this = this;

    _classCallCheck(this, KeyboardUsingState);

    _defineProperty(this, "_props", null);

    _defineProperty(this, "handleKeydown", function (e) {
      _this.setUsingKeyboard(e.keyCode);
    });

    _defineProperty(this, "handleMousedown", function (e) {
      _this.resetUsingKeyboard();
    });

    this._props = props;
    this._target = null;
    var _this$_props = this._props,
        listenerSelector = _this$_props.listenerSelector,
        targetSelector = _this$_props.targetSelector;
    var listenerNode = listenerSelector ? document.querySelector(listenerSelector) : window;
    this._target = targetSelector ? document.querySelector(targetSelector) : document.body;
    listenerNode.addEventListener('keydown', this.handleKeydown);
    listenerNode.addEventListener('mousedown', this.handleMousedown);
  }

  _createClass(KeyboardUsingState, [{
    key: "setUsingKeyboard",
    value: function setUsingKeyboard(_keyCode) {
      var _this$_props2 = this._props,
          keyCodes = _this$_props2.keyCodes,
          keyUsingClass = _this$_props2.keyUsingClass;
      var isMultipleKeys = Array.isArray(keyCodes);

      if (!isMultipleKeys) {
        keyCodes = keyCodes.toString();
      }

      if (isMultipleKeys ? this.hasArrayElement(keyCodes, _keyCode) : this.isEqualStrings(keyCodes, _keyCode.toString())) {
        this._target.classList.add(keyUsingClass);
      } else {
        this.resetUsingKeyboard();
      }
    }
  }, {
    key: "resetUsingKeyboard",
    value: function resetUsingKeyboard() {
      var keyUsingClass = this._props.keyUsingClass;

      this._target.classList.remove(keyUsingClass);
    }
  }, {
    key: "hasArrayElement",
    value: function hasArrayElement(array, element) {
      return array.indexOf(element) !== -1;
    }
  }, {
    key: "isEqualStrings",
    value: function isEqualStrings(string_1, string_2) {
      return string_1 === string_2;
    }
  }]);

  return KeyboardUsingState;
}();

var _default = KeyboardUsingState;
exports.default = _default;
},{}],"../../node_modules/css-element-queries/src/ResizeSensor.js":[function(require,module,exports) {
var define;
'use strict';

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.ResizeSensor = factory();
    }
}(typeof window !== 'undefined' ? window : this, function () {

    // Make sure it does not throw in a SSR (Server Side Rendering) situation
    if (typeof window === "undefined") {
        return null;
    }
    // https://github.com/Semantic-Org/Semantic-UI/issues/3855
    // https://github.com/marcj/css-element-queries/issues/257
    var globalWindow = typeof window != 'undefined' && window.Math == Math
        ? window
        : typeof self != 'undefined' && self.Math == Math
            ? self
            : Function('return this')();
    // Only used for the dirty checking, so the event callback count is limited to max 1 call per fps per sensor.
    // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
    // would generate too many unnecessary events.
    var requestAnimationFrame = globalWindow.requestAnimationFrame ||
        globalWindow.mozRequestAnimationFrame ||
        globalWindow.webkitRequestAnimationFrame ||
        function (fn) {
            return globalWindow.setTimeout(fn, 20);
        };

    /**
     * Iterate over each of the provided element(s).
     *
     * @param {HTMLElement|HTMLElement[]} elements
     * @param {Function}                  callback
     */
    function forEachElement(elements, callback){
        var elementsType = Object.prototype.toString.call(elements);
        var isCollectionTyped = ('[object Array]' === elementsType
            || ('[object NodeList]' === elementsType)
            || ('[object HTMLCollection]' === elementsType)
            || ('[object Object]' === elementsType)
            || ('undefined' !== typeof jQuery && elements instanceof jQuery) //jquery
            || ('undefined' !== typeof Elements && elements instanceof Elements) //mootools
        );
        var i = 0, j = elements.length;
        if (isCollectionTyped) {
            for (; i < j; i++) {
                callback(elements[i]);
            }
        } else {
            callback(elements);
        }
    }

    /**
    * Get element size
    * @param {HTMLElement} element
    * @returns {Object} {width, height}
    */
    function getElementSize(element) {
        if (!element.getBoundingClientRect) {
            return {
                width: element.offsetWidth,
                height: element.offsetHeight
            }
        }

        var rect = element.getBoundingClientRect();
        return {
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        }
    }

    /**
     * Apply CSS styles to element.
     *
     * @param {HTMLElement} element
     * @param {Object} style
     */
    function setStyle(element, style) {
        Object.keys(style).forEach(function(key) {
            element.style[key] = style[key];
        });
    }

    /**
     * Class for dimension change detection.
     *
     * @param {Element|Element[]|Elements|jQuery} element
     * @param {Function} callback
     *
     * @constructor
     */
    var ResizeSensor = function(element, callback) {
        /**
         *
         * @constructor
         */
        function EventQueue() {
            var q = [];
            this.add = function(ev) {
                q.push(ev);
            };

            var i, j;
            this.call = function(sizeInfo) {
                for (i = 0, j = q.length; i < j; i++) {
                    q[i].call(this, sizeInfo);
                }
            };

            this.remove = function(ev) {
                var newQueue = [];
                for(i = 0, j = q.length; i < j; i++) {
                    if(q[i] !== ev) newQueue.push(q[i]);
                }
                q = newQueue;
            };

            this.length = function() {
                return q.length;
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {Function}    resized
         */
        function attachResizeEvent(element, resized) {
            if (!element) return;
            if (element.resizedAttached) {
                element.resizedAttached.add(resized);
                return;
            }

            element.resizedAttached = new EventQueue();
            element.resizedAttached.add(resized);

            element.resizeSensor = document.createElement('div');
            element.resizeSensor.dir = 'ltr';
            element.resizeSensor.className = 'resize-sensor';

            var style = {
                pointerEvents: 'none',
                position: 'absolute',
                left: '0px',
                top: '0px',
                right: '0px',
                bottom: '0px',
                overflow: 'hidden',
                zIndex: '-1',
                visibility: 'hidden',
                maxWidth: '100%'
            };
            var styleChild = {
                position: 'absolute',
                left: '0px',
                top: '0px',
                transition: '0s',
            };

            setStyle(element.resizeSensor, style);

            var expand = document.createElement('div');
            expand.className = 'resize-sensor-expand';
            setStyle(expand, style);

            var expandChild = document.createElement('div');
            setStyle(expandChild, styleChild);
            expand.appendChild(expandChild);

            var shrink = document.createElement('div');
            shrink.className = 'resize-sensor-shrink';
            setStyle(shrink, style);

            var shrinkChild = document.createElement('div');
            setStyle(shrinkChild, styleChild);
            setStyle(shrinkChild, { width: '200%', height: '200%' });
            shrink.appendChild(shrinkChild);

            element.resizeSensor.appendChild(expand);
            element.resizeSensor.appendChild(shrink);
            element.appendChild(element.resizeSensor);

            var computedStyle = window.getComputedStyle(element);
            var position = computedStyle ? computedStyle.getPropertyValue('position') : null;
            if ('absolute' !== position && 'relative' !== position && 'fixed' !== position) {
                element.style.position = 'relative';
            }

            var dirty, rafId;
            var size = getElementSize(element);
            var lastWidth = 0;
            var lastHeight = 0;
            var initialHiddenCheck = true;
            var lastAnimationFrame = 0;

            var resetExpandShrink = function () {
                var width = element.offsetWidth;
                var height = element.offsetHeight;

                expandChild.style.width = (width + 10) + 'px';
                expandChild.style.height = (height + 10) + 'px';

                expand.scrollLeft = width + 10;
                expand.scrollTop = height + 10;

                shrink.scrollLeft = width + 10;
                shrink.scrollTop = height + 10;
            };

            var reset = function() {
                // Check if element is hidden
                if (initialHiddenCheck) {
                    var invisible = element.offsetWidth === 0 && element.offsetHeight === 0;
                    if (invisible) {
                        // Check in next frame
                        if (!lastAnimationFrame){
                            lastAnimationFrame = requestAnimationFrame(function(){
                                lastAnimationFrame = 0;

                                reset();
                            });
                        }

                        return;
                    } else {
                        // Stop checking
                        initialHiddenCheck = false;
                    }
                }

                resetExpandShrink();
            };
            element.resizeSensor.resetSensor = reset;

            var onResized = function() {
                rafId = 0;

                if (!dirty) return;

                lastWidth = size.width;
                lastHeight = size.height;

                if (element.resizedAttached) {
                    element.resizedAttached.call(size);
                }
            };

            var onScroll = function() {
                size = getElementSize(element);
                dirty = size.width !== lastWidth || size.height !== lastHeight;

                if (dirty && !rafId) {
                    rafId = requestAnimationFrame(onResized);
                }

                reset();
            };

            var addEvent = function(el, name, cb) {
                if (el.attachEvent) {
                    el.attachEvent('on' + name, cb);
                } else {
                    el.addEventListener(name, cb);
                }
            };

            addEvent(expand, 'scroll', onScroll);
            addEvent(shrink, 'scroll', onScroll);

            // Fix for custom Elements
            requestAnimationFrame(reset);
        }

        forEachElement(element, function(elem){
            attachResizeEvent(elem, callback);
        });

        this.detach = function(ev) {
            ResizeSensor.detach(element, ev);
        };

        this.reset = function() {
            element.resizeSensor.resetSensor();
        };
    };

    ResizeSensor.reset = function(element) {
        forEachElement(element, function(elem){
            elem.resizeSensor.resetSensor();
        });
    };

    ResizeSensor.detach = function(element, ev) {
        forEachElement(element, function(elem){
            if (!elem) return;
            if(elem.resizedAttached && typeof ev === "function"){
                elem.resizedAttached.remove(ev);
                if(elem.resizedAttached.length()) return;
            }
            if (elem.resizeSensor) {
                if (elem.contains(elem.resizeSensor)) {
                    elem.removeChild(elem.resizeSensor);
                }
                delete elem.resizeSensor;
                delete elem.resizedAttached;
            }
        });
    };

    if (typeof MutationObserver !== "undefined") {
        var observer = new MutationObserver(function (mutations) {
            for (var i in mutations) {
                if (mutations.hasOwnProperty(i)) {
                    var items = mutations[i].addedNodes;
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].resizeSensor) {
                            ResizeSensor.reset(items[j]);
                        }
                    }
                }
            }
        });

        document.addEventListener("DOMContentLoaded", function (event) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }

    return ResizeSensor;

}));

},{}],"../../node_modules/css-element-queries/src/ElementQueries.js":[function(require,module,exports) {
var define;
'use strict';

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(['./ResizeSensor.js'], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require('./ResizeSensor.js'));
    } else {
        root.ElementQueries = factory(root.ResizeSensor);
        root.ElementQueries.listen();
    }
}(typeof window !== 'undefined' ? window : this, function (ResizeSensor) {

    /**
     *
     * @type {Function}
     * @constructor
     */
    var ElementQueries = function () {
        //<style> element with our dynamically created styles
        var cssStyleElement;

        //all rules found for element queries
        var allQueries = {};

        //association map to identify which selector belongs to a element from the animationstart event.
        var idToSelectorMapping = [];

        /**
         *
         * @param element
         * @returns {Number}
         */
        function getEmSize(element) {
            if (!element) {
                element = document.documentElement;
            }
            var fontSize = window.getComputedStyle(element, null).fontSize;
            return parseFloat(fontSize) || 16;
        }

        /**
         * Get element size
         * @param {HTMLElement} element
         * @returns {Object} {width, height}
         */
        function getElementSize(element) {
            if (!element.getBoundingClientRect) {
                return {
                    width: element.offsetWidth,
                    height: element.offsetHeight
                }
            }

            var rect = element.getBoundingClientRect();
            return {
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            }
        }

        /**
         *
         * @copyright https://github.com/Mr0grog/element-query/blob/master/LICENSE
         *
         * @param {HTMLElement} element
         * @param {*} value
         * @returns {*}
         */
        function convertToPx(element, value) {
            var numbers = value.split(/\d/);
            var units = numbers[numbers.length - 1];
            value = parseFloat(value);
            switch (units) {
                case "px":
                    return value;
                case "em":
                    return value * getEmSize(element);
                case "rem":
                    return value * getEmSize();
                // Viewport units!
                // According to http://quirksmode.org/mobile/tableViewport.html
                // documentElement.clientWidth/Height gets us the most reliable info
                case "vw":
                    return value * document.documentElement.clientWidth / 100;
                case "vh":
                    return value * document.documentElement.clientHeight / 100;
                case "vmin":
                case "vmax":
                    var vw = document.documentElement.clientWidth / 100;
                    var vh = document.documentElement.clientHeight / 100;
                    var chooser = Math[units === "vmin" ? "min" : "max"];
                    return value * chooser(vw, vh);
                default:
                    return value;
                // for now, not supporting physical units (since they are just a set number of px)
                // or ex/ch (getting accurate measurements is hard)
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {String} id
         * @constructor
         */
        function SetupInformation(element, id) {
            this.element = element;
            var key, option, elementSize, value, actualValue, attrValues, attrValue, attrName;

            var attributes = ['min-width', 'min-height', 'max-width', 'max-height'];

            /**
             * Extracts the computed width/height and sets to min/max- attribute.
             */
            this.call = function () {
                // extract current dimensions
                elementSize = getElementSize(this.element);

                attrValues = {};

                for (key in allQueries[id]) {
                    if (!allQueries[id].hasOwnProperty(key)) {
                        continue;
                    }
                    option = allQueries[id][key];

                    value = convertToPx(this.element, option.value);

                    actualValue = option.property === 'width' ? elementSize.width : elementSize.height;
                    attrName = option.mode + '-' + option.property;
                    attrValue = '';

                    if (option.mode === 'min' && actualValue >= value) {
                        attrValue += option.value;
                    }

                    if (option.mode === 'max' && actualValue <= value) {
                        attrValue += option.value;
                    }

                    if (!attrValues[attrName]) attrValues[attrName] = '';
                    if (attrValue && -1 === (' ' + attrValues[attrName] + ' ').indexOf(' ' + attrValue + ' ')) {
                        attrValues[attrName] += ' ' + attrValue;
                    }
                }

                for (var k in attributes) {
                    if (!attributes.hasOwnProperty(k)) continue;

                    if (attrValues[attributes[k]]) {
                        this.element.setAttribute(attributes[k], attrValues[attributes[k]].substr(1));
                    } else {
                        this.element.removeAttribute(attributes[k]);
                    }
                }
            };
        }

        /**
         * @param {HTMLElement} element
         * @param {Object}      id
         */
        function setupElement(element, id) {
            if (!element.elementQueriesSetupInformation) {
                element.elementQueriesSetupInformation = new SetupInformation(element, id);
            }

            if (!element.elementQueriesSensor) {
                element.elementQueriesSensor = new ResizeSensor(element, function () {
                    element.elementQueriesSetupInformation.call();
                });
            }
        }

        /**
         * Stores rules to the selector that should be applied once resized.
         *
         * @param {String} selector
         * @param {String} mode min|max
         * @param {String} property width|height
         * @param {String} value
         */
        function queueQuery(selector, mode, property, value) {
            if (typeof(allQueries[selector]) === 'undefined') {
                allQueries[selector] = [];
                // add animation to trigger animationstart event, so we know exactly when a element appears in the DOM

                var id = idToSelectorMapping.length;
                cssStyleElement.innerHTML += '\n' + selector + ' {animation: 0.1s element-queries;}';
                cssStyleElement.innerHTML += '\n' + selector + ' > .resize-sensor {min-width: '+id+'px;}';
                idToSelectorMapping.push(selector);
            }

            allQueries[selector].push({
                mode: mode,
                property: property,
                value: value
            });
        }

        function getQuery(container) {
            var query;
            if (document.querySelectorAll) query = (container) ? container.querySelectorAll.bind(container) : document.querySelectorAll.bind(document);
            if (!query && 'undefined' !== typeof $$) query = $$;
            if (!query && 'undefined' !== typeof jQuery) query = jQuery;

            if (!query) {
                throw 'No document.querySelectorAll, jQuery or Mootools\'s $$ found.';
            }

            return query;
        }

        /**
         * If animationStart didn't catch a new element in the DOM, we can manually search for it
         */
        function findElementQueriesElements(container) {
            var query = getQuery(container);

            for (var selector in allQueries) if (allQueries.hasOwnProperty(selector)) {
                // find all elements based on the extract query selector from the element query rule
                var elements = query(selector, container);

                for (var i = 0, j = elements.length; i < j; i++) {
                    setupElement(elements[i], selector);
                }
            }
        }

        /**
         *
         * @param {HTMLElement} element
         */
        function attachResponsiveImage(element) {
            var children = [];
            var rules = [];
            var sources = [];
            var defaultImageId = 0;
            var lastActiveImage = -1;
            var loadedImages = [];

            for (var i in element.children) {
                if (!element.children.hasOwnProperty(i)) continue;

                if (element.children[i].tagName && element.children[i].tagName.toLowerCase() === 'img') {
                    children.push(element.children[i]);

                    var minWidth = element.children[i].getAttribute('min-width') || element.children[i].getAttribute('data-min-width');
                    //var minHeight = element.children[i].getAttribute('min-height') || element.children[i].getAttribute('data-min-height');
                    var src = element.children[i].getAttribute('data-src') || element.children[i].getAttribute('url');

                    sources.push(src);

                    var rule = {
                        minWidth: minWidth
                    };

                    rules.push(rule);

                    if (!minWidth) {
                        defaultImageId = children.length - 1;
                        element.children[i].style.display = 'block';
                    } else {
                        element.children[i].style.display = 'none';
                    }
                }
            }

            lastActiveImage = defaultImageId;

            function check() {
                var imageToDisplay = false, i;

                for (i in children) {
                    if (!children.hasOwnProperty(i)) continue;

                    if (rules[i].minWidth) {
                        if (element.offsetWidth > rules[i].minWidth) {
                            imageToDisplay = i;
                        }
                    }
                }

                if (!imageToDisplay) {
                    //no rule matched, show default
                    imageToDisplay = defaultImageId;
                }

                if (lastActiveImage !== imageToDisplay) {
                    //image change

                    if (!loadedImages[imageToDisplay]) {
                        //image has not been loaded yet, we need to load the image first in memory to prevent flash of
                        //no content

                        var image = new Image();
                        image.onload = function () {
                            children[imageToDisplay].src = sources[imageToDisplay];

                            children[lastActiveImage].style.display = 'none';
                            children[imageToDisplay].style.display = 'block';

                            loadedImages[imageToDisplay] = true;

                            lastActiveImage = imageToDisplay;
                        };

                        image.src = sources[imageToDisplay];
                    } else {
                        children[lastActiveImage].style.display = 'none';
                        children[imageToDisplay].style.display = 'block';
                        lastActiveImage = imageToDisplay;
                    }
                } else {
                    //make sure for initial check call the .src is set correctly
                    children[imageToDisplay].src = sources[imageToDisplay];
                }
            }

            element.resizeSensorInstance = new ResizeSensor(element, check);
            check();
        }

        function findResponsiveImages() {
            var query = getQuery();

            var elements = query('[data-responsive-image],[responsive-image]');
            for (var i = 0, j = elements.length; i < j; i++) {
                attachResponsiveImage(elements[i]);
            }
        }

        var regex = /,?[\s\t]*([^,\n]*?)((?:\[[\s\t]*?(?:min|max)-(?:width|height)[\s\t]*?[~$\^]?=[\s\t]*?"[^"]*?"[\s\t]*?])+)([^,\n\s\{]*)/mgi;
        var attrRegex = /\[[\s\t]*?(min|max)-(width|height)[\s\t]*?[~$\^]?=[\s\t]*?"([^"]*?)"[\s\t]*?]/mgi;

        /**
         * @param {String} css
         */
        function extractQuery(css) {
            var match, smatch, attrs, attrMatch;

            css = css.replace(/'/g, '"');
            while (null !== (match = regex.exec(css))) {
                smatch = match[1] + match[3];
                attrs = match[2];

                while (null !== (attrMatch = attrRegex.exec(attrs))) {
                    queueQuery(smatch, attrMatch[1], attrMatch[2], attrMatch[3]);
                }
            }
        }

        /**
         * @param {CssRule[]|String} rules
         */
        function readRules(rules) {
            var selector = '';

            if (!rules) {
                return;
            }

            if ('string' === typeof rules) {
                rules = rules.toLowerCase();
                if (-1 !== rules.indexOf('min-width') || -1 !== rules.indexOf('max-width')) {
                    extractQuery(rules);
                }
            } else {
                for (var i = 0, j = rules.length; i < j; i++) {
                    if (1 === rules[i].type) {
                        selector = rules[i].selectorText || rules[i].cssText;
                        if (-1 !== selector.indexOf('min-height') || -1 !== selector.indexOf('max-height')) {
                            extractQuery(selector);
                        } else if (-1 !== selector.indexOf('min-width') || -1 !== selector.indexOf('max-width')) {
                            extractQuery(selector);
                        }
                    } else if (4 === rules[i].type) {
                        readRules(rules[i].cssRules || rules[i].rules);
                    } else if (3 === rules[i].type) {
                        if(rules[i].styleSheet.hasOwnProperty("cssRules")) {
                            readRules(rules[i].styleSheet.cssRules);
                        }
                    }
                }
            }
        }

        var defaultCssInjected = false;

        /**
         * Searches all css rules and setups the event listener to all elements with element query rules..
         */
        this.init = function () {
            var animationStart = 'animationstart';
            if (typeof document.documentElement.style['webkitAnimationName'] !== 'undefined') {
                animationStart = 'webkitAnimationStart';
            } else if (typeof document.documentElement.style['MozAnimationName'] !== 'undefined') {
                animationStart = 'mozanimationstart';
            } else if (typeof document.documentElement.style['OAnimationName'] !== 'undefined') {
                animationStart = 'oanimationstart';
            }

            document.body.addEventListener(animationStart, function (e) {
                var element = e.target;
                var styles = element && window.getComputedStyle(element, null);
                var animationName = styles && styles.getPropertyValue('animation-name');
                var requiresSetup = animationName && (-1 !== animationName.indexOf('element-queries'));

                if (requiresSetup) {
                    element.elementQueriesSensor = new ResizeSensor(element, function () {
                        if (element.elementQueriesSetupInformation) {
                            element.elementQueriesSetupInformation.call();
                        }
                    });

                    var sensorStyles = window.getComputedStyle(element.resizeSensor, null);
                    var id = sensorStyles.getPropertyValue('min-width');
                    id = parseInt(id.replace('px', ''));
                    setupElement(e.target, idToSelectorMapping[id]);
                }
            });

            if (!defaultCssInjected) {
                cssStyleElement = document.createElement('style');
                cssStyleElement.type = 'text/css';
                cssStyleElement.innerHTML = '[responsive-image] > img, [data-responsive-image] {overflow: hidden; padding: 0; } [responsive-image] > img, [data-responsive-image] > img {width: 100%;}';

                //safari wants at least one rule in keyframes to start working
                cssStyleElement.innerHTML += '\n@keyframes element-queries { 0% { visibility: inherit; } }';
                document.getElementsByTagName('head')[0].appendChild(cssStyleElement);
                defaultCssInjected = true;
            }

            for (var i = 0, j = document.styleSheets.length; i < j; i++) {
                try {
                    if (document.styleSheets[i].href && 0 === document.styleSheets[i].href.indexOf('file://')) {
                        console.warn("CssElementQueries: unable to parse local css files, " + document.styleSheets[i].href);
                    }

                    readRules(document.styleSheets[i].cssRules || document.styleSheets[i].rules || document.styleSheets[i].cssText);
                } catch (e) {
                }
            }

            findResponsiveImages();
        };

        /**
         * Go through all collected rules (readRules()) and attach the resize-listener.
         * Not necessary to call it manually, since we detect automatically when new elements
         * are available in the DOM. However, sometimes handy for dirty DOM modifications.
         *
         * @param {HTMLElement} container only elements of the container are considered (document.body if not set)
         */
        this.findElementQueriesElements = function (container) {
            findElementQueriesElements(container);
        };

        this.update = function () {
            this.init();
        };
    };

    ElementQueries.update = function () {
        ElementQueries.instance.update();
    };

    /**
     * Removes all sensor and elementquery information from the element.
     *
     * @param {HTMLElement} element
     */
    ElementQueries.detach = function (element) {
        if (element.elementQueriesSetupInformation) {
            //element queries
            element.elementQueriesSensor.detach();
            delete element.elementQueriesSetupInformation;
            delete element.elementQueriesSensor;

        } else if (element.resizeSensorInstance) {
            //responsive image

            element.resizeSensorInstance.detach();
            delete element.resizeSensorInstance;
        }
    };

    ElementQueries.init = function () {
        if (!ElementQueries.instance) {
            ElementQueries.instance = new ElementQueries();
        }

        ElementQueries.instance.init();
    };

    var domLoaded = function (callback) {
        /* Mozilla, Chrome, Opera */
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', callback, false);
        }
        /* Safari, iCab, Konqueror */
        else if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
            var DOMLoadTimer = setInterval(function () {
                if (/loaded|complete/i.test(document.readyState)) {
                    callback();
                    clearInterval(DOMLoadTimer);
                }
            }, 10);
        }
        /* Other web browsers */
        else window.onload = callback;
    };

    ElementQueries.findElementQueriesElements = function (container) {
        ElementQueries.instance.findElementQueriesElements(container);
    };

    ElementQueries.listen = function () {
        domLoaded(ElementQueries.init);
    };

    return ElementQueries;

}));

},{"./ResizeSensor.js":"../../node_modules/css-element-queries/src/ResizeSensor.js"}],"../scripts/index.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils");

var _modals2 = _interopRequireDefault(require("./modals"));

var _setInputState = _interopRequireDefault(require("./set-input-state"));

var _phoneMask = _interopRequireDefault(require("./phone-mask"));

var _smoothScrollToAnchor = _interopRequireDefault(require("./smooth-scroll-to-anchor"));

var _sertificatPreviev = _interopRequireDefault(require("./sertificatPreviev"));

var _indicateTouchDevices = _interopRequireDefault(require("./indicate-touch-devices"));

var _indicateMobileDevices = _interopRequireDefault(require("./indicate-mobile-devices"));

var _indicateMobileAndTabletDevices = _interopRequireDefault(require("./indicate-mobile-and-tablet-devices"));

var _keyboardUsingState = _interopRequireDefault(require("./keyboard-using-state"));

var _micromodal = _interopRequireDefault(require("micromodal"));

var _ElementQueries = _interopRequireDefault(require("css-element-queries/src/ElementQueries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.MicroModal = _micromodal.default; // import initSmoothScrollToAnchor from "./smooth-scroll-to-anchor";

var KEY_CODE_TAB = 9;
var KEY_CODE_ARROW_LEFT = 37;
var KEY_CODE_ARROW_RIGHT = 39;
var KEY_CODE_ARROW_UP = 38;
var KEY_CODE_ARROW_DOWN = 40;
var KEY_CODE_LIST = [KEY_CODE_TAB, KEY_CODE_ARROW_LEFT, KEY_CODE_ARROW_RIGHT, KEY_CODE_ARROW_UP, KEY_CODE_ARROW_DOWN];
var ARROWS_KEY_CODE_LIST = [KEY_CODE_ARROW_LEFT, KEY_CODE_ARROW_RIGHT, KEY_CODE_ARROW_UP, KEY_CODE_ARROW_DOWN];
(0, _utils.ready)(function () {
  (0, _utils.polyfils)();
  (0, _smoothScrollToAnchor.default)();
  (0, _indicateTouchDevices.default)('body');
  (0, _indicateMobileDevices.default)('body');
  (0, _indicateMobileAndTabletDevices.default)('body');

  _ElementQueries.default.init();

  var _modals = new _modals2.default({});

  window.openDialog = _modals.openDialog;
  new _setInputState.default({
    inputHolderSelector: '.js-input',
    filledClass: 'input--isFilled',
    focudedClass: 'input--isFocused'
  });
  new _sertificatPreviev.default({
    holderSelector: ".js-sertificatToogler",
    previewSelector: ".js-sertificatPreview"
  });
  (0, _phoneMask.default)({
    inputSelector: '.js-phone-input'
  });
  new _keyboardUsingState.default({
    listenerSelector: null,
    targetSelector: 'body',
    keyCodes: KEY_CODE_LIST,
    keyUsingClass: 'isKeyboardUsing'
  });
  new _keyboardUsingState.default({
    listenerSelector: null,
    targetSelector: 'body',
    keyCodes: ARROWS_KEY_CODE_LIST,
    keyUsingClass: 'isArrowsUsing'
  });
  new _keyboardUsingState.default({
    listenerSelector: null,
    targetSelector: 'body',
    keyCodes: KEY_CODE_TAB,
    keyUsingClass: 'isTabUsing'
  });
  $(".videoBanner").fitVids();
});
},{"./utils":"../scripts/utils/index.js","./modals":"../scripts/modals.js","./set-input-state":"../scripts/set-input-state.js","./phone-mask":"../scripts/phone-mask.js","./smooth-scroll-to-anchor":"../scripts/smooth-scroll-to-anchor.js","./sertificatPreviev":"../scripts/sertificatPreviev.js","./indicate-touch-devices":"../scripts/indicate-touch-devices.js","./indicate-mobile-devices":"../scripts/indicate-mobile-devices.js","./indicate-mobile-and-tablet-devices":"../scripts/indicate-mobile-and-tablet-devices.js","./keyboard-using-state":"../scripts/keyboard-using-state.js","micromodal":"../../node_modules/micromodal/dist/micromodal.es.js","css-element-queries/src/ElementQueries":"../../node_modules/css-element-queries/src/ElementQueries.js"}],"../../../../Users/Admin/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57460" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../Users/Admin/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../scripts/index.js"], null)
//# sourceMappingURL=/scripts.3cddadf4.js.map