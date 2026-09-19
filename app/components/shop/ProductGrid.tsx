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
      <div className="py-24 border-[3px] border-black bg-zinc-950 p-8 text-center flex flex-col items-center justify-center gap-3 shadow-[6px_6px_0px_0px_#000]">
        <span className="text-xl font-mono font-bold text-[#ff2d78]">
          NO ARCHIVAL PIECES FOUND // 該当品なし
        </span>
        <p className="text-xs font-serif text-zinc-400 max-w-md">
          The requested serialization chapter or garment category contains zero active specimens. Reset filter criteria to display canonical archive.
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
