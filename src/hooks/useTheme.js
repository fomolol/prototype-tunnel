/**
 * useTheme hook
 */
import * as React from 'react';
import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';

export const useTheme = () => {
  const toggle = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    // if set via local storage previously
    if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []);

  const getTheme = React.useCallback(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
  }, []);

  useLayoutEffect(() => {
    // if set via local storage previously
    if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    }
  }, [toggle]);

  return { toggle, getTheme };
};
