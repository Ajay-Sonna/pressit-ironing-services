import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart.items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [bottomCartOpen, setBottomCartOpen] = useState(false);
  const [bottomStep, setBottomStep] = useState(1); // 1: items, 2: address, 3: review

  useEffect(() => {
    try {
      localStorage.setItem("cart.items", JSON.stringify(items));
    } catch {}
  }, [items]);

  const openProductModal = () => setProductModalOpen(true);
  const closeProductModal = () => setProductModalOpen(false);

  const openBottomCart = (step = 1) => {
    setBottomStep(step);
    setBottomCartOpen(true);
  };
  const closeBottomCart = () => {
    setBottomCartOpen(false);
    setBottomStep(1);
  };

  // ---------- CHANGE: make addItem silent (does NOT auto-open cart/modal) ----------
  const addItem = (item) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 0) + 1 };
        return copy;
      }
      return [...prev, { ...item, qty: 1 }];
    });
    // previously we auto-opened bottom cart here — removed to keep Add silent
  };
  // -------------------------------------------------------------------------------

  const updateItemQty = (id, qty) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, qty) } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setItems([]);

  const total = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 0), 0);
  const totalItems = items.reduce((s, it) => s + (it.qty || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItemQty,
        removeItem,
        clearCart,
        total,
        totalItems,
        isProductModalOpen,
        openProductModal,
        closeProductModal,
        bottomCartOpen,
        openBottomCart,
        closeBottomCart,
        bottomStep,
        setBottomStep,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}