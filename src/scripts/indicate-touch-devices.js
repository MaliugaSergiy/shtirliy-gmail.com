import { addClass, getIsTouchDevice } from './utils';
const TOUCH_DEVICES_CLASS_NAME = 'is-touch-device';
const NO_TOUCH_DEVICES_CLASS_NAME = 'is-not-touch-device';

export default function indicateMobileDevices(targetSelector) {
  const target = targetSelector
    ? document.querySelector(targetSelector)
    : document.documentElement;

  if (getIsTouchDevice()) {
    addClass(target, TOUCH_DEVICES_CLASS_NAME);
  } else {
    addClass(target, NO_TOUCH_DEVICES_CLASS_NAME);
  }
}
