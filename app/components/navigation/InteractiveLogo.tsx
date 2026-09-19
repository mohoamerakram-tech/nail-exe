'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface InteractiveLogoProps {
  className?: string;
  variant?: 'navbar' | 'hero';
}

export default function InteractiveLogo({
  className = '',
  variant = 'navbar',
}: InteractiveLogoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Ensure video plays automatically and loops smoothly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, []);

  // Resume auto-play on leave
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isHovered) {
      video.play().catch(() => {});
    }
  }, [isHovered]);

  // Mouse scrubbing & 3D tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    // Progress 0.0 -> 1.0 based on horizontal mouse position
    const progress = x / rect.width;

    // Interactive scrub video time
    if (video.duration && !isNaN(video.duration)) {
      video.pause();
      video.currentTime = progress * video.duration;
    }

    // Specular light position
    setGlarePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });

    // 3D tilt
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    setTilt({
      rotateY: normX * 8,
      rotateX: -normY * 6,
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlarePos({ x: 50, y: 50 });
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const isNav = variant === 'navbar';

  return (
    <Link
      href="/"
      className={`group block select-none focus:outline-hidden ${className}`}
      title="nail.exe - move mouse across logo to scrub animation!"
    >
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`relative overflow-hidden cursor-pointer transition-all duration-150 ease-out border-[1.5px] border-[#9d8ab8] rounded-md shadow-[2px_2px_0px_0px_#d8b4fe] group-hover:shadow-[3px_3px_0px_0px_#f472b6] group-hover:border-[#db2777] bg-[#fdf2f7] ${
          isNav
            ? 'h-[50px] xs:h-[56px] sm:h-[62px] aspect-[990/454] w-auto'
            : 'w-full max-w-[400px] aspect-[990/454]'
        }`}
        style={{
          transform: `perspective(500px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${
            isHovered ? 1.03 : 1
          }, ${isHovered ? 1.03 : 1}, 1)`,
        }}
      >
        {/* Interactive Logo Video - showing 100% of the animation including balloons, strings, text, and heart */}
        <video
          ref={videoRef}
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          poster="/images/sequence/thumb_navbar.jpg"
          className="w-full h-full object-contain"
        >
          {/* Framed navbar version showing full logo without clipping */}
          <source src="/images/sequence/logo-navbar.mp4" type="video/mp4" />
          <source src="/images/sequence/0919.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Specular Glass Glare Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle 80px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 60%, transparent 80%)`,
          }}
        />

        {/* Subtle retro glass sheen border */}
        <div className="absolute inset-0 border border-white/40 rounded-[5px] pointer-events-none" />

        {/* Interactive Pink Status Indicator Dot */}
        <div
          className={`absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full transition-all ${
            isHovered ? 'bg-[#f472b6] animate-ping' : 'bg-[#c4b5fd]'
          }`}
        />
      </div>
    </Link>
  );
}
