/**
 * @file SplitOverflow
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const SplitOverflow = ({
  children,
  roundLetterClassname = 'inline-block h-full left-0 absolute top-0 origin-right w-full',
  spaceLetterClassname = 'inline-block font-stolzl h-full left-0 absolute top-0 origin-left w-full',
  letterWrapperClassname = 'cursor-pointer relative white-space-pre',
  hiddenLetterClassname = 'opacity-0 invisible',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const rounded = {
    initial: {
      transform: 'translateY(0%) rotate(0deg)',
    },
    animate: {
      transform: isHovered
        ? 'translateY(-180%) rotate(-8deg)'
        : 'translateY(0%) rotate(0deg)',
    },
    exit: {
      transform: 'translateY(0%) rotate(0deg)',
    },
    transition: {
      ease: 'easeOut',
      duration: 1,
    },
  };

  const square = {
    initial: {
      transform: 'translateY(100%) rotate(15deg)',
    },
    animate: {
      transform: isHovered
        ? 'translateY(0%) rotate(0deg)'
        : 'translateY(100%) rotate(15deg)',
    },
    exit: {
      transform: 'translateY(100%) rotate(15deg)',
    },
    transition: {
      ease: 'easeOut',
      duration: 0.8,
    },
  };

  return (
    <span className={letterWrapperClassname}>
      <span className={hiddenLetterClassname}>{children}</span>
      <span
        className={`${roundLetterClassname} overflow-hidden w-full h-full`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span
          className={roundLetterClassname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={rounded}
          transition={{
            ease: 'easeOut',
            duration: 1,
          }}
        >
          {children}
        </motion.span>
        <motion.span
          className={spaceLetterClassname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={square}
          transition={{
            ease: 'easeOut',
            duration: 0.8,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </motion.span>
      </span>
    </span>
  );
};

export default SplitOverflow;
