'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';

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

  // Viewport intersection observer: pause timer when scrolled away
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

  // Preload Sequence 1 immediately on mount; defer Sequence 2 to idle time or hover
  useEffect(() => {
    let cancelled = false;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener('change', syncPreference);

    // Preload only Sequence 1 first (cuts initial cat requests in half!)
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
          // Queue Sequence 2 during browser idle time so it's ready when user reaches for it
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

  // Ensure Sequence 2 is preloaded on hover/focus
  const triggerSequence2 = useCallback(() => {
    preloadSequence2();
  }, []);

  useEffect(() => {
    if (!ready || !imageRef.current || !visible) return;
    const playback = playbackRef.current;
    if (active) {
      triggerSequence2();
      playback.sequence = 2;
      playback.frame = reducedMotion ? HOVER_FRAME : 0;
    } else if (reducedMotion) {
      playback.sequence = 1;
      playback.frame = 0;
    }
    // On leave, preserve the current greeting frame and play out its ending.
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
  }, [active, ready, visible, reducedMotion, triggerSequence2]);

  return (
    <button
      ref={rootRef}
      type="button"
      aria-label="Say hello to the cat"
      title="Hover to say hello ♡"
      onPointerEnter={(event) => {
        triggerSequence2();
        if (event.pointerType !== 'touch') setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={(event) => {
        triggerSequence2();
        if (event.currentTarget.matches(':focus-visible')) setFocused(true);
      }}
      onBlur={() => {
        setFocused(false);
        setTapped(false);
      }}
      onPointerUp={(event) => {
        if (event.pointerType === 'touch') {
          triggerSequence2();
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
