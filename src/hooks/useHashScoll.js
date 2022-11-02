/**
 * @file useHashScroll
 */
import { useRouter } from 'next/router';
import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';

const getHash = asPath => asPath.split('#')[1];

export const useHashScroll = trigger => {
  const router = useRouter();
  const { asPath } = router;
  useLayoutEffect(() => {
    if (router.isReady && trigger) {
      const hash = getHash(asPath);
      if (hash) {
        // window.location.hash = hash;
        try {
          router.push({
            pathname: '/',
            hash,
          });
        } catch (err) {
          console.log('Error pushing route', err);
        }
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [trigger]); // WARNING: adding asPath and router will break it.
};
