'use client';

import React from 'react';
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
    <div className="group bg-white border-[2px] border-[#9d8ab8] rounded-sm shadow-[3px_3px_0px_0px_#cfbfe6] hover:shadow-[3px_3px_0px_0px_#f472b6] transition-all flex flex-col justify-between overflow-hidden">
      {/* Product Image Frame */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block w-full aspect-square bg-[#fff5f7] border-b-[2px] border-[#9d8ab8] overflow-hidden"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {product.isBestSeller && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-mono font-bold bg-[#fbcfe8] text-[#3b2b4e] border border-[#8e7ea8] rounded-xs shadow-[1px_1px_0px_0px_#8e7ea8]">
            BESTSELLER ♡
          </span>
        )}
      </Link>

      {/* Product Info & Heart */}
      <div className="p-3.5 flex items-center justify-between gap-2 bg-white">
        <Link href={`/shop/${product.slug}`} className="flex-1 min-w-0">
          <h3 className="text-xs sm:text-sm font-mono font-black uppercase text-[#3b2b4e] hover:text-[#db2777] transition-colors truncate">
            {product.name}
          </h3>
          <span className="text-xs font-mono font-bold text-[#6b5b82] block mt-0.5">
            {product.priceDH} DH
          </span>
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
          className={`w-8 h-8 rounded-sm border flex items-center justify-center text-sm transition-all ${
            isFav
              ? 'bg-[#fbcfe8] text-[#db2777] border-[#f472b6] shadow-[1px_1px_0px_0px_#f472b6]'
              : 'bg-white text-[#9d8ab8] border-[#c4b5fd] hover:text-[#f472b6] hover:border-[#f472b6]'
          }`}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
}
