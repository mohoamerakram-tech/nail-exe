'use client';

import Link from 'next/link';
import ProductGrid from '@/app/components/shop/ProductGrid';
import { useWishlist } from '@/lib/cart/WishlistContext';
import { PRODUCTS } from '@/lib/products';

export default function WishlistClient() {
  const { wishlist, isReady } = useWishlist();
  const products = PRODUCTS.filter((product) => wishlist.includes(product.id));

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-8 flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4 border-b-2 border-[#57446d] pb-3">
        <div>
          <span className="font-pixel-body text-xs text-[#db2777]">saved for later ♡</span>
          <h1 className="font-pixel-title text-xl sm:text-2xl text-[#3b2b4e] mt-2">My Wishlist</h1>
        </div>
        <Link href="/shop" className="font-pixel text-xs text-[#db2777] hover:underline">[ Shop all sets ➔ ]</Link>
      </div>

      {/* Wait for localStorage hydration before showing an empty state. */}
      {!isReady ? (
        <p className="font-pixel-body text-sm text-[#6b5b82]">Loading saved sets...</p>
      ) : products.length ? (
        <ProductGrid products={products} />
      ) : (
        <div className="pixel-card rounded-2xl p-8 py-16 text-center flex flex-col items-center gap-4">
          <span className="text-3xl">♡</span>
          <p className="font-pixel-title text-sm text-[#3b2b4e]">No saved sets yet</p>
          <p className="font-pixel-body text-xs text-[#8e7ea8]">Tap the heart on any nail set to keep it here.</p>
          <Link href="/shop" className="pixel-btn-pink rounded-xl px-5 py-2 text-xs">Browse nail sets ➔</Link>
        </div>
      )}
    </div>
  );
}
