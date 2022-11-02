/**
 * useStore
 * @see https://github.com/pmndrs/zustand
 */
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { createRef } from 'react';

export const useStore = create(
  persist(
    (set, get) => ({
      debug: false,
      themeColor: 'light', // or 'dark'
      cursorColor: 'light', // or 'dark'
      top: createRef(),
      mouse: createRef(),
      scrollbar: createRef(),
      scrollerEnabled: true,
      cookieAcceptKey: 'REPLACE_ME_cookie_accepted',
      windowSize: {
        height: undefined,
        width: undefined,
      },
      audioState: {
        isActive: false,
        isPlaying: false,
      },
      volume: 0.25,
      zoom: 75,
      useImageProxy: false,
      nav: 'nav',
      subNav: 'subNav',
      navOpen: false,
      modalOpen: false,
      modalContent: null,
      cursorStyle: 'normal',
      introAnimationComplete: false,
      //
      setCursorStyle: val =>
        set(state => ({
          cursorStyle: val,
        })),
      setCursorColor: val =>
        set(state => ({
          cursorColor: val,
        })),
      setWindowSize: val =>
        set(state => ({
          windowSize: val,
        })),
      setScrollerEnabled: val =>
        set(state => ({
          scrollerEnabled: val,
        })),
      setThemeColor: val =>
        set(state => ({
          themeColor: val,
        })),
      setAudioState: val =>
        set(state => ({
          audioState: { ...state.audioState, ...val },
        })),
      setHeroScrollComplete: val =>
        set(state => ({
          heroScrollComplete: val,
        })),
      setIntroAnimationComplete: val =>
        set(state => ({
          introAnimationComplete: val,
        })),
      setNavOpen: val =>
        set(state => ({
          navOpen: val,
        })),
      setModalOpen: val =>
        set(state => ({
          modalOpen: val,
        })),
      setModalContent: val =>
        set(state => ({
          modalContent: val,
        })),
    }),
    {
      name: 'REPLACE_ME-storage',
      getStorage: () => localStorage,
      partialize: state => ({ audioState: state.audioState }),
    },
  ),
);
