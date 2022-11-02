/**
 * @file useTargetWidth
 */
import * as React from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';

export const useTargetWidth = (minWidth = 940) => {
  const [isTarget, set] = React.useState(false);
  const { width, height } = useWindowSize();

  // Mobile check hack
  React.useEffect(() => {
    if (width >= minWidth) {
      set(true);
    } else {
      set(false);
    }
  }, [minWidth, width, height]);

  return isTarget;
};
