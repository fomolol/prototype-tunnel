/**
 * @file useFocus
 */
import * as React from 'react';
import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';

export const useFocus = (onFocus = () => {}, onBlur = () => {}) => {
  const [focused, setFocused] = React.useState(true);

  const onFocusHandler = React.useCallback(() => {
    onFocus();
    setFocused(true);
  }, [onFocus]);

  const onBlurHandler = React.useCallback(() => {
    onBlur();
    setFocused(false);
  }, [onBlur]);

  useLayoutEffect(() => {
    window.addEventListener('focus', onFocusHandler);
    window.addEventListener('blur', onBlurHandler);

    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus', onFocusHandler);
      window.removeEventListener('blur', onBlurHandler);
    };
  }, []);

  return { focused };
};
