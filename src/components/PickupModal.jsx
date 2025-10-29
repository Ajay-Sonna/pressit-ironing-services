import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useCart } from "./CartContext";

const PRODUCTS = [
  { id: "iron-shirt", title: "Shirt", price: 30, category: "Iron", icon: "mdi:tshirt-crew" },
  { id: "iron-pant", title: "Pant", price: 35, category: "Iron", icon: "mdi:trousers" },
  { id: "iron-coat", title: "Coat", price: 80, category: "Iron", icon: "mdi:coat-rack" },
  { id: "wai-shirt", title: "T-Shirt", price: 60, category: "Wash & Iron", icon: "mdi:washing-machine" },
  { id: "wai-pant", title: "Pant (W&I)", price: 65, category: "Wash & Iron", icon: "mdi:washing-machine" },
  { id: "wai-towel", title: "Towel", price: 20, category: "Wash & Iron", icon: "mdi:towel" },
  { id: "wai-saree", title: "Saree", price: 90, category: "Wash & Iron", icon: "mdi:cloth" },
   { id: "wai-towel", title: "Towel", price: 20, category: "Wash & Iron", icon: "mdi:towel" },
  { id: "wai-saree", title: "Saree", price: 90, category: "Wash & Iron", icon: "mdi:cloth" },
];

const CATEGORIES = ["All", "Iron", "Wash & Iron"];

export default function PickupModal() {
  const {
    isProductModalOpen,
    closeProductModal,
    addItem,
    openBottomCart,
    totalItems,
    bottomCartOpen,
  } = useCart();

  const [catIdx, setCatIdx] = useState(0);
  const currentCategory = CATEGORIES[catIdx];

  const [showTopBlur, setShowTopBlur] = useState(false);
  const [showBottomBlur, setShowBottomBlur] = useState(true);
  const scrollRef = useRef(null);

  const productsByCategory = useMemo(() => {
    const grouped = { All: PRODUCTS };
    CATEGORIES.forEach((cat) => {
      if (cat !== "All") grouped[cat] = PRODUCTS.filter((p) => p.category === cat);
    });
    return grouped;
  }, []);

  useEffect(() => {
    if (bottomCartOpen && isProductModalOpen) closeProductModal();
  }, [bottomCartOpen, isProductModalOpen, closeProductModal]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      setShowTopBlur(scrollTop > 5);
      setShowBottomBlur(scrollTop + clientHeight < scrollHeight - 5);
    };

    scrollEl.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [catIdx]);

  if (!isProductModalOpen) return null;

  const handleDragEnd = (_, info) => {
    const dx = info.offset.x;
    if (dx < -40 && catIdx < CATEGORIES.length - 1) setCatIdx((i) => i + 1);
    else if (dx > 40 && catIdx > 0) setCatIdx((i) => i - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl h-[80vh] bg-white/95 backdrop-blur-md rounded-lg shadow-2xl flex flex-col"
      >
        {/* HEADER */}
        <div className="border-b p-4 flex flex-col items-center relative">
          <button
            onClick={closeProductModal}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>

          <AnimatePresence mode="wait">
            <motion.h2
              key={currentCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-lg font-semibold"
            >
              {currentCategory.toUpperCase()}
            </motion.h2>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-3">
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                onClick={() => setCatIdx(i)}
                className={`px-3 py-1 rounded-md text-sm ${
                  i === catIdx ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 relative overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            style={{ touchAction: "pan-y" }}
            className="h-full"
          >
            <div ref={scrollRef} className="h-full overflow-y-auto px-4 pb-6 scroll-smooth">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCategory}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-3 py-4"
                >
                  {(productsByCategory[currentCategory] || []).map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between border rounded-lg p-3 bg-white/70 backdrop-blur-sm shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-teal-600">
                          <Icon icon={p.icon} width="20" height="20" />
                        </div>
                        <div className="text-sm font-medium">{p.title}</div>
                      </div>
                      <button
                        onClick={() =>
                          addItem({
                            id: p.id,
                            title: p.title,
                            price: p.price,
                            category: p.category,
                            icon: p.icon,
                          })
                        }
                        className="px-3 py-1 rounded bg-teal-500 text-white text-sm hover:bg-teal-600 transition"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dynamic Top & Bottom Fades */}
            <motion.div
              initial={false}
              animate={{ opacity: showTopBlur ? 1 : 0 }}
              className="pointer-events-none absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white/90 to-transparent transition-opacity duration-300"
            />
            <motion.div
              initial={false}
              animate={{ opacity: showBottomBlur ? 1 : 0 }}
              className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white/90 to-transparent transition-opacity duration-300"
            />
          </motion.div>
        </div>

        {/* FOOTER */}
        <div className="border-t p-4 flex items-center justify-between bg-white/90 backdrop-blur-md">
          <div className="text-sm text-gray-500">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in cart
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded border text-sm"
              onClick={() => {
                closeProductModal();
                openBottomCart(1);
              }}
            >
              View Cart
            </button>

            <button
              className="px-4 py-1 rounded bg-teal-500 text-white text-sm"
              onClick={() => {
                closeProductModal();
                openBottomCart(2);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
