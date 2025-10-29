import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GarmentCard from "./GarmentCard";

/* catalog: garment items per category (icons are keys mapped in GarmentCard) */
const CATALOG = {
  Iron: [
    { id: "iron-shirt", title: "Shirt", price: 30, icon: "mdi:tshirt-crew" },
    { id: "iron-pant", title: "Pant", price: 35, icon: "mdi:trousers" },
    { id: "iron-coat", title: "Coat", price: 80, icon: "mdi:coat-rack" },
    { id: "iron-kurta", title: "Kurta", price: 45, icon: "mdi:tshirt-crew-outline" },
    { id: "iron-churidar", title: "Churidar", price: 40, icon: "mdi:trousers" },
    { id: "iron-tee", title: "T‑Shirt", price: 25, icon: "mdi:tshirt-crew" },
    { id: "iron-formal", title: "Formal Shirt", price: 35, icon: "mdi:shirt" },
  ],
  "Wash & Iron": [
    { id: "wai-shirt", title: "Shirt", price: 60, icon: "mdi:washing-machine" },
    { id: "wai-pant", title: "Pant", price: 65, icon: "mdi:washing-machine" },
    { id: "wai-tee", title: "T‑Shirt", price: 50, icon: "mdi:washing-machine" },
  ],
  "Dry Clean": [
    { id: "dc-coat", title: "Coat", price: 150, icon: "mdi:dry-cleaning" },
    { id: "dc-suit", title: "Suit", price: 250, icon: "mdi:suitcase" },
  ],
};

const STACK = ["All", "Iron", "Wash & Iron"]; // order displayed as stack (top = index 0)

export default function ServicesSwipe({ onAdd }) {
  const [order, setOrder] = useState(STACK);
  const [animating, setAnimating] = useState(false);
  const dragThreshold = 120;
  const containerRef = useRef(null);

  const getItemsFor = (key) => {
    if (key === "All") {
      return Object.keys(CATALOG).flatMap((k) => CATALOG[k].map((it) => ({ ...it, category: k })));
    }
    return CATALOG[key]?.map((it) => ({ ...it, category: key })) ?? [];
  };

  const swipeAway = (dir = "right") => {
    if (animating) return;
    setAnimating(true);
    // visual is handled by motion; rotate stack after animation duration
    setTimeout(() => {
      setOrder((o) => {
        // rotate left when swiped away
        return [o[1], o[2], o[0]];
      });
      setAnimating(false);
    }, 300);
  };

  const onDragEnd = (event, info) => {
    const x = info.offset.x;
    if (x > dragThreshold) swipeAway("right");
    else if (x < -dragThreshold) swipeAway("left");
    // otherwise the card returns to center automatically
  };

  const top = order[0], mid = order[1], back = order[2];

  return (
    <section ref={containerRef} className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Services</h2>
          <div className="text-sm text-gray-600">Swipe cards to browse categories</div>
        </div>

        <div className="relative h-[420px]">
          {/* back card (bottom of pile) */}
          <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.94, y: 12, opacity: 0.9 }}
              animate={{ scale: 0.94, y: 12, opacity: 0.9 }}
              className="w-full bg-white border rounded-xl p-4 shadow"
              style={{ maxWidth: 780 }}
            >
              <div className="text-sm font-medium text-gray-500 mb-3">{back}</div>
              <div className="grid grid-cols-2 gap-3">
                {getItemsFor(back).slice(0, 6).map((g) => (
                  <GarmentCard key={g.id} item={g} onAdd={() => onAdd?.(g)} compact />
                ))}
              </div>
            </motion.div>
          </div>

          {/* mid card (middle in pile) */}
          <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.97, y: 6, opacity: 0.95 }}
              animate={{ scale: 0.97, y: 6, opacity: 0.95 }}
              className="w-full bg-white border rounded-xl p-4 shadow-md"
              style={{ maxWidth: 800 }}
            >
              <div className="text-sm font-medium text-gray-600 mb-3">{mid}</div>
              <div className="grid grid-cols-2 gap-3">
                {getItemsFor(mid).slice(0, 6).map((g) => (
                  <GarmentCard key={g.id} item={g} onAdd={() => onAdd?.(g)} compact />
                ))}
              </div>
            </motion.div>
          </div>

          {/* top interactive card */}
          <div className="absolute inset-0 flex items-start justify-center">
            <AnimatePresence>
              <motion.div
                key={top}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
                whileTap={{ scale: 0.99 }}
                dragElastic={0.16}
                initial={{ scale: 1, opacity: 1, x: 0 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ x: 500, opacity: 0, transition: { duration: 0.28 } }}
                className="w-full bg-white border rounded-xl p-5 shadow-lg cursor-grab"
                style={{ maxWidth: 820 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{top}</div>
                    <div className="text-xs text-gray-500">Tap item to add • drag to skip</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => swipeAway("left")}
                      className="px-3 py-1 rounded bg-gray-100 text-sm text-gray-700"
                      aria-label="Skip card"
                    >
                      Skip
                    </button>
                    <div className="text-xs text-gray-500">{/* pager */} {order.indexOf(top) + 1}/3</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {getItemsFor(top).map((g) => (
                    <GarmentCard key={g.id} item={g} onAdd={() => onAdd?.(g)} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => swipeAway("left")}
            className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 text-sm"
          >
            Next
          </button>
          <div className="text-sm text-gray-600">Card order: All → Iron → Wash & Iron (swipe to rotate)</div>
        </div>
      </div>
    </section>
  );
}