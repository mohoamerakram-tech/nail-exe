'use client';

import React from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 pixel-card rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3">
        <span className="text-2xl">💅✨</span>
        <span className="text-sm font-pixel-title font-bold text-[#3b2b4e]">
          NO NAIL SETS FOUND IN THIS VIBE ♡
        </span>
        <p className="text-xs font-pixel-body text-[#8e7ea8] max-w-md">
          Try picking another aesthetic or browse all handmade press-on sets.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
