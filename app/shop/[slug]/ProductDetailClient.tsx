'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Product,
  NailShape,
  NailLength,
  NailSizePreset,
  AdhesiveChoice,
  CustomFingerSizes,
} from '@/lib/types';
import { ALL_SHAPES, ALL_LENGTHS } from '@/lib/products';
import { useCart } from '@/lib/cart/CartProvider';
import { useWishlist } from '@/lib/cart/WishlistContext';
import SizingGuideModal from '@/app/components/shop/SizingGuideModal';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedShape, setSelectedShape] = useState<NailShape>(product.shapes[0] || 'almond');
  const [selectedLength, setSelectedLength] = useState<NailLength>(product.lengths[0] || 'medium');
  const [selectedSize, setSelectedSize] = useState<NailSizePreset>('S');
  const [customSizes, setCustomSizes] = useState<CustomFingerSizes>({
    thumb: '15',
    index: '12',
    middle: '13',
    ring: '11',
    pinky: '8',
  });
  const [selectedAdhesive, setSelectedAdhesive] = useState<AdhesiveChoice>('both');
  const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState<'details' | 'application' | 'reviews'>('details');

  const isFav = isInWishlist(product.id);
  const activeImage = product.images[activeImageIndex] || product.images[0];

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedShape}-${selectedLength}-${selectedSize}-${Date.now()}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      priceDH: product.priceDH,
      priceUSD: product.priceUSD,
      image: product.images[0],
      shape: selectedShape,
      length: selectedLength,
      size: selectedSize,
      customSizes: selectedSize === 'Custom' ? customSizes : undefined,
      adhesive: selectedAdhesive,
      quantity: 1,
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-[#8e7ea8] mb-6 pb-2 border-b border-[#e2d5f1]">
        <Link href="/" className="hover:text-[#db2777]">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#db2777]">
          Shop
        </Link>
        <span>/</span>
        <span className="text-[#3b2b4e] font-bold">{product.name}</span>
      </nav>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Gallery Frame */}
        <div className="md:col-span-6 flex flex-col gap-3">
          {/* Main Photo Frame */}
          <div className="relative w-full aspect-square bg-[#fff5f7] border-[2px] border-[#9d8ab8] rounded-md shadow-[4px_4px_0px_0px_#cfbfe6] overflow-hidden group">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />

            {/* Wishlist button over image */}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-white/90 border border-[#c4b5fd] flex items-center justify-center text-sm shadow-[1px_1px_0px_0px_#a78bfa] hover:bg-white"
            >
              <span className={isFav ? 'text-[#db2777]' : 'text-[#8e7ea8]'}>
                {isFav ? '♥' : '♡'}
              </span>
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 rounded-xs border-2 overflow-hidden transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#f472b6] shadow-[2px_2px_0px_0px_#f472b6]'
                      : 'border-[#c4b5fd] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Note Box */}
          <div className="p-3 bg-[#fdf2f8] border-[1.5px] border-[#fbcfe8] rounded-sm text-xs font-mono text-[#831843] flex items-center gap-2">
            <span>✨</span>
            <span>Handmade with 100% salon soft gel • High quality &amp; reusable 5+ times</span>
          </div>
        </div>

        {/* Right Column: Customization & Purchase Suite */}
        <div className="md:col-span-6 flex flex-col gap-5">
          {/* Header & Pricing */}
          <div className="flex flex-col gap-1 pb-3 border-b border-[#e2d5f1]">
            <span className="text-[11px] font-mono font-bold text-[#db2777] uppercase tracking-wider">
              {product.vibe.toUpperCase()} SET ♡
            </span>
            <h1 className="text-2xl sm:text-3xl font-mono font-black text-[#3b2b4e] uppercase">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl font-mono font-black text-[#db2777]">
                {product.priceDH} DH
              </span>
              <span className="text-xs font-mono text-[#8e7ea8]">
                (~${product.priceUSD} USD)
              </span>
              <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200 ml-auto">
                In Stock &amp; Ready to Ship
              </span>
            </div>
            <p className="text-xs font-serif text-[#6b5b82] mt-1">
              {product.tagline}
            </p>
          </div>

          {/* 1. Nail Shape Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold text-[#4a3856] flex items-center justify-between">
              <span>NAIL SHAPE:</span>
              <span className="text-[#db2777] uppercase">{selectedShape}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ALL_SHAPES.filter((s) => product.shapes.includes(s.id)).map((shape) => (
                <button
                  key={shape.id}
                  type="button"
                  onClick={() => setSelectedShape(shape.id)}
                  className={`py-2 px-2.5 rounded-sm border text-xs font-mono font-bold transition-all flex items-center gap-1.5 justify-center ${
                    selectedShape === shape.id
                      ? 'bg-[#fbcfe8] border-[#8e7ea8] text-[#3b2b4e] shadow-[2px_2px_0px_0px_#8e7ea8]'
                      : 'bg-white border-[#c4b5fd] text-[#6b5b82] hover:border-[#8e7ea8]'
                  }`}
                >
                  <span>{shape.icon}</span>
                  <span>{shape.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Nail Length Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold text-[#4a3856] flex items-center justify-between">
              <span>NAIL LENGTH:</span>
              <span className="text-[#db2777] uppercase">{selectedLength}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ALL_LENGTHS.filter((l) => product.lengths.includes(l.id)).map((len) => (
                <button
                  key={len.id}
                  type="button"
                  onClick={() => setSelectedLength(len.id)}
                  className={`py-2 px-2 rounded-sm border text-xs font-mono font-bold transition-all text-center ${
                    selectedLength === len.id
                      ? 'bg-[#fbcfe8] border-[#8e7ea8] text-[#3b2b4e] shadow-[2px_2px_0px_0px_#8e7ea8]'
                      : 'bg-white border-[#c4b5fd] text-[#6b5b82] hover:border-[#8e7ea8]'
                  }`}
                >
                  {len.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Nail Size Selector & Guide Modal Trigger */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#4a3856]">
              <span>SELECT SIZE:</span>
              <button
                type="button"
                onClick={() => setIsSizingModalOpen(true)}
                className="text-[#db2777] hover:underline flex items-center gap-1"
              >
                <span>📏 Sizing Guide / Find My Size</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {(['XS', 'S', 'M', 'L', 'Custom'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2 rounded-sm border text-xs font-mono font-black transition-all ${
                    selectedSize === sz
                      ? 'bg-[#fbcfe8] border-[#8e7ea8] text-[#3b2b4e] shadow-[2px_2px_0px_0px_#8e7ea8]'
                      : 'bg-white border-[#c4b5fd] text-[#6b5b82] hover:border-[#8e7ea8]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Custom mm input fields if Custom is selected */}
            {selectedSize === 'Custom' && (
              <div className="p-3 bg-white border border-[#c4b5fd] rounded-xs mt-1 flex flex-col gap-2">
                <span className="text-[11px] font-mono font-bold text-[#4a3856]">
                  Enter your natural nail bed widths in millimeters (mm):
                </span>
                <div className="grid grid-cols-5 gap-1.5 text-xs font-mono text-center">
                  {(['thumb', 'index', 'middle', 'ring', 'pinky'] as const).map((finger) => (
                    <div key={finger} className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-[#8e7ea8] uppercase">{finger.slice(0, 4)}</span>
                      <input
                        type="text"
                        value={customSizes[finger]}
                        onChange={(e) =>
                          setCustomSizes((prev) => ({ ...prev, [finger]: e.target.value }))
                        }
                        className="border border-[#a79bbd] rounded-xs p-1 text-center font-bold text-[#3b2b4e] outline-none focus:border-[#db2777]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Adhesive Choice */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold text-[#4a3856]">
              APPLICATION ADHESIVE CHOICE:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedAdhesive('sticky-tabs')}
                className={`p-2 rounded-sm border text-left text-[11px] font-mono transition-all ${
                  selectedAdhesive === 'sticky-tabs'
                    ? 'bg-[#fbcfe8] border-[#8e7ea8] text-[#3b2b4e] shadow-[1.5px_1.5px_0px_0px_#8e7ea8]'
                    : 'bg-white border-[#c4b5fd] text-[#6b5b82]'
                }`}
              >
                <span className="font-bold block">Adhesive Tabs</span>
                <span className="text-[9px] text-[#8e7ea8]">1-3 days reusable</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedAdhesive('liquid-glue')}
                className={`p-2 rounded-sm border text-left text-[11px] font-mono transition-all ${
                  selectedAdhesive === 'liquid-glue'
                    ? 'bg-[#fbcfe8] border-[#8e7ea8] text-[#3b2b4e] shadow-[1.5px_1.5px_0px_0px_#8e7ea8]'
                    : 'bg-white border-[#c4b5fd] text-[#6b5b82]'
                }`}
              >
                <span className="font-bold block">Liquid Glue</span>
                <span className="text-[9px] text-[#8e7ea8]">2-3+ weeks wear</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedAdhesive('both')}
                className={`p-2 rounded-sm border text-left text-[11px] font-mono transition-all ${
                  selectedAdhesive === 'both'
                    ? 'bg-[#fbcfe8] border-[#8e7ea8] text-[#3b2b4e] shadow-[1.5px_1.5px_0px_0px_#8e7ea8]'
                    : 'bg-white border-[#c4b5fd] text-[#6b5b82]'
                }`}
              >
                <span className="font-bold block">Both (Tabs+Glue)</span>
                <span className="text-[9px] text-[#8e7ea8]">Best versatility</span>
              </button>
            </div>
          </div>

          {/* Add to Bag Action Button */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-6 rounded-sm text-xs font-mono font-black uppercase tracking-wider transition-all ${
                addedNotice
                  ? 'bg-emerald-400 text-white border-2 border-emerald-600 shadow-[2px_2px_0px_0px_#059669]'
                  : 'bg-[#fbcfe8] border-[2px] border-[#8e7ea8] text-[#3b2b4e] shadow-[3px_3px_0px_0px_#8e7ea8] hover:bg-[#f472b6] hover:text-white active:translate-x-[1px] active:translate-y-[1px]'
              }`}
            >
              {addedNotice ? '✓ ADDED TO BAG ♡' : 'ADD TO BAG // 220 DH ♡'}
            </button>
          </div>

          {/* Info Accordion / Tabs */}
          <div className="border border-[#d8b4fe] rounded-sm bg-white overflow-hidden mt-2">
            <div className="flex border-b border-[#e2d5f1] text-xs font-mono font-bold bg-[#faf5ff]">
              <button
                type="button"
                onClick={() => setActiveInfoTab('details')}
                className={`flex-1 py-2 text-center transition-colors ${
                  activeInfoTab === 'details' ? 'bg-white text-[#db2777] border-b-2 border-[#db2777]' : 'text-[#8e7ea8]'
                }`}
              >
                Set Details
              </button>
              <button
                type="button"
                onClick={() => setActiveInfoTab('application')}
                className={`flex-1 py-2 text-center transition-colors ${
                  activeInfoTab === 'application' ? 'bg-white text-[#db2777] border-b-2 border-[#db2777]' : 'text-[#8e7ea8]'
                }`}
              >
                How to Apply
              </button>
              <button
                type="button"
                onClick={() => setActiveInfoTab('reviews')}
                className={`flex-1 py-2 text-center transition-colors ${
                  activeInfoTab === 'reviews' ? 'bg-white text-[#db2777] border-b-2 border-[#db2777]' : 'text-[#8e7ea8]'
                }`}
              >
                Reviews ({product.reviewsCount})
              </button>
            </div>

            <div className="p-4 text-xs font-mono text-[#57446d]">
              {activeInfoTab === 'details' && (
                <ul className="space-y-1.5">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#db2777]">♡</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeInfoTab === 'application' && (
                <div className="space-y-2">
                  <p><b>1. Prep:</b> Push back cuticles gently with the wooden stick, lightly buff the natural nail surface, and wipe clean with the alcohol prep pad.</p>
                  <p><b>2. Fit:</b> Select the press-on nail that perfectly covers your nail bed from sidewall to sidewall.</p>
                  <p><b>3. Apply:</b> Place adhesive tab or a drop of glue, align at 45° angle at cuticle line, and press down firmly for 30 seconds.</p>
                </div>
              )}

              {activeInfoTab === 'reviews' && (
                <div className="space-y-3">
                  <div className="p-2.5 bg-[#fdf4f7] rounded-xs border border-[#fbcfe8]">
                    <div className="flex items-center justify-between font-bold text-[#db2777]">
                      <span>★★★★★ Kenza M.</span>
                      <span className="text-[10px] text-[#8e7ea8]">Verified Buyer (Casablanca)</span>
                    </div>
                    <p className="mt-1 text-[#4a3856]">Obsessed with this set! So sturdy and looks exactly like a 500 DH salon acrylic set. Will definitely order more.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sizing Guide Modal */}
      <SizingGuideModal
        isOpen={isSizingModalOpen}
        onClose={() => setIsSizingModalOpen(false)}
      />
    </div>
  );
}
