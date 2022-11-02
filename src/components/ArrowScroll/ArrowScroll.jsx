/**
 * @file ArrowScroll.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

import styles from './ArrowScroll.module.css';

const ArrowScroll = ({
  tagName: Tag = 'div',
  className = 'absolute w-screen bottom-0 h-screen flex items-end justify-end lg:justify-center text-black mix-blend-difference pointer-events-none translate-y-100 right-[20px] lg:right-0',
  variant = 'default',
  children = 'Scroll down',
}) => {
  const { scroll } = useLocomotiveScroll();
  const [hide, setHide] = React.useState(null);

  return (
    <Tag
      className={`${styles.arrow_scroll} ${
        styles[`arrow_scroll__${variant}`]
      } arrow-scroll ${className} ${hide ? 'hidden' : null}`}
    >
      <button
        data-target="#scroll"
        onClick={() => {
          scroll.scrollTo('bottom');
          setHide(true);
        }}
        className="arrow-scroll_button inline-flex justify-center w-[20px] h-[34px] lg:w-[40px] lg:h-[40px] md:ml-[-10px] pointer-events-auto overflow-hidden pb-[20px]"
        aria-hidden="true"
        focusable="false"
      >
        <span className="sr-only">{children}</span>
        <span className="inline-block arrow-scroll_button_inner">
          <svg className="arrow-scroll_button_arrow">
            <use xlinkHref="/img/sprite.svg#arrow-bottom"></use>
          </svg>
        </span>
      </button>
      <style jsx>{`
        .arrow-scroll {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0, 1),
            opacity 0.6s cubic-bezier(0.4, 0, 0, 1);
          transition-delay: 1.4s;
          opacity: 1;
          transform: translateY(0%);
        }
        @media (max-width: 699px) {
          .arrow-scroll {
            justify-content: flex-end;
          }
        }

        .arrow-scroll_button {
          transition: transform 0.9s cubic-bezier(0.4, 0, 0, 1);
        }
        html.has-small-logo .arrow-scroll_button {
          transform: translateY(110%);
        }
        .arrow-scroll_button_arrow {
          stroke: currentColor;
          stroke-width: 1px;
          stroke-dasharray: 2;
        }
        @media (min-width: 700px) {
          .arrow-scroll_button_arrow {
            width: 20px;
            height: 20px;
          }
        }
        @media (max-width: 699px) {
          .arrow-scroll_button_arrow {
            width: 14px;
            height: 14px;
          }
        }
        @keyframes scrollDown {
          0% {
            transform: translate3d(0, -160%, 0);
          }
          70% {
            transform: translate3d(0, 0, 0);
          }
          95% {
            transform: translate3d(0, 100%, 0) translate3d(0, 20px, 0);
          }
          100% {
            transform: translate3d(0, 100%, 0) translate3d(0, 20px, 0);
          }
        }
        .arrow-scroll_button_inner {
          animation: scrollDown 3s cubic-bezier(0.77, 0, 0.175, 1) forwards
            infinite;
        }
      `}</style>
    </Tag>
  );
};

ArrowScroll.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default ArrowScroll;
