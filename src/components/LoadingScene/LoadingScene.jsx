/**
 * @file LoadingScene.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

import LoaderCircle from '@/components/LoaderCircle';

import styles from './LoadingScene.module.css';

const LoadingScene = ({
  complete = false,
  onClick = () => console.log('Entering experience'),
}) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.75,
            ease: [0.66, 0.19, 0.39, 0.96],
            // repeat: Infinity,
            // repeatType: 'mirror',
            // repeatDelay: 2,
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.75,
            ease: [0.66, 0.19, 0.39, 0.96],
          },
        }}
      >
        <LoaderCircle className="absolute transform" />
      </motion.div>
      <div className="absolute overflow-visible">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          viewBox="0 0 692 133.333"
          className="relative w-[55px] fill-current text-current lg:w-[90px]"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.75,
              ease: [0.66, 0.19, 0.39, 0.96],
              // delay: 0,
              // repeat: 1,
              // repeatType: 'reverse',
              // repeatDelay: 1.25,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.75,
              ease: [0.66, 0.19, 0.39, 0.96],
            },
          }}
        >
          <mask id="myMask">
            {/* Everything under a white pixel will be visible */}
            <motion.path
              className="fill-white"
              fillRule="evenodd"
              d="M304 0a5.334 5.334 0 0 0-5.333 5.333V128a5.33 5.33 0 0 0 5.333 5.333h16a5.334 5.334 0 0 0 5.333-5.333V66.667a5.33 5.33 0 0 1 5.334-5.334h8c2.541 0 5.478.746 8.396 2.891.297.219.562.479.797.76l55.755 66.443a5.326 5.326 0 0 0 4.082 1.906h12.887c4.53 0 7-5.292 4.088-8.76l-52.427-62.48c-2.912-3.468-.442-8.76 4.088-8.76h8.448a5.333 5.333 0 0 0 4.088-1.906L424.672 8.76c2.912-3.468.443-8.76-4.088-8.76h-12.887a5.326 5.326 0 0 0-4.082 1.907l-41.558 49.52a5.318 5.318 0 0 1-4.084 1.906h-27.306A5.33 5.33 0 0 1 325.333 48V5.333A5.337 5.337 0 0 0 320 0zM138.667 5.333A5.33 5.33 0 0 1 144 0h16a5.334 5.334 0 0 1 5.333 5.333V100a6.666 6.666 0 0 0 6.667 6.667h66.667a6.666 6.666 0 0 0 6.666-6.667V5.333A5.33 5.33 0 0 1 250.667 0h16A5.334 5.334 0 0 1 272 5.333v99.126a5.34 5.34 0 0 1-1.563 3.77l-23.541 23.542c-1 1-2.36 1.562-3.77 1.562H167.54a5.34 5.34 0 0 1-3.77-1.562l-23.542-23.542c-1-1-1.562-2.36-1.562-3.77zM599.27 0h34.063a5.337 5.337 0 0 1 5.334 5.333V128a5.334 5.334 0 0 1-5.334 5.333h-16A5.33 5.33 0 0 1 612 128V13.333A5.334 5.334 0 0 0 606.667 8h-11.62a5.335 5.335 0 0 0-4.088 1.907l-58.787 70.057c-.005.01-.016.015-.027.02a.077.077 0 0 1-.046.016c-.031 0-.058.01-.072.03a.115.115 0 0 0-.027.043V128a5.334 5.334 0 0 1-5.333 5.333h-16a5.33 5.33 0 0 1-5.334-5.333V81.943c0-1.255.443-2.47 1.246-3.433L570.86 1.907A5.333 5.333 0 0 1 574.948 0zM457.333 106.667A5.33 5.33 0 0 0 452 112v16a5.334 5.334 0 0 0 5.333 5.333h16a5.337 5.337 0 0 0 5.334-5.333v-16a5.334 5.334 0 0 0-5.334-5.333zM670.667 0a5.334 5.334 0 0 0-5.334 5.333V128a5.33 5.33 0 0 0 5.334 5.333h16A5.334 5.334 0 0 0 692 128V5.333A5.337 5.337 0 0 0 686.667 0zM5.333 0A5.334 5.334 0 0 0 0 5.333V128a5.33 5.33 0 0 0 5.333 5.333H120.46c4.749 0 7.129-5.745 3.77-9.104l-16-16c-1-1-2.36-1.562-3.77-1.562H33.333A6.666 6.666 0 0 1 26.667 100V5.333A5.334 5.334 0 0 0 21.333 0z"
            />

            {/* Everything under a black pixel will be invisible  */}
            <motion.rect
              x="0"
              y="0"
              width="692"
              height="133.333"
              className="fill-black/50"
              initial={{
                translateY: '0%',
              }}
              animate={{
                translateY: '-100%',
              }}
              transition={{
                duration: 1,
                delay: 0.75,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
            />
          </mask>
          <motion.rect
            x="0"
            y="0"
            width="692"
            height="133.333"
            mask="url(#myMask)"
            className="fill-black"
          />
        </motion.svg>
      </div>

      {/* <div className="absolute w-full">
        <div className="relative w-full overflow-hidden text-center">
          <motion.p
            key="intro-text"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.75,
                delay: 2.5,
                ease: [0.66, 0.19, 0.39, 0.96],
                repeat: Infinity,
                repeatType: 'mirror',
                repeatDelay: 2,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.75,
                ease: [0.66, 0.19, 0.39, 0.96],
              },
            }}
            className="font-sora text-[11px] font-bold uppercase tracking-wide lg:text-[13px]"
          >
            <span className="">Let&apos;s play!</span>
          </motion.p>
        </div>
      </div> */}
    </div>
  );
};

LoadingScene.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default LoadingScene;
