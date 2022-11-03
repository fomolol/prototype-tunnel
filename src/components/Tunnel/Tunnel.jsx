/**
 * @file Tunnel.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './Tunnel.module.css';

import Model from './TunnelGLTF';

const Tunnel = ({
  tagName: Tag = 'div',
  className = '',
  variant = 'default',
  children = '',
}) => {
  return <Model />;
};

Tunnel.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default Tunnel;
