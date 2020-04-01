// document.addEventListener('DOMContentLoaded', () => {
//   new SetInputState({
//     inputHolderSelector: '.js-input',
//     filledClass: 'input--isFilled',
//     focudedClass: 'input--isFocused'
//   });
// });

class SetInputState {
  _props = null;

  constructor(props) {
    this._props = props;

    const {
      inputHolderSelector
    } = this._props;

    const inputHolders = Array.from(document.querySelectorAll(inputHolderSelector));
    inputHolders.forEach(element => {
      let inputField = element.querySelector('input, textarea');

      inputField.addEventListener('focus', this.handleFocusInput(element, inputField));
      inputField.addEventListener('blur', this.handleBlurInput(element, inputField));
    });
  }

  handleFocusInput = inputHolder => () => {
    const {
      filledClass,
      focudedClass
    } = this._props;

    inputHolder.classList.add(filledClass);
    inputHolder.classList.add(focudedClass);
  };

  handleBlurInput = (inputHolder, inputField) => () => {
    const {
      filledClass,
      focudedClass
    } = this._props;

    inputHolder.classList.remove(focudedClass);

    if (!!inputField.value.trim()) {
      return;
    }

    inputField.value = '';
    inputHolder.classList.remove(filledClass);
  };
}

export default SetInputState;