import { addClass, getIsMobileDevice } from './utils';
const MOBILE_DEVICES_CLASS_NAME = 'is-mobile-device';
const NO_MOBILE_DEVICES_CLASS_NAME = 'is-not-mobile-device';

export default function indicateMobileDevices(targetSelector) {
  const target = targetSelector
    ? document.querySelector(targetSelector)
    : document.documentElement;

  if (getIsMobileDevice()) {
    addClass(target, MOBILE_DEVICES_CLASS_NAME);
  } else {
    addClass(target, NO_MOBILE_DEVICES_CLASS_NAME);
  }
}
