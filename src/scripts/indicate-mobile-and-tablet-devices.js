import { addClass, getIsMobileOrTabletDevice } from './utils';
const MOBILE_AND_TABLET_DEVICES_CLASS_NAME = 'is-mobile-or-device';
const NO_MOBILE_AND_TABLET_DEVICES_CLASS_NAME =
  'is-not-mobile-or-tablet-device';

export default function indicateMobileOrTabletDevices(targetSelector) {
  const target = targetSelector
    ? document.querySelector(targetSelector)
    : document.documentElement;

  if (getIsMobileOrTabletDevice()) {
    addClass(target, MOBILE_AND_TABLET_DEVICES_CLASS_NAME);
  } else {
    addClass(target, NO_MOBILE_AND_TABLET_DEVICES_CLASS_NAME);
  }
}
