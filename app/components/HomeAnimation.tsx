'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './HomeAnimation.module.css';

type Props = {
  sequence: 3 | 4 | 5 | 6 | 7 | 8;
  label: string;
  alt: string;
};

const FRAME_COUNT = 30;
const LAST_FRAME = FRAME_COUNT - 1;
const ENDING_LOOPS: Partial<Record<Props['sequence'], { start: number; end: number }>> = {
  4: { start: 22, end: 24 }, // guts_23–guts_25, zero-indexed.
  7: { start: 18, end: 25 }, // guts_19–guts_26, zero-indexed.
};
const loopsAutomatically = (sequence: Props['sequence']) => sequence === 3 || sequence === 6;
const loopsAfterHover = (sequence: Props['sequence']) => sequence === 8;
const loopsFullSequence = (sequence: Props['sequence']) => loopsAutomatically(sequence) || loopsAfterHover(sequence);
const frameUrl = (sequence: number, frame: number) =>
  `/images/home-animations/sequence${sequence}/guts_${String(frame + 1).padStart(2, '0')}.webp`;

export default function HomeAnimation({ sequence, label, alt }: Props) {
  const endingLoop = ENDING_LOOPS[sequence];
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef(0);
  const [nearby, setNearby] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearby(true);
        preloadObserver.disconnect();
      }
    }, { rootMargin: '150px' });
    const visibilityObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    preloadObserver.observe(root);
    visibilityObserver.observe(root);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => {
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
      preference.removeEventListener('change', sync);
    };
  }, []);

  // Progressive batch preloading: load frame 0 first, then stream remaining frames in chunks of 5
  useEffect(() => {
    if (!nearby || reducedMotion) return;
    let cancelled = false;
    const count = endingLoop ? endingLoop.end + 1 : FRAME_COUNT;

    // Load initial frame first
    const firstImg = new window.Image();
    firstImg.src = frameUrl(sequence, 0);
    firstImg.decode().then(() => {
      if (!cancelled) setReady(true);
    }).catch(() => {
      if (!cancelled) setReady(true);
    });

    // Stream the rest in small batches of 5
    let currentIdx = 1;
    const loadNextBatch = () => {
      if (cancelled || currentIdx >= count) return;
      const batchEnd = Math.min(count, currentIdx + 5);
      const promises = [];
      for (let f = currentIdx; f < batchEnd; f++) {
        const img = new window.Image();
        img.src = frameUrl(sequence, f);
        promises.push(img.decode().catch(() => {}));
      }
      currentIdx = batchEnd;
      if (currentIdx < count) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadNextBatch, { timeout: 150 });
        } else {
          setTimeout(loadNextBatch, 50);
        }
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadNextBatch, { timeout: 80 });
    } else {
      setTimeout(loadNextBatch, 40);
    }

    return () => { cancelled = true; };
  }, [nearby, reducedMotion, sequence, endingLoop]);

  useEffect(() => {
    if (!loopsAutomatically(sequence) && started && reducedMotion && imageRef.current) {
      imageRef.current.src = frameUrl(sequence, endingLoop?.end ?? LAST_FRAME);
    }
  }, [sequence, started, reducedMotion, endingLoop]);

  // Animation playback timer - only runs when visible in the viewport!
  useEffect(() => {
    if (!ready || !visible || reducedMotion) return;
    if (!loopsAutomatically(sequence) && !started) return;
    if (!loopsFullSequence(sequence) && !endingLoop && frameRef.current >= LAST_FRAME) return;

    // Repaint current frame when scrolled back into view
    if (imageRef.current) {
      imageRef.current.src = frameUrl(sequence, frameRef.current);
    }

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      frameRef.current = loopsFullSequence(sequence)
        ? (frameRef.current + 1) % FRAME_COUNT
        : endingLoop
          ? (frameRef.current >= endingLoop.end ? endingLoop.start : frameRef.current + 1)
          : Math.min(frameRef.current + 1, LAST_FRAME);
      if (imageRef.current) imageRef.current.src = frameUrl(sequence, frameRef.current);
      if (!loopsFullSequence(sequence) && !endingLoop && frameRef.current === LAST_FRAME) window.clearInterval(timer);
    }, 1000 / 12);
    return () => window.clearInterval(timer);
  }, [ready, visible, reducedMotion, sequence, started, endingLoop]);

  const artwork = (
    <Image ref={imageRef} src={frameUrl(sequence, 0)} alt={alt}
      width={640} height={360} unoptimized className={styles.artwork} />
  );

  return (
    <div ref={rootRef} className={styles.player}>
      {!loopsAutomatically(sequence) ? (
        <button
          type="button"
          className={styles.trigger}
          aria-label={`Play ${label} animation`}
          title="Hover to play the animation ♡"
          onPointerEnter={(event) => {
            if (event.pointerType !== 'touch') setStarted(true);
          }}
          onClick={() => setStarted(true)}
          onFocus={(event) => {
            if (event.currentTarget.matches(':focus-visible')) setStarted(true);
          }}
        >
          {artwork}
        </button>
      ) : artwork}
    </div>
  );
}
