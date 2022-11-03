import * as React from 'react';
import Script from 'next/script';
import Router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';
import { DefaultSeo } from 'next-seo';
import { isMobileOnly, isTablet } from 'react-device-detect';

import seoConfig from '@/config/seo-default.config';

import Layout from '@/layouts/CommonLayout';
import Loader from '@/components/Loader';
import CookieBanner from '@/components/CookieBanner';

import { useStore } from '@/store';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';

const UnsupportedOrientation = dynamic(
  () => import('@/components/UnsupportedOrientation'),
  {
    ssr: false,
  },
);

// Import Font Styles
// You can find fonts at https://fonts.adobe.com/
// @import url('https://use.typekit.net/tyl1imq.css');
import '@/styles/fonts.css';

// custom scrollbar
import '@/styles/custom-scrollbar.css';

// custom mouse cursor
import '@/styles/custom-nprogress.css';

// Import Tailwind Styles
import '@/styles/tailwind.css';

import '@/styles/globals.css';

NProgress.configure({
  showSpinner: false,
});

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

function MyApp({ Component, pageProps }) {
  const { mouse, introAnimationComplete, setIntroAnimationComplete } =
    useStore();
  const [loadingComplete, setLoadingComplete] = React.useState(false);
  const { asPath } = useRouter();

  useLayoutEffect(() => {
    const onMouseMove = e => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener('mousemove', onMouseMove, true);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [mouse]);

  useLayoutEffect(() => {
    // Start the main scene
    if (!introAnimationComplete) {
      setTimeout(() => {
        setIntroAnimationComplete(true);
      }, 3200);
    }
    if (!loadingComplete) {
      setTimeout(() => setLoadingComplete(true), 2500);
    }
  }, [introAnimationComplete]);

  return (
    <>
      <Layout
        loadingComplete={introAnimationComplete}
        skipAnimation={asPath !== '/'}
      >
        <DefaultSeo {...seoConfig} />
        <Script
          id="theme-switcher"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                if (
                  localStorage.getItem('theme') === 'dark' ||
                  (!('theme' in localStorage) &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches)
                ) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }`,
          }}
        />
        <Script
          async
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=GTM-XXXXXXX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'GTM-XXXXXXX');
            `,
          }}
        />
        <Component {...pageProps} />
      </Layout>

      {/* INTRO LOADER */}
      <Loader
        visible={!introAnimationComplete}
        loadingComplete={loadingComplete}
      />

      {/* UNSUPPORTED DEVICE */}
      <UnsupportedOrientation />

      {/* COOKIE BANNER */}
      {/* <CookieBanner className="mb-4" visible={introAnimationComplete} /> */}
    </>
  );
}

export default MyApp;
