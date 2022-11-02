/**
 * @file UnsupportedOrientation.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  osName,
  isTablet,
  isMobileOnly,
  useMobileOrientation,
} from 'react-device-detect';

import styles from './UnsupportedOrientation.module.css';

import { useWindowSize } from '@/hooks/useWindowSize';
import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';

const UnsupportedOrientation = ({
  tagName: Tag = 'div',
  className = 'fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen min-h-screen',
  variant = 'default',
}) => {
  const { height, width } = useWindowSize();
  const [supportedDevice, setSupportedDevice] = React.useState(true);
  const { isLandscape } = useMobileOrientation();

  React.useEffect(() => {
    // Window pixel ratio
    const dpr = window.devicePixelRatio;
    // to be safe we default to true
    // so we only show unsupported screen if fails specific tests
    let supported = true;
    // if (osName === 'iOS' && !isDesktop && !isTablet) {
    //   if (parseFloat(osVersion) < 12) {
    //     supported = false;
    //   }
    // }

    if (osName === 'iOS') {
      if (isMobileOnly && isLandscape) {
        supported = false;
      }
      // // iPhone 7 viewport area.
      // if (height && height < 667 && dpr < 3) {
      //   supported = false;
      // }
    }

    if (isTablet && isLandscape) {
      supported = false;
    }

    // set body style to lock mobile down
    if (!supported) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.pointerEvents = 'auto';
    }

    // set state for UnsupportedOrientation component visibility
    setSupportedDevice(supported);
  }, [height, width, isLandscape]);

  return !supportedDevice && (isMobileOnly || isTablet) ? (
    <Tag
      className={`${styles.unsupported_orientation} ${
        styles[`unsupported_orientation__${variant}`]
      } ${className}`}
      style={{
        height: `${height}px`,
        minHeight: `${height}px`,
        zIndex: 10000,
      }}
    >
      <div className="relative flex flex-col items-center justify-center flex-grow w-screen h-screen text-center bg-black">
        <div className="flex flex-col items-center justify-center w-full h-full leading-none tracking-wide">
          <div className="mb-8 h-[71px] w-[119px] lg:mb-40 lg:h-[71px] lg:w-[119px]">
            <svg
              width="119"
              height="71"
              viewBox="0 0 119 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.2">
                <rect
                  x="118.5"
                  y="30.502"
                  width="39"
                  height="69"
                  rx="5.5"
                  transform="rotate(90 118.5 30.502)"
                  stroke="white"
                />
                <ellipse
                  cx="61.25"
                  cy="50.0018"
                  rx="3.2"
                  ry="3.5"
                  transform="rotate(90 61.25 50.0018)"
                  fill="white"
                />
              </g>
              <rect
                x="0.5"
                y="0.506836"
                width="39"
                height="69"
                rx="5.5"
                stroke="white"
              />
              <ellipse cx="20" cy="57.7568" rx="3.2" ry="3.5" fill="white" />
            </svg>
          </div>
          <p className="text-center font-sora text-[12px] normal-case text-white lg:text-[23px]">
            Site is best viewed in portrait mode
          </p>
        </div>
      </div>
    </Tag>
  ) : (
    <></>
  );
};

UnsupportedOrientation.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default UnsupportedOrientation;
