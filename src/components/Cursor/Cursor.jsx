/**
 * @file Cursor.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { isSafari } from 'react-device-detect';

import styles from './Cursor.module.css';

import { useStore } from '@/store';

const Cursor = ({
  tagName: Tag = 'div',
  className = 'hidden pointer-events-none md:block',
  variant = 'default',
  children = '',
}) => {
  const outside = React.useRef();
  const inside = React.useRef();
  const [down, setDown] = React.useState(false);
  const {
    cursorStyle,
    setCursorColor,
    cursorColor,
    audioState,
    navOpen,
    themeColor,
  } = useStore();
  let cursorStyles =
    'h-[50px] w-[50px] translate-x-[calc(-50% + 15px)] translate-y-[-50%] rounded-full';

  React.useEffect(() => {
    setCursorColor(themeColor);
  }, [themeColor]);

  React.useEffect(() => {
    const mouseMoveOutside = e => {
      if (outside.current) {
        var x = e.clientX;
        var y = e.clientY;
        outside.current.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
      }
    };
    const mouseMoveInside = e => {
      if (inside.current) {
        var x = e.clientX;
        var y = e.clientY;
        inside.current.style.left = x + 'px';
        inside.current.style.top = y + 'px';
      }
    };
    const mouseDown = e => {
      setDown(true);
    };
    const mouseUp = e => {
      setDown(false);
    };

    document.addEventListener('mousemove', mouseMoveOutside);
    document.addEventListener('mousemove', mouseMoveInside);
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);

    return () => {
      document.removeEventListener('mousemove', mouseMoveOutside);
      document.removeEventListener('mousemove', mouseMoveInside);
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  switch (cursorStyle) {
    case 'normal':
      break;
    case 'default':
      break;
    case 'hover':
      cursorStyles =
        'h-[42px] w-[42px] translate-x-[calc(-50% + 15px)] translate-y-[-50%] rounded-full';
      break;
    default:
      break;
  }

  return (
    <Tag
      className={`${styles.cursor} ${
        styles[`cursor__${variant}`]
      } ${className}`}
    >
      <div
        ref={outside}
        className={`${
          down ? 'border-purple-brand-dark' : 'border-current'
        } ${cursorStyles}  ouside pointer-events-none fixed left-0 top-0 transform border ${
          isSafari ? '' : 'transition-all duration-500 ease-out'
        } ${navOpen ? 'z-infinity' : 'z-cursor'} ${
          cursorColor === 'dark' || themeColor === 'dark'
            ? 'text-white'
            : 'text-black'
        }`}
      ></div>
      <div
        ref={inside}
        className={`${
          down || cursorStyle === 'hover'
            ? 'h-[12px] w-[12px] rounded-full bg-current'
            : 'h-[4px] w-[4px] rounded-full bg-current'
        } inside pointer-events-none fixed translate-x-[-50%] translate-y-[-50%] transform ${
          navOpen ? 'z-infinity' : 'z-cursor'
        } ${
          cursorColor === 'dark' || themeColor === 'dark'
            ? 'text-white'
            : 'text-black'
        }`}
      ></div>
      <style jsx>{`
        .hover {
          opacity: 0.5;
        }

        .inside {
          transition: width 0.3s, height 0.3s, opacity 0.3s;
        }
      `}</style>
    </Tag>
  );
};

Cursor.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default Cursor;
