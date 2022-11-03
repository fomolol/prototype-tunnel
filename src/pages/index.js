import * as React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useStore } from '@/store';

import { useHashScroll } from '@/hooks/useHashScoll';
import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';

// import AnimatedText from '@/components/AnimatedText';
// import Text from '@/components/Text';
// import { useTheme } from '@/hooks/useTheme';

const MainScene = dynamic(() => import('@/components/MainScene'), {
  ssr: false,
});

export default function Home() {
  // const { toggle, getTheme } = useTheme();
  const { setCursorColor, introAnimationComplete } = useStore();
  const [loadMainScene, setLoadMainScene] = React.useState(false);

  // Fake loader
  useLayoutEffect(() => {
    // Wait until the loader scene has finished animating out
    // and then show the main scene
    if (introAnimationComplete) {
      setTimeout(() => {
        setLoadMainScene(true);
        setCursorColor('light');
      }, 750);
    }
  }, [setCursorColor, introAnimationComplete]);

  // scroll after the trigger loadMainScene
  useHashScroll(loadMainScene);

  return (
    <>
      {loadMainScene ? (
        <div className="relative flex h-full min-h-[100vh] w-full flex-none">
          <MainScene />
          {/* <div className="flex h-full w-full items-center justify-center font-pp text-[100px]">
            <div className="absolute">
              <AnimatedText
                tagName="p"
                color="white"
                className="absolute flex font-black "
              >
                FOMOLOL
              </AnimatedText>
              <Text tagName="p" className="flex font-black text-white/50">
                FOMOLOL
              </Text>
            </div>
          </div> */}
        </div>
      ) : null}
    </>
  );
}
