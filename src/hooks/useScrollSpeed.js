import React from 'react';
import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';
import { singletonHook } from 'react-singleton-hook';

/**
 * checkScrollSpeed
 * @see https://stackoverflow.com/questions/22593286/detect-measure-scroll-speed
 * @param {object} settings
 * @return {number} is the delta scroll amount
 */
export const checkScrollSpeed = (settings => {
  settings = settings || {};

  var lastPos,
    newPos,
    timer,
    delta,
    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();

  return () => {
    newPos = window.scrollY;
    if (lastPos != null) {
      // && newPos < maxScroll
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);

    return delta;
  };
})();

const initState = 0;
const useScrollSpeedImpl = () => {
  const [speed, setSpeed] = React.useState(initState);

  React.useEffect(() => {
    const onScroll = e => {
      const delta = checkScrollSpeed();
      setSpeed(delta);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    // Reset to zero
    const timer = setTimeout(() => setSpeed(0), 1000);
    return () => clearTimeout(timer);
  }, [speed]);

  return speed;
};

export const useScrollSpeed = singletonHook(initState, useScrollSpeedImpl);
