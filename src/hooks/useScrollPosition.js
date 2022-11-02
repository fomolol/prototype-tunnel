/**
 * useScrollPosition
 * @see https://designcode.io/react-hooks-handbook-usescrollposition-hook
 * @returns
 */
import * as React from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};
