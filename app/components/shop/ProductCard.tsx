'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useWishlist } from '@/lib/cart/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFav = isInWishlist(product.id);

  return (
    <div className="group pixel-card rounded-xl transition-all flex flex-col justify-between overflow-hidden">
      {/* Product Image Frame */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block w-full aspect-square bg-[#fff5f7] border-b-2 border-[#57446d] overflow-hidden"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {product.isBestSeller && (
          <span className="absolute top-2 left-2 pixel-badge text-[7px] rounded-md">
            ★ BESTSELLER
          </span>
        )}

        {/* Floating Mini Vibe Tag */}
        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 font-pixel-arcade text-[7px] bg-white/95 text-[#57446d] border-[1.5px] border-[#57446d] rounded-md shadow-[1.5px_1.5px_0px_0px_#57446d]">
          #{product.vibe}
        </span>
      </Link>

      {/* Product Info & Heart */}
      <div className="p-3 flex items-center justify-between gap-2 bg-white">
        <Link href={`/shop/${product.slug}`} className="flex-1 min-w-0">
          <h3 className="font-pixel-title text-xs text-[#3b2b4e] group-hover:text-[#db2777] transition-colors truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="font-pixel text-xs font-bold text-[#db2777]">
              {product.priceDH} DH
            </span>
            <span className="text-[10px] text-[#8e7ea8] font-pixel-arcade">
              [EXE]
            </span>
          </div>
        </Link>

        {/* Wishlist Heart Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`w-7 h-7 rounded-lg border-2 border-[#57446d] flex items-center justify-center text-xs font-bold transition-all shadow-[1.5px_1.5px_0px_0px_#57446d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
            isFav
              ? 'bg-[#fbcfe8] text-[#db2777]'
              : 'bg-white text-[#9d8ab8] hover:text-[#db2777] hover:bg-[#fdf2f8]'
          }`}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
}
