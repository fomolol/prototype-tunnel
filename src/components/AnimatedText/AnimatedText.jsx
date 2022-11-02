/**
 * @file AnimatedText.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import styles from './AnimatedText.module.css';

// Word wrapper
const Wrapper = props => {
  // We'll do this to prevent wrapping of words using CSS
  return (
    <span className="word-wrapper whitespace-nowrap">{props.children}</span>
  );
};

const container = {
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

const AnimatedChars = ({
  tagName: Tag = 'p',
  backgroundColor = 'transparent',
  color = '#ffffff',
  children = '',
  duration = 0.75,
  ease = [0.455, 0.03, 0.515, 0.955],
}) => {
  // Framer Motion variant object, for controlling animation
  const item = {
    hidden: {
      y: '100%',
      color: backgroundColor,
      transition: {
        ease: [0.455, 0.03, 0.515, 0.955],
        duration: duration + 0.1,
      },
    },
    visible: {
      y: 0,
      color,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration },
    },
  };

  //  Split each word of props.text into an array
  const splitWords = children.split(' ');

  // Create storage array
  const words = [];

  // Push each word into words array
  for (const [, item] of splitWords.entries()) {
    words.push(item.split(''));
  }

  // Add a space ("\u00A0") to the end of each word
  words.map(word => {
    return word.push('\u00A0');
  });

  return (
    <Tag>
      {words.map((word, index) => {
        return (
          // Wrap each word in the Wrapper component
          <Wrapper key={index}>
            {words[index].flat().map((element, index) => {
              return (
                <span
                  style={{
                    overflow: 'hidden',
                    display: 'inline-block',
                  }}
                  key={index}
                >
                  <motion.span
                    style={{ display: 'inline-block' }}
                    variants={item}
                  >
                    {element}
                  </motion.span>
                </span>
              );
            })}
          </Wrapper>
        );
      })}
    </Tag>
  );
};

// AnimatedText
// Handles the deconstruction of each word and character to setup for the
// individual character animations
const AnimatedText = ({
  tagName: Tag = 'p',
  className = '',
  variant = 'default',
  backgroundColor = 'transparent',
  color = '#ffffff',
  children = '',
}) => {
  return (
    <motion.div
      className={`${styles.animated_text} ${
        styles[`animated_text__${variant}`]
      } ${className}`}
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <AnimatedChars
        tagName={Tag}
        color={color}
        backgroundColor={backgroundColor}
      >
        {children}
      </AnimatedChars>
    </motion.div>
  );
};

AnimatedText.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default AnimatedText;
