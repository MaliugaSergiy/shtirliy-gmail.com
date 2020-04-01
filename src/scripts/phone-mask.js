import maskInput from 'vanilla-text-mask';
const mask = [
  '+',
  /\d/,
  ' ',
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/
];

const initialValue = '+7 (';

export default function initPhoneMaskSetter({ inputSelector }) {
  const _inputElement = document.querySelector(inputSelector);

  if (!_inputElement) {
    return;
  }

  const inputElements = Array.from(document.querySelectorAll(inputSelector));

  inputElements.forEach(inputElement => new PhoneMaskSetter({ inputElement }));
}

class PhoneMaskSetter {
  _props = null;
  _inputNode = null;

  constructor(props) {
    this._props = {
      ...props
    };
    const { inputElement } = this._props;

    inputElement.addEventListener('focus', this.handleFocus);
    inputElement.addEventListener('blur', this.handleBlur);

    maskInput({
      inputElement,
      mask,
      guide: false
    });
  }

  handleFocus = () => {
    const { inputElement } = this._props;
    if (!inputElement.value) {
      inputElement.value = initialValue;
    }
  };

  handleBlur = () => {
    // const { inputElement } = this._props;
    // if (inputElement.value === initialValue) {
    //   inputElement.value = "";
    // }
  };
}
