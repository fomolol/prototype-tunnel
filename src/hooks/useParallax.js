import { useTransform } from 'framer-motion';

/**
 * useParallax
 * @see https://codesandbox.io/s/framer-motion-parallax-i9gwuc?from-embed=&file=/src/App.tsx:214-345
 * @param {*} value
 * @param {*} distance
 * @returns
 */
export const useParallax = (value, distance) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};
