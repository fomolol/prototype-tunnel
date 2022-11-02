/**
 * @file LegalLayout.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useStore } from '@/store';
import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';

import styles from './LegalLayout.module.css';

const ButtonClose = () => {
  return (
    <Link href="/">
      <button className="flex items-center justify-center w-full pt-2 leading-none text-white transition duration-500 ease-in-out fill-white hover:fill-pink-f7 hover:text-pink-f7">
        <svg
          viewBox="0 0 40 40"
          className="h-[40px] w-[40px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g filter="url(#filter0_b_1757_3473)">
            <rect width="40" height="40" rx="20" fill="currentColor" />
            <rect
              width="15.9982"
              height="1.59982"
              transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 26.0002 24.8691)"
              fill="black"
            />
            <rect
              x="13.5564"
              y="24.8691"
              width="15.9982"
              height="1.59982"
              transform="rotate(-45 13.5564 24.8691)"
              fill="black"
            />
          </g>
          <defs>
            <filter
              id="filter0_b_1757_3473"
              x="-3"
              y="-3"
              width="46"
              height="46"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_1757_3473"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_backgroundBlur_1757_3473"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </button>
    </Link>
  );
};

const LegalLayout = ({
  tagName: Tag = motion.div,
  className = 'absolute top-0 left-0 w-full h-auto min-h-screen pt-12 pb-12 overflow-hidden text-white bg-black',
  variant = 'default',
  children = '',
  heading = null,
}) => {
  const { setThemeColor, introAnimationComplete } = useStore();

  useLayoutEffect(() => {
    if (introAnimationComplete) {
      setThemeColor('dark');
    }
  }, [setThemeColor, introAnimationComplete]);

  return (
    <Tag
      className={`${styles.legal} ${styles[`legal__${variant}`]} ${className}`}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <ButtonClose />
      {heading}
      <div className="text-md mx-auto flex max-w-[320px] flex-col space-y-4 pl-12 pt-12 font-sora text-[13px] tracking-wide md:max-w-[640px]">
        {children}
      </div>
    </Tag>
  );
};

LegalLayout.propTypes = {
  tagName: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  heading: PropTypes.node,
  children: PropTypes.node,
};

export default LegalLayout;
