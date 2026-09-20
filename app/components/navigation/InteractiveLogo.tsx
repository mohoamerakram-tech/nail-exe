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
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;

const getFrameUrl = (frameIndex: number) =>
  `/images/moving-logo/optimized/guts_${String(frameIndex + 1).padStart(2, '0')}.webp`;

// Shared image cache so navbar and hero reuse decoded images instantly
const imageCache: HTMLImageElement[] = [];
let cacheLoaded = false;
const listeners: (() => void)[] = [];

function initImageCache() {
  if (typeof window === 'undefined' || imageCache.length > 0) return;

  let loadedCount = 0;
  for (let i = 0; i < FRAME_COUNT; i++) {
    const img = new window.Image();
    img.src = getFrameUrl(i);
    img.onload = () => {
      loadedCount++;
      if (loadedCount >= 1 && !cacheLoaded) {
        cacheLoaded = true;
        listeners.forEach((fn) => fn());
      }
    };
    img.decode().catch(() => {});
    imageCache[i] = img;
  }
}

export default function InteractiveLogo({
  className = '',
  variant = 'navbar',
}: InteractiveLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isStationaryRef = useRef(false);
  const idleResumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Fast GPU canvas paint function
  const renderFrameToCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const clamped = ((frameIndex % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;
    const img = imageCache[clamped];
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

  // Initialize cache and initial paint
  useEffect(() => {
    initImageCache();

    const checkReady = () => {
      setIsReady(true);
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

  // Paint initial frame when canvas mounts
  useEffect(() => {
    renderFrameToCanvas(0);
  }, [renderFrameToCanvas]);

  // Snappy auto-play loop (18 fps)
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      if (document.hidden) return;

      // Advance if not hovered, or if cursor is resting stationary inside
      if (!isHoveredRef.current || isStationaryRef.current) {
        setFrame(frameRef.current + 1);
      }
    }, FRAME_DURATION);

    return () => clearInterval(interval);
  }, [reducedMotion, setFrame]);

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

  // Ultra-responsive 60 FPS mouse scrub + 3D tilt
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

      // 1:1 scrub: horizontally maps directly to frames 0..29
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

      // If user holds cursor still inside for >400ms, resume auto-play smoothly
      if (idleResumeTimerRef.current) {
        clearTimeout(idleResumeTimerRef.current);
      }
      idleResumeTimerRef.current = setTimeout(() => {
        if (isHoveredRef.current) {
          isStationaryRef.current = true;
        }
      }, 400);
    },
    [setFrame]
  );

  const isNav = variant === 'navbar';

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
