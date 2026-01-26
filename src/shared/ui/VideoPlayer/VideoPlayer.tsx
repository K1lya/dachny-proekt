import React, { memo, useRef, useState } from 'react';
import styles from './VideoPlayer.module.css';
import clsx from 'clsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

type Props = {
  src: string;
  poster?: string;
};

export const VideoPlayer: React.FC<Props> = memo(({ src, poster }) => {
  const view = useView();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      await v.play();
      setIsPlaying(true);
    } catch {
      // браузер мог заблокировать play
    }
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused || v.ended) {
      void play();
      return;
    }

    v.pause();
    setIsPlaying(false);
  };

  return (
    <div
      className={clsx(styles.root, {
        [styles.rootTablet]: view === EView.TABLET,
        [styles.rootMobile]: view === EView.MOBILE,
      })}
    >
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster}
        playsInline
        preload='metadata'
        onClick={toggle}
        onEnded={() => setIsPlaying(false)}
      />

      {!isPlaying && (
        <button
          type='button'
          className={styles.playButton}
          onClick={play}
          aria-label='Play'
        >
          <svg
            width='84'
            height='84'
            viewBox='0 0 84 84'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle opacity='0.72' cx='42' cy='42' r='42' fill='#EAE7DC' />
            <path d='M59 41.5L32.75 56.6554L32.75 26.3446L59 41.5Z' fill='#E98074' />
          </svg>
        </button>
      )}
    </div>
  );
});
