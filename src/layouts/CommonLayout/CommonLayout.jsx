/**
 * @file DefaultLayout.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Canvas, useThree } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
// import { BlendFunction } from 'postprocessing';

import { useStore } from '@/store';
import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';

import Modal from '@/components/Modal';
import Scroller from '@/components/Scroller';

import styles from './CommonLayout.module.css';

import Cursor from '@/components/Cursor';
import EffectsGlobal from '@/components/EffectsGlobal';
import DebugScreen from '@/components/DebugScreen';

const DefaultLayout = ({
  tagName: Tag = 'div',
  className = 'w-full h-auto transition duration-1000 ease-in-out will-change-[background-color] bg-gray-e3',
  variant = 'default',
  children = '',
  skipAnimation = false,
  loadingComplete = false,
}) => {
  const {
    introAnimationComplete,
    navOpen,
    modalOpen,
    themes,
    themeOpen,
    setTheme,
    modalContent,
    setModalOpen,
    setModalContent,
  } = useStore();

  const [showItems, setShowItems] = React.useState(false);

  const onCloseModalHandler = React.useCallback(() => {
    setModalOpen(false);
    setModalContent(null);
  }, [setModalOpen, setModalContent]);

  // Make the items wait a bit longer for the intro
  useLayoutEffect(() => {
    if (introAnimationComplete) {
      setTimeout(() => setShowItems(true), 4500);
    }
  }, [introAnimationComplete]);

  return (
    <>
      <Tag
        className={`${styles.common_layout} ${
          styles[`common_layout__${variant}`]
        } ${className}`}
      >
        {/* GLOBAL SMOOTH SCROLL */}
        <Scroller
          disable={!loadingComplete || navOpen || themeOpen || modalOpen}
        >
          {children}
        </Scroller>

        {/* MODAL */}
        <AnimatePresence>
          {modalOpen || themeOpen ? (
            <Modal
              type={themeOpen ? 'theme' : 'default'}
              onClose={onCloseModalHandler}
            >
              {modalContent}
            </Modal>
          ) : null}
        </AnimatePresence>

        {/* GLOBAL THREEJS EFFECTS */}
        <EffectsGlobal />
      </Tag>

      <DebugScreen />
      <Cursor />
    </>
  );
};

DefaultLayout.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default DefaultLayout;
