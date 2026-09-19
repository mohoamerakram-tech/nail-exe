import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByVibe } from '@/lib/products';
import { NailVibe } from '@/lib/types';
import ProductCard from '@/app/components/shop/ProductCard';

export const metadata = {
  title: 'SHOP PRESS ON NAILS // NAIL.EXE',
  description: 'Handmade salon-quality reusable press-on nails. Coquette, Alt Girl, Minimal, and Custom sets.',
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ vibe?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentVibe = (resolvedParams?.vibe as NailVibe | 'all') || 'all';

  const products = getProductsByVibe(currentVibe);

  const vibeCategories: { id: NailVibe | 'all'; label: string }[] = [
    { id: 'all', label: 'All Nails' },
    { id: 'coquette', label: 'Coquette' },
    { id: 'alt-girl', label: 'Alt Girl' },
    { id: 'minimal', label: 'Minimal' },
    { id: 'custom-sets', label: 'Custom Sets' },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-5xl px-3 sm:px-6 py-6 flex flex-col gap-6">
        {/* RETRO SHOP BANNER (Matching Image 2) */}
        <div className="retro-window w-full bg-gradient-to-r from-[#d8b4fe] via-[#ede9fe] to-[#fbcfe8] overflow-hidden relative">
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            {/* Left Cat on Clouds */}
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-14 shrink-0">
                <Image
                  src="/images/icons/cat-grey.png"
                  alt="Cute sleeping cat on cloud"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#5b21b6]">
                <span>☾</span>
                <span>✨</span>
              </div>
            </div>

            {/* Center Pixel Header Text */}
            <div className="text-center">
              <h1 className="font-mono font-black text-xl sm:text-2xl text-[#3b2b4e] uppercase tracking-wider">
                PRETTY NAILS BRIGHTER DAYS
              </h1>
              <div className="text-[#f472b6] text-sm mt-0.5">♡</div>
            </div>

            {/* Right Popup Bubble */}
            <div className="hidden sm:flex bg-white/95 border border-[#8e7ea8] rounded-xs p-2 text-[10px] font-mono text-[#4a3856] shadow-[2px_2px_0px_0px_#c4b5fd] flex-col items-center">
              <span>same girl...</span>
              <span className="font-bold text-[#db2777]">different nails &lt;3</span>
            </div>
          </div>
        </div>

        {/* Title Bar with Mood */}
        <div className="flex items-center justify-between border-b-[1.5px] border-[#c4b5fd] pb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-mono font-black text-[#3b2b4e]">
              Shop
            </h2>
            <span className="text-[#f472b6] text-xl">♡</span>
          </div>

          <span className="text-sm font-serif italic text-[#8e7ea8] hidden sm:inline">
            not just nails, a mood. ♡
          </span>
        </div>

        {/* Vibe Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {vibeCategories.map((cat) => {
            const isSelected =
              cat.id === currentVibe || (cat.id === 'all' && (!currentVibe || currentVibe === 'all'));
            return (
              <Link
                key={cat.id}
                href={cat.id === 'all' ? '/shop' : `/shop?vibe=${cat.id}`}
                className={`px-3.5 py-1.5 rounded-sm border text-xs font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-[#fbcfe8] border-[#8e7ea8] text-[#3b2b4e] shadow-[2px_2px_0px_0px_#8e7ea8]'
                    : 'bg-white border-[#c4b5fd] text-[#6b5b82] hover:border-[#8e7ea8]'
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Product Grid (Exact Layout from Image 2) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-2">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Bottom Mascot Footer Note (from Image 2) */}
        <div className="mt-8 pt-6 border-t border-[#e2d5f1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6b5b82]">
          {/* Left Note */}
          <div className="bg-white border border-[#bca6df] rounded-xs px-3 py-2 shadow-[2px_2px_0px_0px_#e9d5ff] flex items-center gap-2">
            <span>🌸</span>
            <span>happier days ahead &lt;3</span>
          </div>

          <span>made with love in morocco ♡</span>

          {/* Right Calico Kitty on Cloud */}
          <div className="flex items-center gap-2">
            <div className="relative w-14 h-12">
              <Image
                src="/images/icons/cat-calico.png"
                alt="Cute calico cat"
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <span className="text-[#f472b6]">♡</span>
          </div>
        </div>
      </div>
    </div>
  );
}
