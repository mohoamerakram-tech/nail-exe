import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/app/components/shop/ProductCard';
import InteractiveLogo from '@/app/components/navigation/InteractiveLogo';

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Centered Main Layout Container */}
      <div className="w-full max-w-5xl px-3 sm:px-6 py-6 flex flex-col gap-8">
        {/* 1. HERO RETRO WINDOW */}
        <div className="retro-window w-full">
          {/* Window Header */}
          <div className="retro-window-header">
            <div className="flex items-center gap-2">
              <span className="text-[#f472b6]">♡</span>
              <span className="text-xs font-mono font-bold text-[#4a3856]">
                nail.exe
              </span>
            </div>
            <div className="retro-btn-box">
              <button type="button" className="retro-btn">—</button>
              <button type="button" className="retro-btn">❐</button>
              <button type="button" className="retro-btn">✕</button>
            </div>
          </div>

          {/* Hero Window Canvas */}
          <div className="relative w-full h-[380px] sm:h-[480px] overflow-hidden bg-gradient-to-b from-[#bce0fd] via-[#fce7f3] to-[#fdf4f7]">
            {/* Background Clouds */}
            <div className="absolute inset-0 pointer-events-none opacity-80">
              <div className="absolute -top-10 -left-10 w-64 h-48 bg-white/70 rounded-full blur-xl" />
              <div className="absolute top-10 right-10 w-80 h-56 bg-white/70 rounded-full blur-xl" />
            </div>

            {/* Floating Sparkles & Heart */}
            <div className="absolute top-12 left-1/4 text-[#f472b6] text-xl animate-pulse">✦</div>
            <div className="absolute top-20 right-1/3 text-white text-lg">✨</div>
            <div className="absolute top-10 right-48 text-[#f472b6] text-2xl">♡</div>

            {/* Left Content: Interactive Logo & Floating Note */}
            <div className="absolute top-8 left-6 sm:left-10 z-20 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <InteractiveLogo variant="hero" className="w-[230px] sm:w-[300px]" />
              </div>

              {/* Floating Note Window */}
              <div className="bg-white/95 border-[1.5px] border-[#9d8ab8] rounded-sm p-3 shadow-[3px_3px_0px_0px_#d8b4fe] max-w-[200px] flex flex-col gap-1.5 backdrop-blur-xs">
                <div className="flex items-center justify-between text-[10px] font-mono border-b border-[#fbcfe8] pb-1">
                  <span className="text-[#db2777]">♡ about.me</span>
                  <span className="text-[#8e7ea8]">✕</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base text-[#f472b6]">💖</span>
                  <p className="text-[11px] font-mono font-bold text-[#4a3856] leading-tight">
                    PRETTY HANDS <br />BRIGHTER DAYS &lt;3
                  </p>
                </div>
              </div>
            </div>

            {/* Center-Right: Aesthetic Model Hand Photo */}
            <div className="absolute inset-y-0 right-0 sm:right-16 w-[340px] sm:w-[480px] z-10 pointer-events-none">
              <Image
                src="/images/nails/hero-hand.jpg"
                alt="Model hand wearing press on nails"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain object-bottom sm:object-center"
              />
            </div>

            {/* Right Desktop Folders */}
            <div className="hidden lg:flex absolute top-8 right-6 z-20 flex-col gap-3">
              {[
                { label: 'NAILS', icon: '📁' },
                { label: 'SELF LOVE', icon: '📁' },
                { label: 'CUTE STUFF', icon: '📁' },
                { label: 'HAPPIER DAYS', icon: '📁' },
              ].map((f) => (
                <Link
                  key={f.label}
                  href="/shop"
                  className="flex items-center gap-2 px-2 py-1 bg-white/80 border border-[#bca6df] rounded-xs text-[10px] font-mono font-bold text-[#4a3856] hover:bg-[#fbcfe8] transition-colors shadow-[1.5px_1.5px_0px_0px_#d8b4fe]"
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </Link>
              ))}
            </div>

            {/* Floating Thought Bubble: "same girl... different nails <3" */}
            <div className="hidden sm:flex absolute bottom-8 right-12 z-20 bg-white/95 border-[1.5px] border-[#9d8ab8] rounded-md px-3 py-2 text-[11px] font-mono text-[#4a3856] shadow-[2px_2px_0px_0px_#d8b4fe] flex-col items-center">
              <span>same girl...</span>
              <span className="font-bold text-[#db2777]">different nails &lt;3</span>
            </div>

            {/* Sleeping Angel Kitty on Cloud */}
            <div className="absolute bottom-2 right-44 z-20 hidden md:block">
              <div className="relative w-20 h-16">
                <Image
                  src="/images/icons/cat-grey.png"
                  alt="Cute sleeping cat"
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. ANNOUNCEMENT TICKER */}
        <div className="w-full bg-[#fce7f3] border-y-[1.5px] border-[#c4b5fd] py-2 overflow-hidden select-none">
          <div className="animate-marquee-kawaii flex items-center gap-8 whitespace-nowrap text-xs font-mono font-bold text-[#4a3856]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[#db2777]">✧ ☆</span>
                <span>WORLDWIDE SHIPPING</span>
                <span className="text-[#f472b6]">♡</span>
                <span>HANDMADE WITH LOVE</span>
                <span className="text-[#f472b6]">♡</span>
                <span>HIGH QUALITY &amp; REUSABLE</span>
                <span className="text-[#db2777]">☆ ✧</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SHOP BY VIBE SECTION */}
        <section id="vibe" className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="text-[#f472b6]">♡</span>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#3b2b4e]">
              Shop by vibe
            </h2>
            <span className="text-[#f472b6]">♡</span>
          </div>

          {/* 4 Retro Window Vibe Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              {
                title: 'COQUETTE',
                image: '/images/nails/coquette-bow.jpg',
                vibe: 'coquette',
              },
              {
                title: 'ALT GIRL',
                image: '/images/nails/nightfall.jpg',
                vibe: 'alt-girl',
              },
              {
                title: 'MINIMAL',
                image: '/images/nails/little-hearts.jpg',
                vibe: 'minimal',
              },
              {
                title: 'CUSTOM SETS',
                image: '/images/nails/it-girl.jpg',
                vibe: 'custom-sets',
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={`/shop?vibe=${card.vibe}`}
                className="retro-window group flex flex-col transition-transform hover:-translate-y-1"
              >
                {/* Window Mini Header */}
                <div className="bg-[#ede7f6] px-2 py-1 border-b border-[#8e7ea8] flex items-center justify-between text-[9px] font-mono text-[#6b5b82]">
                  <span>vibe.exe</span>
                  <div className="flex gap-1">
                    <span>—</span>
                    <span>✕</span>
                  </div>
                </div>

                {/* Photo */}
                <div className="relative w-full aspect-square bg-[#fff5f7] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Footer */}
                <div className="p-2.5 bg-white flex items-center justify-between font-mono text-xs font-bold text-[#4a3856]">
                  <span>{card.title}</span>
                  <span className="text-[#db2777]">➔</span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/shop"
            className="mt-2 px-6 py-2.5 bg-[#fbcfe8] border-[1.5px] border-[#8e7ea8] rounded-sm font-mono text-xs font-bold text-[#3b2b4e] shadow-[2px_2px_0px_0px_#8e7ea8] hover:bg-[#f472b6] hover:text-white transition-all active:translate-x-[1px] active:translate-y-[1px]"
          >
            SHOP ALL ➔
          </Link>
        </section>

        {/* 4. PRODUCT SHOWCASE GRID */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#e2d5f1] pb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-mono font-bold text-[#3b2b4e]">
                Trending Nails ♡
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono font-bold text-[#db2777] hover:underline"
            >
              View all sets ➔
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* 5. MASCOT BANNER: "Not just nails, a mood. ♡" */}
        <div className="retro-window w-full bg-gradient-to-r from-[#ede9fe] via-[#fdf2f8] to-[#fce7f3] p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Kitty Speech Bubble */}
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 shrink-0">
              <Image
                src="/images/icons/cat-calico.png"
                alt="Cute calico cat"
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <div className="bg-white border border-[#bca6df] rounded-md p-2 text-[10px] font-mono text-[#4a3856] shadow-[1.5px_1.5px_0px_0px_#d8b4fe]">
              <span>YOU DESERVE <br /><b>PRETTY THINGS &lt;3</b></span>
            </div>
          </div>

          {/* Center: Cursive Text */}
          <div className="text-center">
            <span className="font-serif italic font-black text-2xl sm:text-3xl text-[#3b2b4e]">
              Not just nails, <br className="sm:hidden" />a mood. ♡
            </span>
            <div className="text-xs font-mono text-[#8e7ea8] mt-0.5">
              ✧ crafted for delicate hands ✧
            </div>
          </div>

          {/* Right: Pixel Art Mirror & Polish */}
          <div className="flex items-center gap-3 text-2xl select-none">
            <span title="Hand Mirror">🪞</span>
            <span title="Nail Polish">💅</span>
            <span title="Floppy Disk" className="text-xl">💾</span>
          </div>
        </div>
      </div>

      {/* 6. RETRO GINGHAM FOOTER */}
      <footer className="w-full gingham-pattern border-t-[2.5px] border-[#8e7ea8] mt-12 pt-10 pb-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Brand */}
            <div>
              <span className="font-serif font-black text-2xl text-[#3b2b4e]">
                Walls Have Mouths
              </span>
              <span className="block text-xs font-mono tracking-widest text-[#8e7ea8]">
                PRESS ON NAILS ♡
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-xs font-mono font-bold text-[#4a3856]">
              <Link href="/" className="hover:text-[#db2777]">Home</Link>
              <Link href="/shop" className="hover:text-[#db2777]">Shop</Link>
              <Link href="/#vibe" className="hover:text-[#db2777]">Vibes</Link>
              <Link href="/#faq" className="hover:text-[#db2777]">FAQ</Link>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#db2777]">Instagram</a>
            </div>

            {/* Mailing List Input */}
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <span className="text-xs font-mono text-[#4a3856]">
                Join the mailing list ♡
              </span>
              <div className="flex items-center bg-white border-[1.5px] border-[#8e7ea8] rounded-sm overflow-hidden shadow-[2px_2px_0px_0px_#d8b4fe]">
                <input
                  type="email"
                  placeholder="your email..."
                  className="px-3 py-1.5 text-xs font-mono outline-none text-[#3b2b4e] placeholder-[#a79bbd]"
                />
                <button
                  type="button"
                  className="px-3 py-1.5 bg-[#fbcfe8] text-[#3b2b4e] font-bold text-xs hover:bg-[#f472b6] hover:text-white transition-colors"
                >
                  ➔
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Taskbar */}
          <div className="pt-4 border-t border-[#fbcfe8] flex items-center justify-between text-[11px] font-mono text-[#6b5b82]">
            <span>♡ made with love in morocco</span>
            <span className="font-bold text-[#4a3856]">walls have mouths.exe</span>
            <div className="flex items-center gap-2">
              <span>📶 🔋</span>
              <span>11:11</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
