'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart/CartProvider';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotalDH,
    subtotalUSD,
    freeShippingGoalDH,
    amountNeededForFreeShipping,
    updateQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3b2b4e]/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Retro Pastel OS Cart Drawer */}
      <aside className="relative w-full max-w-md bg-[#fff7fa] border-l-2 border-[#57446d] h-full flex flex-col justify-between shadow-2xl z-10">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#d8b4fe] via-[#e9d5ff] to-[#fbcfe8] px-4 py-2 border-b-2 border-[#57446d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#db2777]">♡</span>
            <span className="font-pixel-title font-bold text-xs text-[#3b2b4e]">
              shopping_bag.exe ({items.length})
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="retro-btn hover:!bg-[#db2777] hover:!text-white"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="p-3 bg-[#fdf2f8] border-b-2 border-[#57446d] text-xs font-pixel-body text-[#831843]">
          {amountNeededForFreeShipping > 0 ? (
            <div>
              <span>Add <b>{amountNeededForFreeShipping} DH</b> more for FREE Shipping ♡</span>
              <div className="w-full bg-[#fce7f3] h-2.5 rounded-full overflow-hidden mt-1.5 border-2 border-[#57446d]">
                <div
                  className="bg-[#f472b6] h-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.round((subtotalDH / freeShippingGoalDH) * 100))}%`,
                  }}
                />
              </div>
            </div>
          ) : (
            <span className="font-bold text-[#059669] font-pixel-title text-[10px]">
              ✨ You unlocked FREE Tracked Shipping!
            </span>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center text-center gap-3">
              <span className="text-3xl">🛍️</span>
              <p className="text-xs font-pixel-title font-bold text-[#4a3856]">
                Your nail bag is currently empty!
              </p>
              <span className="text-xs font-pixel-body text-[#8e7ea8]">
                same girl... different nails &lt;3
              </span>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-3 pixel-btn-pink px-4 py-2 text-xs rounded-lg"
              >
                [ BROWSE NAIL SETS ♡ ]
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white border-2 border-[#57446d] rounded-xl shadow-[2.5px_2.5px_0px_0px_#57446d] flex gap-3 items-center"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 bg-[#fff5f7] border-2 border-[#57446d] rounded-lg shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 pr-1">
                  <Link
                    href={`/shop/${item.slug}`}
                    onClick={closeCart}
                    className="text-xs font-pixel-title text-[#3b2b4e] hover:text-[#db2777] transition-colors truncate block"
                  >
                    {item.name}
                  </Link>

                  <div className="text-[10px] font-pixel-body text-[#6b5b82] mt-0.5 space-y-0.5">
                    <div>
                      {item.shape.toUpperCase()} // {item.length.toUpperCase()}
                    </div>
                    <div>
                      SIZE: <span className="font-bold text-[#db2777] font-pixel">{item.size}</span>
                      {item.customSizes && (
                        <span className="ml-1 text-[9px] text-[#8e7ea8]">
                          ({item.customSizes.thumb},{item.customSizes.index},{item.customSizes.middle},{item.customSizes.ring},{item.customSizes.pinky})
                        </span>
                      )}
                    </div>
                    <div className="text-[#8e7ea8]">
                      Adhesive: {item.adhesive === 'sticky-tabs' ? 'Tabs' : item.adhesive === 'liquid-glue' ? 'Glue' : 'Tabs + Glue'}
                    </div>
                  </div>
                </div>

                {/* Quantity & Price */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-xs font-pixel font-bold text-[#3b2b4e]">
                    {item.priceDH * item.quantity} DH
                  </span>

                  <div className="flex items-center gap-1 bg-[#fdf4f7] border-2 border-[#57446d] rounded-md">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-5 h-5 flex items-center justify-center text-xs font-pixel text-[#57446d] hover:bg-[#fbcfe8]"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-xs font-pixel font-bold text-[#3b2b4e]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center text-xs font-pixel text-[#57446d] hover:bg-[#fbcfe8]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-[9px] font-pixel text-red-400 hover:text-red-600"
                  >
                    [remove]
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-4 bg-[#fdf2f8] border-t-2 border-[#57446d] flex flex-col gap-3">
            <div className="p-2 bg-white border-2 border-[#57446d] rounded-lg text-[10px] font-pixel-body text-[#db2777] flex items-center gap-2 shadow-[2px_2px_0px_0px_#57446d]">
              <span>🎁</span>
              <span>FREE Deluxe Prep Application Kit included with every set!</span>
            </div>

            <div className="flex items-center justify-between text-xs font-pixel-title">
              <span className="font-bold text-[#4a3856]">SUBTOTAL:</span>
              <div className="text-right">
                <span className="text-base font-bold text-[#3b2b4e] block">
                  {subtotalDH} DH
                </span>
                <span className="text-[10px] text-[#8e7ea8] block">
                  (~${subtotalUSD} USD)
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="pixel-btn-pink w-full py-3 text-center text-xs rounded-xl"
            >
              [ PROCEED TO CHECKOUT ♡ ]
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
