'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '../types';
import { loadCartFromStorage, saveCartToStorage } from './storage';

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotalDH: number;
  subtotalUSD: number;
  freeShippingGoalDH: number;
  amountNeededForFreeShipping: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const freeShippingGoalDH = 450; // Free shipping over 450 DH (~$45)

  useEffect(() => {
    setItems(loadCartFromStorage());
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      saveCartToStorage(items);
    }
  }, [items, isMounted]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + item.quantity,
        };
        return next;
      }
      return [...prev, item];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalDH = items.reduce((acc, item) => acc + item.priceDH * item.quantity, 0);
  const subtotalUSD = items.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);
  const amountNeededForFreeShipping = Math.max(0, freeShippingGoalDH - subtotalDH);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        itemCount,
        subtotalDH,
        subtotalUSD,
        freeShippingGoalDH,
        amountNeededForFreeShipping,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
