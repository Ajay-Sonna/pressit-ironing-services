import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";

/* BottomCart: collapsed sticky bar -> expanded 3-step panel (items, address, review) */
export default function BottomCart() {
  const {
    items,
    updateItemQty,
    removeItem,
    total,
    totalItems,
    bottomCartOpen,
    openBottomCart,
    closeBottomCart,
    bottomStep,
    setBottomStep,
    clearCart,
  } = useCart();

  const [address, setAddress] = useState({ name: "", street: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  const changeQty = (id, delta) => {
    const it = items.find((x) => x.id === id);
    const next = (it?.qty || 0) + delta;
    if (next <= 0) removeItem(id);
    else updateItemQty(id, next);
  };

  const goTo = (step) => setBottomStep(step);

  const handleConfirm = async () => {
    if (!address.name || !address.street || !address.phone) {
      alert("Fill name, street & phone.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    clearCart();
    closeBottomCart();
    setBottomStep(1);
    setSubmitting(false);
    alert("Pickup confirmed.");
  };

  // Collapsed sticky bar
  if (!bottomCartOpen) {
    if (!totalItems) return null;
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
        <div className="mx-auto bg-white border rounded-full flex items-center justify-between px-4 py-2 shadow-lg">
          <div className="text-sm text-gray-700">
            {totalItems} item{totalItems > 1 ? "s" : ""} — <span className="font-semibold">₹{total}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => openBottomCart(1)} className="px-4 py-1.5 rounded-full bg-teal-500 text-white text-sm">
              Checkout
            </button>
            <button onClick={() => openBottomCart(1)} className="px-3 py-1 rounded-full border text-sm">Edit</button>
          </div>
        </div>
      </div>
    );
  }

  // Expanded panel
  return (
    <motion.div initial={{ y: 300 }} animate={{ y: 0 }} className="fixed inset-x-4 bottom-4 z-50 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div>
            <div className="text-sm text-gray-500">Your cart</div>
            <div className="text-lg font-semibold">{totalItems} item{totalItems > 1 ? "s" : ""} — ₹{total}</div>
          </div>
          <div>
            <button className="text-sm px-3 py-1" onClick={() => { closeBottomCart(); setBottomStep(1); }}>
              Close
            </button>
          </div>
        </div>

        <div className="p-4 max-h-96 overflow-auto">
          {bottomStep === 1 && (
            <>
              <h4 className="mb-3 font-medium">Items</h4>
              <div className="space-y-3">
                {items.length === 0 ? (
                  <div className="text-sm text-gray-500">No items yet.</div>
                ) : (
                  items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="text-sm font-medium">{it.title}</div>
                        <div className="text-xs text-gray-500">{it.category} • ₹{it.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeQty(it.id, -1)} className="px-2 py-1 rounded border">−</button>
                        <div className="px-3 text-sm">{it.qty}</div>
                        <button onClick={() => changeQty(it.id, +1)} className="px-2 py-1 rounded border">+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => { closeBottomCart(); setBottomStep(1); }} className="px-4 py-2 rounded border">Cancel</button>
                <button onClick={() => goTo(2)} disabled={items.length === 0} className="px-4 py-2 rounded bg-teal-500 text-white">
                  Next: Address
                </button>
              </div>
            </>
          )}

          {bottomStep === 2 && (
            <>
              <h4 className="mb-3 font-medium">Address</h4>
              <div className="grid gap-2 mb-4">
                <input className="border p-2 rounded" placeholder="Full name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
                <input className="border p-2 rounded" placeholder="Street / Address" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                <div className="flex gap-2">
                  <input className="border p-2 rounded flex-1" placeholder="Phone" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                  <input className="border p-2 rounded flex-1" placeholder="Email (optional)" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} />
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => goTo(1)} className="px-4 py-2 rounded border">Back</button>
                <div className="flex gap-2">
                  <button onClick={() => { closeBottomCart(); setBottomStep(1); }} className="px-4 py-2 rounded border">Cancel</button>
                  <button onClick={() => goTo(3)} className="px-4 py-2 rounded bg-teal-500 text-white">Review</button>
                </div>
              </div>
            </>
          )}

          {bottomStep === 3 && (
            <>
              <h4 className="mb-3 font-medium">Review & confirm</h4>
              <div className="space-y-2 mb-3">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm">{it.title}</div>
                      <div className="text-xs text-gray-500">{it.qty} × ₹{it.price}</div>
                    </div>
                    <div className="font-medium">₹{(it.qty || 0) * (it.price || 0)}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button onClick={() => goTo(2)} className="px-4 py-2 rounded border">Back</button>
                <div className="flex gap-2">
                  <button onClick={() => { closeBottomCart(); setBottomStep(1); }} className="px-4 py-2 rounded border">Cancel</button>
                  <button disabled={submitting} onClick={handleConfirm} className="px-4 py-2 rounded bg-teal-500 text-white">
                    {submitting ? "Submitting..." : "Confirm Pickup"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}