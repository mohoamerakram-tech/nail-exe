'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart/CartProvider';
import { useWishlist } from '@/lib/cart/WishlistContext';
import InteractiveLogo from './InteractiveLogo';

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, toggleCart } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdf2f7] border-b-2 border-[#57446d]">
      {/* Top Window Title Bar: nail.exe */}
      <div className="bg-gradient-to-r from-[#d8b4fe] via-[#e9d5ff] to-[#fbcfe8] px-4 py-1.5 border-b-2 border-[#57446d] flex items-center justify-between font-pixel-title text-[11px] select-none">
        <div className="flex items-center gap-2">
          <span className="text-[#db2777] text-xs">♡</span>
          <span className="font-bold text-[#4a3856] tracking-wide">
            nail.exe // press on nails
          </span>
        </div>

        {/* Windows Control Buttons: Minimize, Maximize, Close */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="retro-btn"
            title="Minimize"
          >
            —
          </button>
          <button
            type="button"
            className="retro-btn"
            title="Maximize"
          >
            ❐
          </button>
          <button
            type="button"
            className="retro-btn hover:!bg-[#db2777] hover:!text-white"
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
        <nav className="hidden md:flex items-center gap-2 font-pixel text-[11px] font-bold">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg border-2 transition-all ${
              pathname === '/'
                ? 'bg-[#fbcfe8] border-[#57446d] text-[#3b2b4e] shadow-[2px_2px_0px_0px_#57446d]'
                : 'text-[#57446d] border-transparent hover:border-[#57446d] hover:bg-[#fce7f3] hover:shadow-[2px_2px_0px_0px_#57446d]'
            }`}
          >
            [ Home ]
          </Link>
          <Link
            href="/shop"
            className={`px-3 py-1.5 rounded-lg border-2 transition-all ${
              pathname === '/shop'
                ? 'bg-[#fbcfe8] border-[#57446d] text-[#3b2b4e] shadow-[2px_2px_0px_0px_#57446d]'
                : 'text-[#57446d] border-transparent hover:border-[#57446d] hover:bg-[#fce7f3] hover:shadow-[2px_2px_0px_0px_#57446d]'
            }`}
          >
            [ Shop ]
          </Link>
          <Link
            href="/#vibe"
            className="px-3 py-1.5 text-[#57446d] border-2 border-transparent hover:border-[#57446d] hover:bg-[#fce7f3] hover:shadow-[2px_2px_0px_0px_#57446d] rounded-lg transition-all"
          >
            [ Vibes ]
          </Link>
        </nav>

        {/* Right: Search, Wishlist & Cart Counter */}
        <div className="flex items-center gap-3">
          {/* Native GET form keeps search usable without client-side routing state. */}
          <form action="/shop" role="search" className="hidden sm:flex items-center bg-white border-2 border-[#57446d] shadow-[2px_2px_0px_0px_#57446d] rounded-lg px-2.5 py-1 text-xs font-pixel-body">
            <button type="submit" aria-label="Search nail sets" className="text-[#db2777] mr-1.5 text-[10px]">🔍</button>
            <input
              type="search"
              name="q"
              placeholder="search nails..."
              aria-label="Search nail sets"
              className="bg-transparent text-[#3b2b4e] placeholder-[#a79bbd] outline-none w-24 lg:w-32 text-xs font-pixel-body"
            />
          </form>

          {/* Wishlist Heart Icon */}
          <Link
            href="/wishlist"
            title="Wishlist"
            aria-label="View wishlist"
            className="relative w-8 h-8 rounded-lg bg-white border-2 border-[#57446d] flex items-center justify-center text-sm text-[#db2777] hover:bg-[#fdf2f8] transition-all shadow-[2px_2px_0px_0px_#57446d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <span>♡</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1 min-w-[15px] h-[15px] font-pixel-arcade text-[7px] font-bold bg-[#db2777] text-white border border-[#57446d] rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Bag Cart Trigger */}
          <button
            type="button"
            onClick={toggleCart}
            className="pixel-btn-pink px-3 py-1.5 text-xs rounded-lg"
          >
            <span>👜</span>
            <span>CART [{itemCount}]</span>
          </button>
        </div>
      </div>
    </header>
  );
}
