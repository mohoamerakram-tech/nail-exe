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
        {/* RETRO SHOP BANNER */}
        <div className="retro-pixel-window w-full bg-gradient-to-r from-[#d8b4fe] via-[#ede9fe] to-[#fbcfe8] overflow-hidden relative pixel-grid-canvas">
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
              <div className="flex items-center gap-1.5 text-xs text-[#5b21b6] animate-pixel-twinkle">
                <span>☾</span>
                <span>✨</span>
              </div>
            </div>

            {/* Center Pixel Header Text */}
            <div className="text-center">
              <h1 className="font-pixel-title text-lg sm:text-2xl text-[#3b2b4e] uppercase tracking-wider">
                PRETTY NAILS BRIGHTER DAYS
              </h1>
              <div className="text-[#db2777] text-sm mt-0.5">♡</div>
            </div>

            {/* Right Popup Bubble */}
            <div className="hidden sm:flex bg-white/95 border-2 border-[#57446d] rounded-xl p-2.5 font-pixel-body text-xs text-[#3b2b4e] shadow-[2.5px_2.5px_0px_0px_#57446d] flex-col items-center">
              <span>same girl...</span>
              <span className="font-bold text-[#db2777]">different nails &lt;3</span>
            </div>
          </div>
        </div>

        {/* Title Bar with Mood */}
        <div className="flex items-center justify-between border-b-2 border-[#57446d] pb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-pixel-title text-[#3b2b4e]">
              Shop All Sets
            </h2>
            <span className="text-[#db2777] text-lg">♡</span>
          </div>

          <span className="font-pixel-arcade text-[8px] text-[#db2777] hidden sm:inline">
            ★ NOT JUST NAILS, A MOOD ★
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
                className={`px-3.5 py-1.5 rounded-lg border-2 text-xs font-pixel transition-all ${
                  isSelected
                    ? 'bg-[#fbcfe8] border-[#57446d] text-[#3b2b4e] shadow-[2px_2px_0px_0px_#57446d]'
                    : 'bg-white border-[#57446d] text-[#57446d] hover:bg-[#fce7f3] shadow-[1.5px_1.5px_0px_0px_#57446d]'
                }`}
              >
                [{cat.label}]
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-2">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Bottom Mascot Footer Note */}
        <div className="mt-8 pt-6 border-t-2 border-[#57446d] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-pixel text-[#57446d]">
          {/* Left Note */}
          <div className="bg-white pixel-card rounded-xl px-3 py-2 flex items-center gap-2 font-pixel-title text-[10px]">
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
            <span className="text-[#db2777]">♡</span>
          </div>
        </div>
      </div>
    </div>
  );
}
