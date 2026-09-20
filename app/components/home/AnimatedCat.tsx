'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 30;
const HOVER_FRAME = 24; // Frame 25, using zero-based indexing.
const FRAME_DURATION = 1000 / 12;
const frameUrl = (sequence: number, frame: number) =>
  `/images/cat-animation/sequence${sequence}/guts_${String(frame + 1).padStart(2, '0')}.webp`;

let seq2Preloaded = false;
function preloadSequence2() {
  if (seq2Preloaded || typeof window === 'undefined') return;
  seq2Preloaded = true;
  for (let frame = 0; frame < FRAME_COUNT; frame++) {
    const image = new window.Image();
    image.src = frameUrl(2, frame);
    image.decode().catch(() => {});
  }
}

export default function AnimatedCat({ className = '' }: { className?: string } = {}) {
  const rootRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const playbackRef = useRef({ sequence: 1, frame: 0 });
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const active = hovered || focused || tapped;

  // Pause the two-sequence player while the hero is off-screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Load the idle loop first, then prepare the hover greeting when the browser is idle.
  useEffect(() => {
    let cancelled = false;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener('change', syncPreference);

    Promise.all(
      Array.from({ length: FRAME_COUNT }, (_, frame) => {
        const image = new window.Image();
        image.src = frameUrl(1, frame);
        return image.decode();
      })
    )
      .then(() => {
        if (!cancelled) {
          setReady(true);
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(preloadSequence2, { timeout: 1000 });
          } else {
            setTimeout(preloadSequence2, 500);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
      preference.removeEventListener('change', syncPreference);
    };
  }, []);

  // Hover holds frame 25; on leave, finish sequence 2 before returning to sequence 1.
  useEffect(() => {
    if (!ready || !imageRef.current || !visible) return;
    const playback = playbackRef.current;
    if (active) {
      preloadSequence2();
      playback.sequence = 2;
      playback.frame = reducedMotion ? HOVER_FRAME : 0;
    } else if (reducedMotion) {
      playback.sequence = 1;
      playback.frame = 0;
    }
    imageRef.current.src = frameUrl(playback.sequence, playback.frame);
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      if (active) {
        playback.frame = Math.min(playback.frame + 1, HOVER_FRAME);
      } else if (playback.sequence === 2 && playback.frame === FRAME_COUNT - 1) {
        playback.sequence = 1;
        playback.frame = 0;
      } else {
        playback.frame = (playback.frame + 1) % FRAME_COUNT;
      }
      if (imageRef.current) imageRef.current.src = frameUrl(playback.sequence, playback.frame);
      if (active && playback.frame === HOVER_FRAME) window.clearInterval(timer);
    }, FRAME_DURATION);
    return () => window.clearInterval(timer);
  }, [active, ready, visible, reducedMotion]);

  return (
    <button
      ref={rootRef}
      type="button"
      aria-label="Say hello to the cat"
      title="Hover to say hello ♡"
      onPointerEnter={(event) => {
        preloadSequence2();
        if (event.pointerType !== 'touch') setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={(event) => {
        preloadSequence2();
        if (event.currentTarget.matches(':focus-visible')) setFocused(true);
      }}
      onBlur={() => {
        setFocused(false);
        setTapped(false);
      }}
      onPointerUp={(event) => {
        if (event.pointerType === 'touch') {
          preloadSequence2();
          setTapped((value) => !value);
        }
      }}
      className={`group absolute bottom-3 right-4 sm:bottom-4 sm:right-6 z-20 w-[144px] sm:w-[180px] cursor-pointer rounded-md shadow-[3px_3px_0_#57446d] transition-shadow duration-200 hover:shadow-[4px_4px_0_#f472b6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#db2777] ${className}`}
    >
      <Image
        ref={imageRef}
        src={frameUrl(1, 0)}
        alt="Animated grey kitten in a tiny lavender window"
        width={360}
        height={230}
        unoptimized
        className="pointer-events-none block h-auto w-full rounded-md"
      />
    </button>
  );
}
