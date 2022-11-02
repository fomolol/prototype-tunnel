/**
 * @file CookiesPopUp.js
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import Link from 'next/link';

import mediaQueries from '../../styles/mediaQueries';
import colors from '../../styles/colors';

// Local components
import Button from '../Button';

const CookiesPopUp = ({ tagName: Tag, className, variant, children }) => {
  const [cookies, setCookie] = useCookies(['cookieNotificationIsConfirmed']);
  const [cookiePopUpIsActive, setCookiePopUpIsActive] = useState(false);

  useEffect(() => {
    setCookiePopUpIsActive(!cookies.cookie_notification_is_confirmed);
  }, []);

  const confirmCookie = () => {
    setCookie('cookie_notification_is_confirmed', true, { path: '/' });
    setCookiePopUpIsActive(false);
  };

  return (
    <Tag
      className={`cookies-pop-up cookies-pop-up--${variant} ${className}${
        cookiePopUpIsActive ? ' active' : ''
      }`}
    >
      <div className="flex flex-row items-end w-full h-full md:flex-row">
        <div className="relative z-10 flex flex-col items-center w-full text-center opacity-100 bg-grey-14 p-25 lg:p-0 md:px-50 py-20 lg:h-full lg:justify-between lg:flex-row">
          <div className="flex flex-col items-center justify-between w-full mx-auto cookies-pop-up__content lg:flex-row">
            <span className="block leading-tight tracking-widest text-white text-[14px] lg:flex-1-ie lg:text-left">
              We use cookies to improve your experience on our website.
              <Link href="/cookies-policy">
                <a className="ml-5 text-white hover:text-white active:text-white">
                  Learn More
                </a>
              </Link>
            </span>
            <div className="ml-0 cookies-pop-up__button mt-10 lg:mt-0 scale-[.75]">
              <Button
                className="md:py-10"
                defaultColor={colors.accent1}
                hoverColor={colors.accent2}
                textSizeClassName="text-15 md:text-20"
                trackingEventCategory="CookiesConfirmation"
                onClick={confirmCookie}
              >
                All Good!
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="absolute inset-0 bg-black opacity-75" /> */}
      </div>
      {children}
      <style jsx>{`
        .cookies-pop-up {
          z-index: 300;
          transition: opacity 500ms ease-in-out, height 0s 500ms;
        }
        .cookies-pop-up.active {
          height: 100%;
          opacity: 1;
          transition: opacity 500ms ease-in-out, height 0ms;
        }
        .cookies-pop-up__content {
          max-width: 280px;
        }

        @media (min-width: ${mediaQueries.lg}) {
          .cookies-pop-up.active {
            height: 80px;
          }
          .cookies-pop-up__content {
            max-width: 800px;
          }
          .cookies-pop-up__button {
            width: 250px;
          }
        }
      `}</style>
    </Tag>
  );
};

CookiesPopUp.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

CookiesPopUp.defaultProps = {
  tagName: 'div',
  className:
    'fixed left-0 bottom-0 h-0 w-screen z-50 opacity-0 overflow-hidden',
  variant: 'default',
  children: '',
};

export default CookiesPopUp;
