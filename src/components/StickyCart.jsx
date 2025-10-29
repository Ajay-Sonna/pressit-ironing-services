import React from "react";
// fix import path to point at the CartContext in the same folder
import { useCart } from "./CartContext";

export default function StickyCart() {
  const { totalItems, total, openModal } = useCart();

  if (!totalItems) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      <div className="mx-auto bg-white border rounded-full flex items-center justify-between px-4 py-2 shadow">
        <div className="text-sm text-gray-700">
          {totalItems} item{totalItems > 1 ? "s" : ""} — <span className="font-semibold">₹{total}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => openModal(2)} className="px-4 py-1.5 rounded-full bg-teal-500 text-white text-sm">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}