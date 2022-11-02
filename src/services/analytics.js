/**
 * @file services/analytics.js
 * Global site analytics service that is compatible
 * with Google Analytics and Google Tag Manager
 *
 * IMPORTANT! See the following setup guide for GTM configuration.
 * @see https://trackingchef.com/google-tag-manager/generic-event-tracking-in-google-tag-manager/
 *
 * Event Name (default): 'app_event'
 *
 * Google Tag Manager
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
import TagManager from 'react-gtm-module';

let initialized = false;

const eventName = 'app_event';

export default {
  /**
   * init
   * @param {*} trackerNames is the tracker to use
   *                        Warning: Without this you may get 'Command ignored. Unknown target: undefined'
   * @param {*} userId The user id to apply tracking to (if available)
   * @return {void}
   */
  init: (userId = null) => {
    const isClient = typeof window === 'object';
    if (!isClient) return false;
    if (initialized) return;
    console.log('[Analytics] Initialized');
    const gUserId = null;

    const fUserId = userId || gUserId || null;

    // Set up Google Tag Manager
    // console.log('GTM Initialized with user id', fUserId)
    // Set the Tag Manager code
    const tagManagerArgs = {
      gtmId: process.env.NEXT_PUBLIC_GOOGLE_GTM_CODE,
      auth: process.env.NEXT_PUBLIC_GOOGLE_GTM_AUTH || '',
      preview: process.env.NEXT_PUBLIC_GOOGLE_GTM_PREVIEW, // e.g. 'env-2'
      dataLayer: {},
      events: {},
    };
    TagManager.initialize(tagManagerArgs);
    initialized = true;
  },

  /**
   * logPageView
   * @param {array} trackerNames
   */
  logPageView: () => {
    const isClient = typeof window === 'object';
    if (!isClient) return false;
    // console.log(`Logging pageview for ${window.location.pathname}`)
    try {
      TagManager.dataLayer({
        dataLayer: {
          event: eventName,
          eventCategory: 'Page',
          eventAction: 'PageView',
          eventLabel: window.location.pathname,
        },
      });
    } catch (err) {
      console.log(
        '[Analytics] Error logging the page',
        JSON.stringify({
          pathname: window.location.pathname,
          title: window.location.title,
        }),
      );
    }
  },

  /**
   * logEvent
   * Google Analytics
   * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   *
   * Google Tag Manager
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
   * @param {string} category
   * @param {string} action
   * @param {string} label
   * @param {array} trackerNames
   */
  logEvent: (category = '', action = '', label = '') => {
    const isClient = typeof window === 'object';
    if (!isClient) return false;
    const fCategory =
      typeof category !== 'string' ? category.toString() : category;
    const fAction = typeof action !== 'string' ? action.toString() : action;
    if (fCategory && fAction) {
      try {
        console.log('[Analytics] Event logged', {
          event: eventName,
          eventCategory: fCategory,
          eventAction: fAction,
          eventLabel: label,
        });

        TagManager.dataLayer({
          dataLayer: {
            event: eventName,
            eventCategory: fCategory,
            eventAction: fAction,
            eventLabel: label,
          },
        });
      } catch (err) {
        console.log('[Analytics] Error logging the event', {
          event: eventName,
          eventCategory: fCategory,
          eventAction: fAction,
          eventLabel: label,
        });
      }
    }
  },

  /**
   * logException
   * @param {string} description
   * @param {boolean} fatal
   */
  logException: (description = '', fatal = false) => {
    const isClient = typeof window === 'object';
    if (!isClient) return false;
    if (description) {
      console.log('[Analytics] Exception logged', { description, fatal });
      TagManager.dataLayer({
        dataLayer: {
          event: eventName,
          eventCategory: description,
          eventAction: 'FatalException',
          eventLabel: fatal,
        },
      });
    }
  },
};
