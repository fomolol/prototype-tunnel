/**
 * @file UnsupportedBrowser.js
 */
import * as React from 'react'
import PropTypes from 'prop-types'

import styles from './UnsupportedBrowser.module.css'

const UnsupportedBrowser = (props) => {
  const { tagName: Tag, className, variant, children } = props

  return (
    <Tag
      className={`${styles.unsupported_browser} ${
        styles[`unsupported_browser__${variant}`]
      } ${className}`}
    >
      <p className="text-center text-white uppercase text-40">
        Your browser is unsupported
      </p>
      {children}
    </Tag>
  )
}

UnsupportedBrowser.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

UnsupportedBrowser.defaultProps = {
  tagName: 'div',
  className: 'flex justify-center items-center bg-black w-screen z-50 h-screen',
  variant: 'default',
  children: '',
}

export default UnsupportedBrowser
