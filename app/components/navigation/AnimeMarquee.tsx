'use client';

import React from 'react';
import { PARTNER_ANIMES } from './constants';

export default function AnimeMarquee() {
  // Duplicate array twice to ensure seamless continuous infinite marquee loop
  const marqueeItems = [...PARTNER_ANIMES, ...PARTNER_ANIMES, ...PARTNER_ANIMES];

  return (
    <div className="relative w-full bg-black border-y-2 border-zinc-800 overflow-hidden py-1.5 select-none z-30">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {marqueeItems.map((anime, idx) => (
          <div key={`${anime.id}-${idx}`} className="flex items-center gap-3">
            <span className="text-[#ff2d78] font-mono text-xs font-black">┼</span>
            <span className="text-white font-mono text-xs font-black tracking-widest uppercase">
              {anime.name}
            </span>
            <span className="text-zinc-500 font-serif text-[11px] hidden sm:inline">
              {anime.japaneseName}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.2 bg-zinc-900 border border-zinc-800">
              {anime.tagline}
            </span>
            <span className="text-[10px] font-mono text-[#ff2d78] font-bold">
              EST. {anime.year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
