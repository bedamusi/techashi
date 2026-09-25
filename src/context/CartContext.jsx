import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useToast } from './ToastContext';

const STORAGE_KEY = 'techashi-cart-v1';
const CartContext = createContext(null);

function readStoredCart() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed)
      ? parsed.filter((item) => typeof item?.productId === 'string' && Number.isInteger(item.quantity) && item.quantity > 0)
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);
  const notify = useToast();

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* Keep the in-memory cart usable if storage is unavailable. */ }
  }, [items]);

  const value = useMemo(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    addItem(product, quantity = 1) {
      if (!product?.id || (product.stock != null && product.stock < 1)) return false;
      setItems((current) => {
        const existing = current.find((item) => item.productId === product.id);
        const nextQuantity = Math.min(product.stock ?? 99, (existing?.quantity || 0) + quantity, 99);
        return existing
          ? current.map((item) => item.productId === product.id ? { ...item, quantity: nextQuantity } : item)
          : [...current, { productId: product.id, quantity: nextQuantity }];
      });
      notify(`${product.name} added to your bag`);
      return true;
    },
    setQuantity(productId, quantity) {
      if (!Number.isInteger(quantity) || quantity < 1) {
        setItems((current) => current.filter((item) => item.productId !== productId));
        return;
      }
      setItems((current) => current.map((item) => item.productId === productId ? { ...item, quantity: Math.min(quantity, 99) } : item));
    },
    removeItem(productId) { setItems((current) => current.filter((item) => item.productId !== productId)); },
    clearCart() { setItems([]); },
  }), [items, notify]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider.');
  return context;
}
