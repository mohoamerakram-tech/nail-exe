'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface InteractiveLogoProps {
  className?: string;
  variant?: 'navbar' | 'hero';
}

const FRAME_COUNT = 60;
const LOOP_DURATION_MS = 6000; // 6 seconds for every complete loop
const FRAME_DURATION = LOOP_DURATION_MS / FRAME_COUNT; // 100ms per frame (10 FPS)
const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 405;

const getFrameUrl = (frameIndex: number) =>
  `/images/moving-logo/optimized/guts_${String(frameIndex + 1).padStart(2, '0')}.webp`;

// Shared image cache so navbar and hero reuse decoded images instantly
const imageCache: HTMLImageElement[] = [];
let cacheLoaded = false;
const listeners: (() => void)[] = [];

function initImageCache() {
  if (typeof window === 'undefined' || imageCache.length > 0) return;

  // 1. Immediately load frame 0 for instant initial paint
  const firstImg = new window.Image();
  firstImg.src = getFrameUrl(0);
  firstImg.onload = () => {
    cacheLoaded = true;
    listeners.forEach((fn) => fn());
  };
  firstImg.decode().catch(() => {});
  imageCache[0] = firstImg;

  // 2. Progressively stream the remaining frames in batches of 6 (matching browser concurrent connections)
  let nextIndex = 1;
  const loadBatch = () => {
    const end = Math.min(FRAME_COUNT, nextIndex + 6);
    for (let i = nextIndex; i < end; i++) {
      const img = new window.Image();
      img.src = getFrameUrl(i);
      img.decode().catch(() => {});
      imageCache[i] = img;
    }
    nextIndex = end;
    if (nextIndex < FRAME_COUNT) {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadBatch, { timeout: 150 });
      } else {
        setTimeout(loadBatch, 50);
      }
    }
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadBatch, { timeout: 80 });
  } else {
    setTimeout(loadBatch, 40);
  }
}

export default function InteractiveLogo({
  className = '',
  variant = 'navbar',
}: InteractiveLogoProps) {
  const isNav = variant === 'navbar';
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isStationaryRef = useRef(false);
  const idleResumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  const [inView, setInView] = useState(isNav); // Navbar is sticky top, always in view
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  // Fast GPU canvas paint function
  const renderFrameToCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const clamped = ((frameIndex % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;
    const img = imageCache[clamped] || imageCache[0];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }, []);

  // Set frame & schedule immediate paint via requestAnimationFrame
  const setFrame = useCallback(
    (newFrame: number) => {
      const clamped = ((newFrame % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;
      frameRef.current = clamped;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        renderFrameToCanvas(clamped);
      });
    },
    [renderFrameToCanvas]
  );

  // Viewport intersection observer: pause hero logo when scrolled out of view
  useEffect(() => {
    if (isNav) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: '120px' }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [isNav]);

  // Initialize cache and initial paint
  useEffect(() => {
    initImageCache();

    const checkReady = () => {
      renderFrameToCanvas(frameRef.current);
    };

    if (cacheLoaded) {
      checkReady();
    } else {
      listeners.push(checkReady);
    }

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReducedMotion(preference.matches);
    syncMotion();
    preference.addEventListener('change', syncMotion);

    return () => {
      preference.removeEventListener('change', syncMotion);
      const idx = listeners.indexOf(checkReady);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }, [renderFrameToCanvas]);

  // Paint initial frame when canvas mounts or becomes visible
  useEffect(() => {
    if (inView) {
      renderFrameToCanvas(frameRef.current);
    }
  }, [inView, renderFrameToCanvas]);

  // Snappy auto-play loop (only runs when element is actually in view!)
  useEffect(() => {
    if (reducedMotion || !inView) return;

    const interval = setInterval(() => {
      if (document.hidden) return;

      // Advance if not hovered, or if cursor is resting stationary inside
      if (!isHoveredRef.current || isStationaryRef.current) {
        setFrame(frameRef.current + 1);
      }
    }, FRAME_DURATION);

    return () => clearInterval(interval);
  }, [reducedMotion, inView, setFrame]);

  // Handle pointer enter
  const handlePointerEnter = useCallback(() => {
    isHoveredRef.current = true;
    isStationaryRef.current = false;
    setIsHovered(true);

    if (idleResumeTimerRef.current) {
      clearTimeout(idleResumeTimerRef.current);
      idleResumeTimerRef.current = null;
    }
  }, []);

  // Handle pointer leave
  const handlePointerLeave = useCallback(() => {
    isHoveredRef.current = false;
    isStationaryRef.current = false;
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlarePos({ x: 50, y: 50 });

    if (idleResumeTimerRef.current) {
      clearTimeout(idleResumeTimerRef.current);
      idleResumeTimerRef.current = null;
    }
  }, []);

  // Ultra-responsive mouse scrub + 3D tilt
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      isStationaryRef.current = false;

      const rect = container.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;

      const normX = Math.max(0, Math.min(1, rawX / rect.width));
      const normY = Math.max(0, Math.min(1, rawY / rect.height));

      // 1:1 scrub: horizontally maps directly to frames 0..59
      const targetFrame = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(normX * FRAME_COUNT))
      );
      setFrame(targetFrame);

      // Specular highlight coordinate
      setGlarePos({
        x: Math.round(normX * 100),
        y: Math.round(normY * 100),
      });

      // 3D perspective tilt
      const tiltX = -(normY - 0.5) * 12;
      const tiltY = (normX - 0.5) * 14;
      setTilt({ rotateX: tiltX, rotateY: tiltY });

      // If user holds cursor still inside for >350ms, resume auto-play smoothly
      if (idleResumeTimerRef.current) {
        clearTimeout(idleResumeTimerRef.current);
      }
      idleResumeTimerRef.current = setTimeout(() => {
        if (isHoveredRef.current) {
          isStationaryRef.current = true;
        }
      }, 350);
    },
    [setFrame]
  );

  return (
    <Link
      href="/"
      className={`group block select-none focus:outline-hidden ${className}`}
      title="nail.exe ♡ scrub with mouse!"
    >
      <div
        ref={containerRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        className={`relative overflow-hidden cursor-ew-resize sm:cursor-pointer transition-transform duration-75 ease-out border-2 border-[#57446d] rounded-xl shadow-[2.5px_2.5px_0px_0px_#57446d] group-hover:shadow-[3px_3px_0px_0px_#f472b6] group-hover:border-[#db2777] bg-[#fdf2f7] ${
          isNav
            ? 'h-[48px] xs:h-[54px] sm:h-[58px] aspect-[16/9] w-auto'
            : 'w-full aspect-[16/9]'
        }`}
        style={{
          transform: `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${
            isHovered ? 1.03 : 1
          }, ${isHovered ? 1.03 : 1}, 1)`,
        }}
      >
        {/* Hardware-Accelerated Canvas Animation */}
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full object-cover pointer-events-none select-none block"
        />

        {/* Dynamic Specular Glass Glare Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-150 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle 90px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 55%, transparent 80%)`,
          }}
        />

        {/* Subtle retro glass sheen border */}
        <div className="absolute inset-0 border border-white/40 rounded-xl pointer-events-none" />

        {/* Interactive Pink Status Indicator Dot */}
        <div
          className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full transition-all duration-200 ${
            isHovered
              ? 'bg-[#db2777] ring-2 ring-[#f472b6]/60 shadow-[0_0_6px_#db2777]'
              : 'bg-[#c4b5fd]'
          }`}
        />
      </div>
    </Link>
  );
}
