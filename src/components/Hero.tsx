import { useEffect, useRef, useState } from 'react';
import { guides } from '../content/guides';

const HERO_VIDEO_SLUGS = guides.map((g) => g.slug);

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [slug] = useState(() => {
    const i = Math.floor(Math.random() * HERO_VIDEO_SLUGS.length);
    return HERO_VIDEO_SLUGS[i];
  });
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      /* muted autoplay may still be blocked on some browsers; poster shows */
    });
  }, []);

  function enableSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    v.play().catch(() => {
      /* ignore, control still flips visually */
    });
    setSoundEnabled(true);
  }

  const base = import.meta.env.BASE_URL;

  return (
    <section className="hero" id="top">
      <div className="hero__media">
        <video
          ref={videoRef}
          className="hero__video"
          src={`${base}videos/${slug}.mp4`}
          poster={`${base}video-posters/${slug}.jpg`}
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <p className="eyebrow">Coffee for Today</p>
        <h1 className="hero__title">A Rite of Coffee</h1>
        <p className="hero__subtitle">
          Six vessels. Six methods of extraction. One dark ceremony, performed
          the same way it has always been performed, deliberately, and alone.
        </p>

        {!soundEnabled && (
          <button
            type="button"
            className="hero__sound-btn"
            onClick={enableSound}
            aria-label="Play with sound"
          >
            <span className="hero__sound-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="6,4 20,12 6,20" fill="currentColor" />
              </svg>
            </span>
            Play with sound
          </button>
        )}

        <a className="hero__cta" href="#pour-over">
          Begin the Rite
          <span className="hero__cta-line" aria-hidden="true" />
        </a>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
