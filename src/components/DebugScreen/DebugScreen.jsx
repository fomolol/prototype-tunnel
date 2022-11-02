/**
 * @file DebugScreen.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './DebugScreen.module.css';

const DebugScreen = ({
  tagName: Tag = 'div',
  className = 'fixed px-4 py-2 font-mono text-sm tracking-wide text-black backdrop-blur-lg bg-white/70 rounded-2xl top-2 right-2',
  variant = 'default',
}) => {
  return (
    <Tag
      className={`${styles.debug_screen} ${
        styles[`debug_screen__${variant}`]
      } ${className}`}
    >
      <p className="block md:hidden">sm</p>
      <p className="hidden md:block">md</p>
      <p className="hidden lg:block">lg</p>
      <p className="hidden xl:block">xl</p>
    </Tag>
  );
};

DebugScreen.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default DebugScreen;
