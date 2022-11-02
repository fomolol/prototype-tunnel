/**
 * @file Modal.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import styles from './Modal.module.css';

import { useStore } from '@/store';

var openVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

const Button = ({ setHover, onClick }) => {
  var openVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
        delay: 0,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      key="open"
      variants={openVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute top-5 flex animate-pulse cursor-pointer flex-col space-y-1 bg-transparent text-white md:top-[10%]"
      onClick={() => {
        onClick();
      }}
    >
      <motion.svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current stroke-current group"
      >
        <motion.rect
          x="10"
          y="19.1924"
          width="13"
          height="1"
          rx="0.5"
          transform="rotate(-45 10 19.1924)"
          fill="current"
        />
        <motion.rect
          width="13"
          height="1"
          rx="0.5"
          transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 20 19.1924)"
          fill="current"
        />
        <motion.rect
          x="0.5"
          y="0.5"
          width="29"
          height="29"
          rx="3.5"
          stroke="current"
          fill="none"
        />
      </motion.svg>
    </motion.div>
  );
};

const Modal = ({
  tagName: Tag = motion.div,
  className = 'fixed inset-0 w-screen h-screen overflow-x-hidden overflow-y-auto z-modal bg-white/5 backdrop-blur-3xl ',
  variant = 'default',
  children = '',
  type = 'default',
  onClose = () => console.log('modal close clicked'),
}) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Tag
      key="modal"
      variants={openVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${styles.modal} ${styles[`modal__${variant}`]} ${className}`}
    >
      <div className="absolute inset-0 w-screen h-screen overflow-x-hidden overflow-y-auto">
        <motion.div
          key="modal"
          variants={openVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-full min-h-screen bg-white/5 backdrop-blur-3xl md:items-center"
        >
          {type === 'default' && <Button onClick={onClose} />}
          {children}
        </motion.div>
      </div>
    </Tag>
  );
};

Modal.propTypes = {
  tagName: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default Modal;
