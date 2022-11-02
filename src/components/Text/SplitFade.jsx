/**
 * @file SplitFade
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const SplitFade = ({
  children,
  letterWrapperClassname = 'cursor-pointer relative white-space-pre',
  hiddenLetterClassname = 'opacity-0 invisible',
  roundLetterClassname = 'inline-block h-full left-0 absolute top-0 origin-right w-full',
  spaceLetterClassname = 'inline-block font-stolzl h-full left-0 absolute top-0 origin-left w-full',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const rounded = {
    initial: {
      opacity: 0,
      transform: 'translateY(0%)',
    },
    animate: {
      opacity: isHovered ? 0 : 1,
      transform: isHovered ? 'translateY(-50%)' : 'translateY(0%)',
    },
    exit: {
      opacity: 0,
      transform: 'translateY(0%)',
    },
    transition: {
      ease: 'easeOut',
      duration: 1,
    },
  };

  const square = {
    initial: {
      opacity: 0,
      transform: 'translateY(50%)',
    },
    animate: {
      opacity: isHovered ? 1 : 0,
      transform: isHovered ? 'translateY(0%)' : 'translateY(50%)',
    },
    exit: {
      opacity: 0,
      transform: 'translateY(50%)',
    },
    transition: {
      ease: 'easeOut',
      duration: 0.8,
    },
  };

  return (
    <span className={letterWrapperClassname}>
      <span className={hiddenLetterClassname}>{children}</span>

      <motion.span
        className={roundLetterClassname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={rounded}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </motion.span>

      <motion.span
        className={spaceLetterClassname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={square}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default SplitFade;
