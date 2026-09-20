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
const FRAME_DURATION = 1000 / 12;
const FULL_LOOP = { start: 0, end: LAST_FRAME };
// Frame numbers in code are zero-based; sequence 4 loops 23–25 and sequence 7 loops 19–26.
const ENDING_LOOPS: Partial<Record<Props['sequence'], { start: number; end: number }>> = {
  4: { start: 22, end: 24 },
  7: { start: 18, end: 25 },
};
const frameUrl = (sequence: number, frame: number) =>
  `/images/home-animations/sequence${sequence}/guts_${String(frame + 1).padStart(2, '0')}.webp`;

export default function HomeAnimation({ sequence, label, alt }: Props) {
  const startsAutomatically = sequence === 3 || sequence === 6;
  // Sequence 5 plays once; the others loop either from frame 1 or from a custom ending.
  const loop = ENDING_LOOPS[sequence] ?? (sequence === 5 ? null : FULL_LOOP);
  const lastFrame = loop?.end ?? LAST_FRAME;
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef(0);
  const [nearby, setNearby] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [started, setStarted] = useState(false);

  // Preload as the player approaches the viewport, and pause playback while it is off-screen.
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

  // Show the first frame as soon as it decodes, then preload the rest in small batches.
  useEffect(() => {
    if (!nearby || reducedMotion) return;
    let cancelled = false;
    const loadFrame = (frame: number) => {
      const image = new window.Image();
      image.src = frameUrl(sequence, frame);
      return image.decode().catch(() => {});
    };

    const preload = async () => {
      await loadFrame(0);
      if (cancelled) return;
      setReady(true);
      for (let first = 1; first <= lastFrame; first += 5) {
        const count = Math.min(5, lastFrame - first + 1);
        await Promise.all(Array.from({ length: count }, (_, offset) => loadFrame(first + offset)));
        if (cancelled) return;
      }
    };
    void preload();

    return () => { cancelled = true; };
  }, [nearby, reducedMotion, sequence, lastFrame]);

  // Hover-triggered cats show their final pose when the user prefers reduced motion.
  useEffect(() => {
    if (!startsAutomatically && started && reducedMotion && imageRef.current) {
      imageRef.current.src = frameUrl(sequence, lastFrame);
    }
  }, [sequence, started, reducedMotion, startsAutomatically, lastFrame]);

  // Run one timer per visible player; its loop range determines whether it repeats or stops.
  useEffect(() => {
    if (!ready || !visible || reducedMotion) return;
    if (!startsAutomatically && !started) return;
    if (!loop && frameRef.current >= lastFrame) return;

    // Restore the current frame after scrolling back into view.
    if (imageRef.current) {
      imageRef.current.src = frameUrl(sequence, frameRef.current);
    }

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      frameRef.current = frameRef.current >= lastFrame
        ? (loop?.start ?? lastFrame)
        : frameRef.current + 1;
      if (imageRef.current) imageRef.current.src = frameUrl(sequence, frameRef.current);
      if (!loop && frameRef.current === lastFrame) window.clearInterval(timer);
    }, FRAME_DURATION);
    return () => window.clearInterval(timer);
  }, [ready, visible, reducedMotion, sequence, started, startsAutomatically, loop, lastFrame]);

  const artwork = (
    <Image ref={imageRef} src={frameUrl(sequence, 0)} alt={alt}
      width={640} height={360} unoptimized className={styles.artwork} />
  );

  return (
    <div ref={rootRef} className={styles.player}>
      {!startsAutomatically ? (
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
