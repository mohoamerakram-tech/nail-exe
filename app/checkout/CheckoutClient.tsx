'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart/CartProvider';

export default function CheckoutClient() {
  const { items, subtotalDH, subtotalUSD, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Casablanca',
    address: '',
    notes: '',
    paymentMethod: 'cod' as 'cod' | 'card' | 'whatsapp',
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `NAIL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);

    if (formData.paymentMethod === 'whatsapp') {
      let msg = `*WALLS HAVE MOUTHS // NEW NAIL ORDER #${id}*\n\n`;
      msg += `• Customer: ${formData.fullName}\n`;
      msg += `• Phone: ${formData.phone}\n`;
      msg += `• City: ${formData.city}\n`;
      msg += `• Address: ${formData.address}\n\n`;
      msg += `*SETS ORDERED:*\n`;
      items.forEach((item, i) => {
        msg += `${i + 1}. ${item.name} (${item.shape}, ${item.length}, Size: ${item.size}) × ${item.quantity} - ${item.priceDH * item.quantity} DH\n`;
        if (item.customSizes) {
          msg += `   Custom mm: T:${item.customSizes.thumb}, I:${item.customSizes.index}, M:${item.customSizes.middle}, R:${item.customSizes.ring}, P:${item.customSizes.pinky}\n`;
        }
      });
      msg += `\n*TOTAL:* ${subtotalDH} DH (~$${subtotalUSD} USD)\n`;
      msg += `Includes Free Application Prep Kits & Instructions.`;

      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    }

    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-16">
        <div className="retro-pixel-window p-8 text-center flex flex-col items-center gap-4 bg-white rounded-2xl">
          <span className="text-4xl">💅💖</span>
          <span className="px-3 py-1 bg-[#fbcfe8] text-[#db2777] font-pixel-arcade text-[8px] font-bold rounded-md border-2 border-[#57446d]">
            ORDER CONFIRMED // {orderId}
          </span>
          <h1 className="text-2xl font-pixel-title font-black text-[#3b2b4e]">
            Thank you, {formData.fullName}! ♡
          </h1>
          <p className="text-xs font-pixel-body text-[#6b5b82] max-w-md leading-relaxed">
            Your custom press-on nail sets are now queued for artisan hand-crafting. You will receive a confirmation message on WhatsApp or SMS when your package ships.
          </p>

          <Link
            href="/"
            className="mt-4 pixel-btn-pink px-6 py-2.5 rounded-xl text-xs"
          >
            RETURN HOME ♡
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-16">
        <div className="retro-pixel-window p-8 text-center flex flex-col items-center gap-4 bg-white rounded-2xl">
          <span className="text-4xl">🛍️</span>
          <h1 className="text-lg font-pixel-title font-bold text-[#3b2b4e]">
            Your bag is empty!
          </h1>
          <p className="text-xs font-pixel-body text-[#8e7ea8]">
            Please add your favorite press-on nail sets before checking out.
          </p>
          <Link
            href="/shop"
            className="pixel-btn-pink px-6 py-2.5 rounded-xl text-xs"
          >
            SHOP NAIL SETS ♡
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="retro-window mb-6">
        <div className="retro-window-header">
          <span className="font-mono font-bold text-xs text-[#4a3856]">
            ♡ secure_checkout.exe
          </span>
          <div className="retro-btn-box">
            <span className="retro-btn">—</span>
            <span className="retro-btn">✕</span>
          </div>
        </div>

        <div className="p-4 bg-white border-b-2 border-[#e2d5f1] flex items-center justify-between">
          <div>
            <h1 className="text-xl font-mono font-black text-[#3b2b4e]">
              Checkout &amp; Delivery
            </h1>
            <span className="text-xs font-mono text-[#8e7ea8]">
              Worldwide Shipping • Made with love in Morocco ♡
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-[#db2777]">
            {items.length} Set(s) in Bag
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Shipping Form */}
        <div className="md:col-span-7 retro-pixel-window p-5 flex flex-col gap-4 bg-white rounded-2xl">
          <h2 className="text-xs font-pixel-title font-bold uppercase text-[#4a3856] pb-2 border-b-2 border-[#57446d]">
            1. Shipping Information
          </h2>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-pixel-title font-bold text-[#6b5b82]">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="e.g. Yasmin Alami"
              value={formData.fullName}
              onChange={handleInputChange}
              className="border-2 border-[#57446d] rounded-xl p-2 text-xs font-pixel-body outline-none focus:border-[#db2777]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-pixel-title font-bold text-[#6b5b82]">
                WhatsApp / Phone *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+212 6..."
                value={formData.phone}
                onChange={handleInputChange}
                className="border-2 border-[#57446d] rounded-xl p-2 text-xs font-pixel-body outline-none focus:border-[#db2777]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-pixel-title font-bold text-zinc-600">
                City / Region *
              </label>
              <input
                type="text"
                name="city"
                required
                placeholder="Casablanca, Rabat, Marrakech..."
                value={formData.city}
                onChange={handleInputChange}
                className="border-2 border-[#57446d] rounded-xl p-2 text-xs font-pixel-body outline-none focus:border-[#db2777]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-pixel-title font-bold text-[#6b5b82]">
              Delivery Address *
            </label>
            <textarea
              name="address"
              required
              rows={2}
              placeholder="Street address, neighborhood, apartment / villa number..."
              value={formData.address}
              onChange={handleInputChange}
              className="border-2 border-[#57446d] rounded-xl p-2 text-xs font-pixel-body outline-none focus:border-[#db2777] resize-none"
            />
          </div>

          <h2 className="text-xs font-pixel-title font-bold uppercase text-[#4a3856] pt-2 pb-1 border-b-2 border-[#57446d]">
            2. Payment Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-pixel-title">
            <label
              className={`p-2.5 border-2 rounded-xl cursor-pointer flex flex-col gap-0.5 transition-all ${
                formData.paymentMethod === 'cod'
                  ? 'border-[#57446d] bg-[#fdf2f8] shadow-[2px_2px_0px_0px_#57446d]'
                  : 'border-[#57446d] opacity-70 hover:opacity-100'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === 'cod'}
                onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'cod' }))}
                className="hidden"
              />
              <span className="font-bold text-[#db2777] text-[10px]">Cash on Delivery</span>
              <span className="text-[9px] text-[#8e7ea8] font-pixel-body">Pay at your door</span>
            </label>

            <label
              className={`p-2.5 border-2 rounded-xl cursor-pointer flex flex-col gap-0.5 transition-all ${
                formData.paymentMethod === 'whatsapp'
                  ? 'border-[#57446d] bg-[#f0fdf4] shadow-[2px_2px_0px_0px_#57446d]'
                  : 'border-[#57446d] opacity-70 hover:opacity-100'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="whatsapp"
                checked={formData.paymentMethod === 'whatsapp'}
                onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'whatsapp' }))}
                className="hidden"
              />
              <span className="font-bold text-[#16a34a] text-[10px]">WhatsApp Order</span>
              <span className="text-[9px] text-[#8e7ea8] font-pixel-body">Direct concierge</span>
            </label>

            <label
              className={`p-2.5 border-2 rounded-xl cursor-pointer flex flex-col gap-0.5 transition-all ${
                formData.paymentMethod === 'card'
                  ? 'border-[#57446d] bg-[#faf5ff] shadow-[2px_2px_0px_0px_#57446d]'
                  : 'border-[#57446d] opacity-70 hover:opacity-100'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                className="hidden"
              />
              <span className="font-bold text-[#7c3aed] text-[10px]">Credit Card</span>
              <span className="text-[9px] text-[#8e7ea8] font-pixel-body">Visa / Mastercard</span>
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-5 retro-pixel-window p-5 flex flex-col gap-4 bg-white rounded-2xl">
          <h2 className="text-xs font-pixel-title font-bold uppercase text-[#4a3856] pb-2 border-b-2 border-[#57446d]">
            Order Summary
          </h2>

          <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2.5 p-2 bg-[#fdf8fa] border-2 border-[#57446d] rounded-xl shadow-[2px_2px_0px_0px_#57446d] text-xs font-pixel-body"
              >
                <div className="relative w-12 h-12 bg-white border-2 border-[#57446d] rounded-lg shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[#3b2b4e] block truncate font-pixel-title text-[11px]">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-[#6b5b82] block">
                    {item.shape} • {item.length} • Size: {item.size}
                  </span>
                </div>
                <span className="font-bold text-[#3b2b4e] shrink-0 font-pixel">
                  {item.priceDH * item.quantity} DH
                </span>
              </div>
            ))}
          </div>

          <div className="p-2 bg-[#fdf2f8] border-2 border-[#57446d] rounded-xl shadow-[2px_2px_0px_0px_#57446d] text-[10px] font-pixel-body text-[#db2777]">
            🎁 FREE Deluxe Application Kit included with every set!
          </div>

          <div className="flex flex-col gap-1.5 pt-2 border-t-2 border-[#57446d] text-xs font-pixel-title">
            <div className="flex justify-between text-[#6b5b82]">
              <span>Subtotal:</span>
              <span className="font-pixel">{subtotalDH} DH</span>
            </div>
            <div className="flex justify-between text-[#6b5b82]">
              <span>Shipping:</span>
              <span className="text-emerald-600 font-bold">FREE ♡</span>
            </div>
            <div className="flex justify-between text-sm font-black text-[#3b2b4e] pt-1.5 border-t-2 border-[#f0e4fc]">
              <span>Total:</span>
              <span className="text-[#db2777] font-pixel">{subtotalDH} DH</span>
            </div>
          </div>

          <button
            type="submit"
            className="pixel-btn-pink w-full py-3.5 text-xs rounded-xl"
          >
            CONFIRM ORDER ♡
          </button>
        </div>
      </form>
    </div>
  );
}
