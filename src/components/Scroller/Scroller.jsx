/**
 * @file Scroller.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';

import styles from './Scroller.module.css';

import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';
import { useStore } from '@/store';

const Scroller = ({
  tagName: Tag = motion.div,
  className = 'h-screen min-w-full z-content',
  variant = 'default',
  children = '',
  damping = 15,
  mass = 0.15,
  stiffness = 25,
  disable = false,
  ...rest
}) => {
  const { scrollerEnabled } = useStore();
  // scroll container
  const scrollRef = React.useRef(null);

  // page scrollable height based on content length
  const [pageHeight, setPageHeight] = React.useState(0);

  // update scrollable height when browser is resizing
  const resizePageHeight = React.useCallback(entries => {
    for (let entry of entries) {
      setPageHeight(entry.contentRect.height);
    }
  }, []);

  // observe when browser is resizing
  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      resizePageHeight(entries);
    });
    scrollRef && resizeObserver.observe(scrollRef.current);
    return () => resizeObserver.disconnect();
  }, [scrollRef, resizePageHeight]);

  const { scrollY } = useScroll(); // measures how many pixels user has scrolled vertically
  // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
  // ... based on current scroll position to translateY the document in a natural way
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
  const physics = { damping, mass, stiffness }; // easing of smooth scroll
  const spring = useSpring(transform, physics); // apply easing to the negative scroll value

  return (
    <>
      <Tag
        className={`${styles.scroller} ${
          styles[`scroller__${variant}`]
        } ${className} scroll-container pointer-events-auto`}
        ref={scrollRef}
        style={{ y: spring }} // translateY of scroll container using negative scroll value
        {...rest}
      >
        {children}
      </Tag>
      {/* blank div that has a dynamic height based on the content's inherent height */}
      {/* this is neccessary to allow the scroll container to scroll... */}
      {/* ... using the browser's native scroll bar */}
      {pageHeight ? (
        <div
          className="pointer-events-none"
          style={
            disable || !scrollerEnabled
              ? { height: '0px' }
              : { height: `${pageHeight}px` }
          }
        />
      ) : null}
    </>
  );
};

Scroller.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default Scroller;
