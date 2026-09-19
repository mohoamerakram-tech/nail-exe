'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart/CartProvider';
import { useWishlist } from '@/lib/cart/WishlistContext';
import InteractiveLogo from './InteractiveLogo';

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, toggleCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdf5f8] border-b-[2.5px] border-[#8e7ea8]">
      {/* Top Window Title Bar: nail.exe */}
      <div className="bg-gradient-to-r from-[#d8b4fe] via-[#e9d5ff] to-[#fbcfe8] px-4 py-1.5 border-b-[1.5px] border-[#8e7ea8] flex items-center justify-between text-xs font-mono select-none">
        <div className="flex items-center gap-2">
          <span className="text-[#f472b6]">♡</span>
          <span className="font-bold text-[#57446d] tracking-wide">
            nail.exe // press on nails
          </span>
        </div>

        {/* Windows Control Buttons: Minimize, Maximize, Close */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="w-4 h-4 bg-white border border-[#8e7ea8] rounded-[2px] flex items-center justify-center text-[9px] font-bold text-[#6b5b82] hover:bg-[#fbcfe8]"
            title="Minimize"
          >
            —
          </button>
          <button
            type="button"
            className="w-4 h-4 bg-white border border-[#8e7ea8] rounded-[2px] flex items-center justify-center text-[9px] font-bold text-[#6b5b82] hover:bg-[#fbcfe8]"
            title="Maximize"
          >
            ❐
          </button>
          <button
            type="button"
            className="w-4 h-4 bg-white border border-[#8e7ea8] rounded-[2px] flex items-center justify-center text-[9px] font-bold text-[#6b5b82] hover:bg-[#f472b6] hover:text-white"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Interactive Video Logo */}
        <div className="flex items-center gap-2.5">
          <InteractiveLogo variant="navbar" />
        </div>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-mono font-bold">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-sm border transition-all ${
              pathname === '/'
                ? 'bg-[#fbcfe8] border-[#8e7ea8] text-[#3b2b4e] shadow-[1.5px_1.5px_0px_0px_#8e7ea8]'
                : 'text-[#6b5b82] border-transparent hover:bg-[#f5e8ff]'
            }`}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={`px-3 py-1.5 rounded-sm border transition-all ${
              pathname === '/shop'
                ? 'bg-[#fbcfe8] border-[#8e7ea8] text-[#3b2b4e] shadow-[1.5px_1.5px_0px_0px_#8e7ea8]'
                : 'text-[#6b5b82] border-transparent hover:bg-[#f5e8ff]'
            }`}
          >
            Shop
          </Link>
          <Link
            href="/#vibe"
            className="px-3 py-1.5 text-[#6b5b82] hover:bg-[#f5e8ff] rounded-sm transition-colors"
          >
            Vibes
          </Link>
          <Link
            href="/#faq"
            className="px-3 py-1.5 text-[#6b5b82] hover:bg-[#f5e8ff] rounded-sm transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Right: Search, Wishlist & Cart Counter */}
        <div className="flex items-center gap-3">
          {/* Quick Search Bar */}
          <div className="hidden sm:flex items-center bg-white border-1.5 border-[#a79bbd] rounded-sm px-2.5 py-1 text-xs font-mono">
            <span className="text-[#8e7ea8] mr-1.5">🔍</span>
            <input
              type="text"
              placeholder="search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[#3b2b4e] placeholder-[#a79bbd] outline-none w-24 lg:w-32 text-xs"
            />
          </div>

          {/* Wishlist Heart Icon */}
          <Link
            href="/shop"
            title="Wishlist"
            className="relative w-8 h-8 rounded-sm bg-white border border-[#a79bbd] flex items-center justify-center text-sm text-[#f472b6] hover:bg-[#fdf2f8] transition-colors shadow-[1px_1px_0px_0px_#a79bbd]"
          >
            <span>♡</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1 min-w-[15px] h-[15px] text-[9px] font-mono font-bold bg-[#f472b6] text-white rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Bag Cart Trigger */}
          <button
            type="button"
            onClick={toggleCart}
            className="relative px-3 py-1.5 bg-[#fbcfe8] border-[1.5px] border-[#8e7ea8] rounded-sm flex items-center gap-1.5 font-mono text-xs font-bold text-[#3b2b4e] shadow-[2px_2px_0px_0px_#8e7ea8] hover:bg-[#f472b6] hover:text-white transition-all active:translate-x-[1px] active:translate-y-[1px]"
          >
            <span>👜</span>
            <span>({itemCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
