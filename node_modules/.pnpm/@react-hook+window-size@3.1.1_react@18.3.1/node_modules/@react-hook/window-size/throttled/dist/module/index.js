/* eslint-disable import/no-extraneous-dependencies */
import { useThrottle } from '@react-hook/throttle';
import useEvent from '@react-hook/event';
const emptyObj = {};
const win = typeof window === 'undefined' ? null : window;
const wv = win && typeof win.visualViewport !== 'undefined' ? win.visualViewport : null;

const getSize = () => [document.documentElement.clientWidth, document.documentElement.clientHeight];

export const useWindowSize = function (options) {
  if (options === void 0) {
    options = emptyObj;
  }

  const {
    fps,
    leading,
    initialWidth = 0,
    initialHeight = 0
  } = options;
  const [size, setThrottledSize] = useThrottle(
  /* istanbul ignore next */
  typeof document === 'undefined' ? [initialWidth, initialHeight] : getSize, fps, leading);

  const setSize = () => setThrottledSize(getSize);

  useEvent(win, 'resize', setSize); // @ts-expect-error

  useEvent(wv, 'resize', setSize);
  useEvent(win, 'orientationchange', setSize);
  return size;
};
export const useWindowHeight = options => useWindowSize(options)[1];
export const useWindowWidth = options => useWindowSize(options)[0];