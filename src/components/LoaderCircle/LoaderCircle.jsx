/**
 * @file LoaderCircle.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './LoaderCircle.module.css';

const LoaderCircle = ({
  tagName: Tag = motion.div,
  className = 'absolute text-sm h-[18em] w-auto flex justify-center items-center',
  variant = 'default',
  children = '',
  complete = false,
  width = '200px',
  height = '200px',
  strokeWidth = '1px',
  strokeWidthLoader = '2px',
}) => {
  return (
    <AnimatePresence>
      {!complete ? (
        <Tag
          className={`${styles.loader_circle} ${
            styles[`loader_circle__${variant}`]
          } ${className} loader h-[125px] w-[125px] lg:h-[200px] lg:w-[200px]`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.75,
            ease: [0.66, 0.19, 0.39, 0.96],
            delay: 0.25,
          }}
        >
          <style jsx>{`
            .loader,
            .loader:before,
            .loader:after {
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              content: '';
              position: absolute;
              border-radius: 50%;
            }

            .loader {
              position: absolute;
              margin: auto;

              /* animation: spin 4s linear infinite; */
            }

            @keyframes spin {
              100% {
                transform: rotate(360deg);
                /* filter: hue-rotate(360deg); */
              }
            }

            .loader:before {
              border: ${strokeWidthLoader} solid #cccccc;
              border-bottom: ${strokeWidthLoader} solid black;
              border-right: ${strokeWidthLoader} -25% solid black;
              border-radius: 50%;
              /*outline: 1px #5e1ec5 solid;
              outline-offset: 25%;*/
              animation: spin1 1s linear infinite;
            }

            @keyframes spin1 {
              from: {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </Tag>
      ) : null}
    </AnimatePresence>
  );
};

LoaderCircle.propTypes = {
  tagName: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default LoaderCircle;
