import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import GarmentCard from "./GarmentCard";
import SocialProof from "./SocialProof";
import { useCart } from "./CartContext";

export default function ServicesSwipe() {
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, (v) => v / 18);
  const controls = useAnimation();
  const dragThreshold = 110;
  const [isAnimating, setIsAnimating] = useState(false);
  const { addItem } = useCart();

  const CATALOG = {
    Iron: [
      { id: "iron-shirt", title: "Shirt", price: 30, icon: "mdi:tshirt-crew" },
      { id: "iron-pant", title: "Pant", price: 35, icon: "mdi:trousers" },
      { id: "iron-coat", title: "Coat", price: 80, icon: "mdi:coat-rack" },
      { id: "iron-kurta", title: "Kurta", price: 45, icon: "mdi:tshirt-crew-outline" },
    ],
    "Wash & Iron": [
      { id: "wai-shirt", title: "Shirt", price: 60, icon: "mdi:washing-machine" },
      { id: "wai-pant", title: "Pant", price: 65, icon: "mdi:washing-machine" },
      { id: "wai-tee", title: "T‑Shirt", price: 50, icon: "mdi:washing-machine" },
    ],
  };

  const TABS = ["All", "Iron", "Wash & Iron"];

  const getItemsFor = (tab) => {
    if (tab === "All") {
      return Object.keys(CATALOG).flatMap((k) =>
        CATALOG[k].map((it) => ({ ...it, category: k }))
      );
    }
    return (CATALOG[tab] || []).map((it) => ({ ...it, category: tab }));
  };

  const nextTab = index < TABS.length - 1 ? TABS[index + 1] : null;
  const prevTab = index > 0 ? TABS[index - 1] : null;
  const items = getItemsFor(TABS[index]);
  const nextItems = nextTab ? getItemsFor(nextTab) : [];
  const prevItems = prevTab ? getItemsFor(prevTab) : [];

  // Parallax transforms
  const p = (v) => Math.min(Math.abs(v) / dragThreshold, 1);
  const nextX = useTransform(x, (v) => (v < 0 ? 60 * (1 - p(v)) : 120));
  const nextOpacity = useTransform(x, (v) => (v < 0 ? 0.18 + 0.82 * p(v) : 0));
  const nextY = useTransform(x, (v) => (v < 0 ? -18 * (1 - p(v)) : -20));
  const nextScale = useTransform(x, (v) => (v < 0 ? 0.995 + 0.005 * p(v) : 0.995));
  const prevX = useTransform(x, (v) => (v > 0 ? -60 * (1 - p(v)) : -120));
  const prevOpacity = useTransform(x, (v) => (v > 0 ? 0.18 + 0.82 * p(v) : 0));
  const prevY = useTransform(x, (v) => (v > 0 ? -18 * (1 - p(v)) : -20));
  const prevScale = useTransform(x, (v) => (v > 0 ? 0.995 + 0.005 * p(v) : 0.995));

  const animateExit = async (dir) => {
    if ((dir === -1 && index >= TABS.length - 1) || (dir === 1 && index <= 0)) {
      await controls.start({ x: 0, y: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });
      x.set(0);
      return;
    }
    setIsAnimating(true);
    const exitX = dir === -1 ? -900 : 900;
    const exitY = 80;
    const exitRotate = dir === -1 ? -30 : 30;

    await controls.start({
      x: exitX,
      y: exitY,
      rotate: exitRotate,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    });

    setIndex((i) => (dir === -1 ? i + 1 : i - 1));
    x.set(0);
    controls.set({ x: 0, y: 0, rotate: 0, opacity: 1 });
    setIsAnimating(false);
  };

  const onDragEnd = (_, info) => {
    const finalX = x.get();
    const vx = info.velocity.x;
    if (finalX < -dragThreshold || vx < -700) animateExit(-1);
    else if (finalX > dragThreshold || vx > 700) animateExit(1);
    else controls.start({ x: 0, y: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });
  };

  return (
    <section className="py-10 bg-gradient-to-b from-cyan-50 via-teal-50 to-yellow-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Title */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-cyan-800 mb-2">Our Services</h2>

          {/* Category */}
          <div className="inline-flex gap-2 bg-yellow-200/70 px-4 py-2 rounded-full shadow-md font-medium text-cyan-700">
            <span>Category:</span>
            <span className="font-bold">{TABS[index]}</span>
          </div>

          {/* Dots indicator */}
          <div className="mt-2 flex justify-center gap-2">
            {TABS.map((tab, i) => (
              <span
                key={tab}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === index ? "bg-cyan-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Cards Container */}
        <div className="relative h-[480px]">
          {/* Prev / Next peek cards */}
          {prevTab && (
            <motion.div
              className="absolute inset-0 flex items-start justify-center pointer-events-none"
              style={{ x: prevX, opacity: prevOpacity, y: prevY, scale: prevScale, zIndex: 5 }}
            >
              <div className="w-full max-w-3xl bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-xl p-6 shadow-md border border-cyan-100">
                <div className="mb-4 text-sm font-semibold text-cyan-700">{prevTab}</div>
                <div className="grid grid-cols-2 gap-3">
                  {prevItems.map((g) => (
                    <GarmentCard key={g.id} item={g} onAdd={() => addItem(g)} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {nextTab && (
            <motion.div
              className="absolute inset-0 flex items-start justify-center pointer-events-none"
              style={{ x: nextX, opacity: nextOpacity, y: nextY, scale: nextScale, zIndex: 5 }}
            >
              <div className="w-full max-w-3xl bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-xl p-6 shadow-md border border-cyan-100">
                <div className="mb-4 text-sm font-semibold text-cyan-700">{nextTab}</div>
                <div className="grid grid-cols-2 gap-3">
                  {nextItems.map((g) => (
                    <GarmentCard key={g.id} item={g} onAdd={() => addItem(g)} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Top interactive card */}
          <motion.div
            key={TABS[index]}
            drag={!isAnimating ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x, rotate, zIndex: 10 }}
            onDragEnd={onDragEnd}
            dragElastic={0.16}
            animate={controls}
            whileTap={{ scale: 1.04 }}
            className="absolute inset-0 flex items-start justify-center"
          >
            <div className="w-full max-w-3xl bg-gradient-to-br from-white via-cyan-50 to-teal-50 rounded-2xl p-6 shadow-2xl border border-cyan-200">
              <div className="mb-4">
                <div className="text-sm font-semibold text-cyan-700">{TABS[index]}</div>
                <div className="text-xs text-gray-500">Drag left to see next • drag right to go back</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {items.map((g) => (
                  <GarmentCard
                    key={g.id}
                    item={g}
                    onAdd={() =>
                      addItem({
                        id: g.id,
                        title: g.title,
                        price: g.price,
                        category: g.category,
                        icon: g.icon,
                      })
                    }
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <SocialProof />
    </section>
  );
}
