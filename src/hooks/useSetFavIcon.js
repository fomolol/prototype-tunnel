/**
 * useSetFavIcon
 * Handles setting a custom favicon for the browser
 */
import * as React from 'react';

export const useSetFavIcon = (src = '/favicon.ico') => {
  const [complete, setComplete] = React.useState(null);

  React.useEffect(() => {
    const setFavicons = favImg => {
      let headTitle = document.querySelector('head');
      let setFavicon = document.createElement('link');
      setFavicon.setAttribute('rel', 'shortcut icon');
      setFavicon.setAttribute('href', favImg);
      headTitle.appendChild(setFavicon);
      setComplete(true);
    };
    if (!complete) {
      setFavicons(src);
    }
  }, [complete, src]);

  return complete;
};
