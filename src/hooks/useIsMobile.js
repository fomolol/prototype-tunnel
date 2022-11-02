import * as React from 'react';
import { singletonHook } from 'react-singleton-hook';

const init = false;

let maxWidth = 940;

const useIsMobileImpl = () => {
  const [isMobile, set] = React.useState(false);

  // Mobile check hack
  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      var width = window.innerWidth;
      // var height = window.innerHeight;
      if (width < maxWidth) {
        set(true);
      } else {
        set(false);
      }
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export const useIsMobile = singletonHook(init, useIsMobileImpl);
