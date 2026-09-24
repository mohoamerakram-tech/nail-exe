'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Promotion } from '@/lib/types';

const ROTATION_INTERVAL = 6000;

export default function HeroPromotions({ promotions }: { promotions: Promotion[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Stop automatic changes while the customer is reading or using the controls.
  useEffect(() => {
    if (paused || promotions.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % promotions.length);
    }, ROTATION_INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused, promotions.length]);

  if (!promotions.length) return null;
  const promotion = promotions[activeIndex] ?? promotions[0];
  const showPrevious = () => setActiveIndex((index) => (index - 1 + promotions.length) % promotions.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % promotions.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Latest promotions"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      className="absolute bottom-4 right-3 z-10 h-[210px] w-[285px] overflow-hidden rounded-2xl border-2 border-[#57446d] bg-white shadow-[4px_4px_0_#57446d] sm:bottom-8 sm:right-12 sm:h-[340px] sm:w-[500px] lg:right-16"
    >
      <div className="absolute inset-0">
        {promotions.map((item, index) => (
          <Image
            key={item.id}
            src={item.image}
            alt={index === activeIndex ? item.imageAlt : ''}
            fill
            priority={index === 0}
            sizes="(max-width: 640px) 285px, 500px"
            className={`object-cover transition-[opacity,transform] duration-700 ${
              index === activeIndex ? 'scale-100 opacity-100' : 'pointer-events-none scale-105 opacity-0'
            }`}
          />
        ))}
      </div>

      <div className={`absolute inset-0 bg-gradient-to-r ${promotion.theme}`} />
      <div className="absolute inset-y-0 left-0 w-[76%] bg-gradient-to-r from-white/95 via-white/82 to-transparent" />

      <div className="relative flex h-full max-w-[220px] flex-col justify-end p-3 sm:max-w-[330px] sm:p-5">
        <span className="mb-1.5 w-fit rounded-md border border-[#57446d] bg-white/90 px-2 py-1 font-pixel text-[7px] text-[#db2777] shadow-[1px_1px_0_#57446d] sm:text-[8px]">
          {promotion.eyebrow}
        </span>
        <h2 aria-live="polite" className="font-pixel-title text-sm leading-tight text-[#3b2b4e] sm:text-xl">
          {promotion.title}
        </h2>
        <p className="mt-1 hidden max-w-[280px] font-pixel-body text-xs leading-snug text-[#57446d] sm:block">
          {promotion.description}
        </p>
        <Link href={promotion.href} className="mt-2 w-fit rounded-lg border-2 border-[#57446d] bg-[#fbcfe8] px-2.5 py-1.5 font-pixel text-[8px] text-[#3b2b4e] shadow-[2px_2px_0_#57446d] transition-transform hover:-translate-y-0.5 sm:mt-3 sm:px-3 sm:py-2 sm:text-[9px]">
          {promotion.action} ➔
        </Link>
      </div>

      <div className="absolute left-2 top-2 flex items-center gap-1.5 sm:left-3 sm:top-3">
        <span className="rounded-md border border-[#57446d] bg-white/90 px-1.5 py-1 font-pixel text-[7px] text-[#57446d]">
          {String(activeIndex + 1).padStart(2, '0')}/{String(promotions.length).padStart(2, '0')}
        </span>
        <button type="button" onClick={showPrevious} aria-label="Previous promotion" className="retro-btn bg-white/95">‹</button>
        <button type="button" onClick={showNext} aria-label="Next promotion" className="retro-btn bg-white/95">›</button>
      </div>

      <div className="absolute left-2 top-10 flex gap-1.5 sm:left-3 sm:top-11">
        {promotions.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Show promotion ${index + 1}: ${item.title}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full border border-[#57446d] transition-all ${
              index === activeIndex ? 'w-6 bg-[#db2777]' : 'w-2.5 bg-white/90 hover:bg-[#fbcfe8]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
