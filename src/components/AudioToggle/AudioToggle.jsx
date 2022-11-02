/**
 * @file AudioToggle.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactHowler from 'react-howler';

import styles from './AudioToggle.module.css';

const AudioToggle = ({
  tagName: Tag = 'div',
  className = 'relative z-10 inline-flex pointer-events-auto',
  variant = 'default',
  muted: _muted = true,
  showLabel = true,
  src = '/sounds/TheHoly_Lvcidia.mp3',
  loop = true,
  preload = true,
}) => {
  const [audioState, setAudioState] = React.useState({
    wasPlaying: !_muted,
    isPlaying: !_muted,
  });
  const totalBars = 10;

  const onFocus = React.useCallback(() => {
    setAudioState({ wasPlaying: true, isPlaying: audioState.wasPlaying });
  }, [audioState.wasPlaying]);

  const onBlur = React.useCallback(() => {
    setAudioState({
      wasPlaying: audioState.isPlaying,
      isPlaying: false,
    });
  }, [audioState.isPlaying]);

  React.useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, [onBlur, onFocus]);

  const muted = audioState.isPlaying ? false : true;

  return (
    <Tag
      className={`${styles.audio_toggle} ${
        styles[`audio_toggle__${variant}`]
      } ${className}`}
    >
      <button
        className={`inline-flex sound-button pt-[20px] pr-[20px] ${
          muted ? 'has-sound-muted' : null
        }`}
        onClick={() =>
          setAudioState(state =>
            Object.assign({}, { isPlaying: !state.isPlaying }),
          )
        }
      >
        <span
          className={`transition duration-500 ease-in-out h-[14px] font-pp inline-block items-end leading-none -mt-1 ${
            muted
              ? `group border-dashed border-black dark:border-white border-b hover:border-0`
              : `group hover:border-dashed hover:border-black dark:hover:border-white hover:border-b`
          }`}
        >
          {[...Array(totalBars).keys()].map((_, i) => (
            <span
              key={`bar-${i}`}
              className={`transition duration-500 ease-in-out ${
                muted
                  ? 'opacity-0 group-hover:opacity-100'
                  : 'opacity-100 group-hover:opacity-0'
              }  mr-[2px] w-[1px] leading-tight inline-block border-l border-dashed border-black dark:border-white sound-button_bar_line`}
            ></span>
          ))}
        </span>
        <span
          className={`${
            showLabel ? 'inline-block' : 'hidden'
          } sound-button_label ml-[5px] text-black dark:text-white lowercase text-[12px] tracking-wider leading-none`}
        >
          {muted ? 'sound off' : 'sound on'}
        </span>
      </button>
      <ReactHowler src={src} playing={!muted} loop={loop} preload={preload} />
      <style jsx>{`
        .sound-button_bar_line {
          animation: sound 0ms -800ms linear infinite alternate;
        }
        .sound-button_bar_line:nth-child(1) {
          animation-duration: 974ms;
        }
        .sound-button_bar_line:nth-child(2) {
          animation-duration: 933ms;
        }
        .sound-button_bar_line:nth-child(3) {
          animation-duration: 907ms;
        }
        .sound-button_bar_line:nth-child(4) {
          animation-duration: 958ms;
        }
        .sound-button_bar_line:nth-child(5) {
          animation-duration: 900ms;
        }
        .sound-button_bar_line:nth-child(6) {
          animation-duration: 927ms;
        }
        .sound-button_bar_line:nth-child(7) {
          animation-duration: 941ms;
        }
        .sound-button_bar_line:nth-child(8) {
          animation-duration: 919ms;
        }
        .sound-button_bar_line:nth-child(9) {
          animation-duration: 987ms;
        }
        .sound-button_bar_line:nth-child(10) {
          animation-duration: 942ms;
        }
        @keyframes sound {
          0% {
            height: 4px;
          }
          100% {
            height: 100%;
          }
        }
      `}</style>
    </Tag>
  );
};

AudioToggle.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default AudioToggle;
