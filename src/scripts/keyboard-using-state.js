// const KEY_CODE_TAB = 9;
// const KEY_CODE_ARROW_LEFT = 37;
// const KEY_CODE_ARROW_RIGHT = 39;
// const KEY_CODE_ARROW_UP = 38;
// const KEY_CODE_ARROW_DOWN = 40;

// const KEY_CODE_LIST = [KEY_CODE_TAB, KEY_CODE_ARROW_LEFT, KEY_CODE_ARROW_RIGHT, KEY_CODE_ARROW_UP, KEY_CODE_ARROW_DOWN];

// document.addEventListener('DOMContentLoaded', () => {
//   new KeyboardUsingState({ listenerSelector: null, targetSelector: '.page', keyCodes: KEY_CODE_LIST, keyUsingClass: 'isKeyboardUsing' });
// });

class KeyboardUsingState {
  _props = null;

  constructor(props) {
    this._props = props;
    this._target = null;

    const {
      listenerSelector,
      targetSelector
    } = this._props;

    const listenerNode = listenerSelector ? document.querySelector(listenerSelector) : window;

    this._target = targetSelector ? document.querySelector(targetSelector) : document.body;

    listenerNode.addEventListener('keydown', this.handleKeydown);
    listenerNode.addEventListener('mousedown', this.handleMousedown);
  }

  handleKeydown = e => {
    this.setUsingKeyboard(e.keyCode);
  };

  handleMousedown = e => {
    this.resetUsingKeyboard();
  };

  setUsingKeyboard(_keyCode) {
    let {
      keyCodes,
      keyUsingClass
    } = this._props;

    const isMultipleKeys = Array.isArray(keyCodes);

    if (!isMultipleKeys) {
      keyCodes = keyCodes.toString();
    }

    if (isMultipleKeys ? this.hasArrayElement(keyCodes, _keyCode) : this.isEqualStrings(keyCodes, _keyCode.toString())) {
      this._target.classList.add(keyUsingClass);
    } else {
      this.resetUsingKeyboard();
    }
  }

  resetUsingKeyboard() {
    const {
      keyUsingClass
    } = this._props;
    this._target.classList.remove(keyUsingClass);
  }

  hasArrayElement(array, element) {
    return array.indexOf(element) !== -1;
  }

  isEqualStrings(string_1, string_2) {
    return string_1 === string_2;
  }
}


export default KeyboardUsingState;