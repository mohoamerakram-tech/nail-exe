'use client';

import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({ products, emptyMessage = 'Try another aesthetic or browse all handmade nail sets.' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="pixel-card rounded-2xl p-8 py-16 text-center flex flex-col items-center justify-center gap-3">
        <span className="text-2xl">💅✨</span>
        <span className="text-sm font-pixel-title font-bold text-[#3b2b4e]">
          NO NAIL SETS FOUND ♡
        </span>
        <p className="text-xs font-pixel-body text-[#8e7ea8] max-w-md">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-2">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
