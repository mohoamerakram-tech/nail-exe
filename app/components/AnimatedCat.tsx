'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 30;
const HOVER_FRAME = 24; // Frame 25, using zero-based indexing.
const FRAME_DURATION = 1000 / 12;
const frameUrl = (sequence: number, frame: number) =>
  `/images/cat-animation/sequence${sequence}/guts_${String(frame + 1).padStart(2, '0')}.webp`;

export default function AnimatedCat({ className = '' }: { className?: string } = {}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const playbackRef = useRef({ sequence: 1, frame: 0 });
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const active = hovered || focused || tapped;

  useEffect(() => {
    let cancelled = false;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener('change', syncPreference);

    // Decode before playback so switching sequences never flashes an empty frame.
    Promise.all([1, 2].flatMap((sequence) =>
      Array.from({ length: FRAME_COUNT }, (_, frame) => {
        const image = new window.Image();
        image.src = frameUrl(sequence, frame);
        return image.decode();
      }),
    )).then(() => {
      if (!cancelled) setReady(true);
    }).catch(() => { /* Keep the first frame visible if an asset cannot load. */ });

    return () => {
      cancelled = true;
      preference.removeEventListener('change', syncPreference);
    };
  }, []);

  useEffect(() => {
    if (!ready || !imageRef.current) return;
    const playback = playbackRef.current;
    if (active) {
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
  }, [active, ready, reducedMotion]);

  return (
    <button
      type="button"
      aria-label="Say hello to the cat"
      title="Hover to say hello ♡"
      onPointerEnter={(event) => { if (event.pointerType !== 'touch') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocus={(event) => { if (event.currentTarget.matches(':focus-visible')) setFocused(true); }}
      onBlur={() => { setFocused(false); setTapped(false); }}
      onPointerUp={(event) => {
        if (event.pointerType === 'touch') setTapped((value) => !value);
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
