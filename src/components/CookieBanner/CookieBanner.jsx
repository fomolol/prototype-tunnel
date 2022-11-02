/**
 * @file CookieBanner.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/store';
import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';

import styles from './CookieBanner.module.css';

const CookieBanner = ({
  tagName: Tag = motion.div,
  className = '',
  visible = true,
  variant = 'default',
  onClick = () => console.log('clicked'),
  children = 'Do fugiat enim dolore culpa ea excepteur ut esse dolor laborum deserunt amet sint pariatur. Ex minim eiusmod ad esse veniam magna labore deserunt Lorem. Excepteur cupidatat et consequat sint ipsum pariatur duis.',
}) => {
  const [accepted, setAccepted] = React.useState(false);
  const {
    setCursorStyle,
    setCursorColor,
    setCookieAccepted,
    themeColor,
    cookieAcceptKey,
  } = useStore();
  const prevThemeColor = React.useRef(themeColor);
  const baseClassName =
    'fixed flex items-center justify-center w-full transition duration-500 ease-in-out z-hud bottom-12 hover:drop-shadow-md';

  const onClickHandler = e => {
    setCookieAccepted(true);
    onClick();
    window.localStorage.setItem(cookieAcceptKey, true);
  };

  useLayoutEffect(() => {
    // Check to see if cookies were accepted
    const acceptedCookies = window.localStorage.getItem(cookieAcceptKey);
    if (acceptedCookies !== null) {
      // NOTE: We need to actually store this information somewhere.
      setAccepted(true);
    } else {
      setAccepted(false);
    }
  }, [visible, cookieAcceptKey]);

  return (
    <AnimatePresence>
      {visible && !accepted ? (
        <Tag
          className={`${styles.cookie_banner} ${
            styles[`cookie_banner__${variant}`]
          } ${baseClassName} ${className}`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onPointerOver={() => {
            setCursorStyle('hover');
            setCursorColor('light');
          }}
          onPointerOut={() => {
            setCursorStyle('default');
            setCursorColor(prevThemeColor.current);
          }}
        >
          <div className="flex h-auto w-[90%] items-center rounded-bl-2xl rounded-tr-2xl bg-white p-4 leading-snug md:w-1/2 md:p-8">
            <p className="max-w-[70%] text-[9px] md:max-w-[85%] md:text-[13px]">
              {children}
            </p>
            <button
              onClick={onClickHandler}
              onPointerOver={() => {
                setCursorColor('dark');
              }}
              onPointerOut={() => {
                setCursorColor(prevThemeColor.current);
              }}
              className="ml-auto h-[50px] rounded-full bg-purple-brand-light px-8 text-[12px] uppercase text-white transition duration-500 ease-in-out hover:bg-purple-brand-dark hover:text-white"
            >
              Ok
            </button>
          </div>
        </Tag>
      ) : null}
    </AnimatePresence>
  );
};

CookieBanner.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default CookieBanner;
