// import React, { useRef, useState } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// import ClothesShowcase from "./ClothesShowcase";
// import PickupModal from "./PickupModal";

// export default function Home() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll();

//   const xRaw = useTransform(scrollYProgress, [0, 0.6], [0, 150]);
//   const yRaw = useTransform(scrollYProgress, [0, 0.6], [0, -100]);
//   const rotateYRaw = useTransform(scrollYProgress, [0, 0.6], [0, 180]);
//   const scaleRaw = useTransform(scrollYProgress, [0, 0.8], [1, 1.2]);
//   const opacityRaw = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

//   const x = useSpring(xRaw, { stiffness: 120, damping: 24 });
//   const y = useSpring(yRaw, { stiffness: 120, damping: 24 });
//   const rotateY = useSpring(rotateYRaw, { stiffness: 100, damping: 20 });
//   const scale = useSpring(scaleRaw, { stiffness: 100, damping: 20 });
//   const opacity = useSpring(opacityRaw, { stiffness: 100, damping: 20 });

//   const [openModal, setOpenModal] = useState(false);

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full  h-screen overflow-hidden  bg-[url('/models/white-fabric.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/10 before:backdrop-blur-[2px]">
//       <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center">
//         <div className="w-full md:w-1/2 lg:w-5/12 z-20">
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 drop-shadow-md">
//           Fresh Clothes, <br /> <span className="text-gray-500 border-black">Fresh You</span>
//           </h1>
//           <p className="mt-5 text-lg text-gray-700 max-w-xl leading-relaxed">
//             Premium ironing at your doorstep — ₹30 per item. Minimum order ₹100.
//             Second order free. Schedule pickup and we’ll return perfectly
//             pressed and folded clothes.
//           </p>
//           <div className="mt-8 flex gap-4">
//             <div className="mt-8 flex gap-4">
//               <button
//                 onClick={() => setOpenModal(true)}
//                 className="inline-block px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
//               >
//                 Book Pickup
//               </button>{" "}
//               <a
//                 href="#how"
//                 className="inline-block px-5 py-3 rounded-lg border border-gray-300 text-gray-800 bg-white/60 backdrop-blur-sm"
//               >
//                 How it works
//               </a>
//               <PickupModal
//                 isOpen={openModal}
//                 onClose={() => setOpenModal(false)}
//               />
//             </div>

//           </div>
//         </div>
//         <div className="relative flex-1 flex items-center justify-center">
//           <ClothesShowcase />
//         </div>
//       </div>

//       {/* Mobile fallback */}
//       <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
//         <motion.div style={{ scale }}>
//           <ClothesShowcase small />
//         </motion.div>
//       </div>

//       {/* 3-Step Modal */}
//     </section>
//   );
// }

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useCart } from "./CartContext";
import ClothesShowcase from "./ClothesShowcase";
import PickupModal from "./PickupModal";
import BottomCart from "./BottomCart";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const xRaw = useTransform(scrollYProgress, [0, 0.6], [0, 150]);
  const yRaw = useTransform(scrollYProgress, [0, 0.6], [0, -100]);
  const rotateYRaw = useTransform(scrollYProgress, [0, 0.6], [0, 180]);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.8], [1, 1.2]);
  const opacityRaw = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

  const x = useSpring(xRaw, { stiffness: 120, damping: 24 });
  const y = useSpring(yRaw, { stiffness: 120, damping: 24 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 100, damping: 20 });
  const scale = useSpring(scaleRaw, { stiffness: 100, damping: 20 });
  const opacity = useSpring(opacityRaw, { stiffness: 100, damping: 20 });

  // Use CartContext API (openModal / closeModal)
  const { isProductModalOpen, openProductModal, closeProductModal } = useCart();

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden py-20  bg-gradient-to-b from-slate-50 via-cyan-50 to-yellow-50 bg-cover bg-center before:absolute before:inset-0"
      role="region"
      aria-labelledby="home-hero"
    >
      <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center">
        <div className="w-full md:w-1/2 lg:w-5/12 z-20">
          <h1 id="home-hero" className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 drop-shadow-md">
            Fresh Clothes, <br /> <span className="text-gray-500">Fresh You</span>
          </h1>
          <p className="mt-5 text-lg text-gray-700 max-w-xl leading-relaxed">
            Premium ironing at your doorstep — ₹30 per item. Minimum order ₹100.
            Second order free. Schedule pickup and we’ll return perfectly
            pressed and folded clothes.
          </p>
          <div className="mt-8 flex gap-4">
            {/* Open modal at Step 1 (choose items) */}
            <button onClick={() => openProductModal()} className="inline-block px-6 py-3 rounded-lg bg-teal-500 text-white">
              Book Pickup
            </button>

            <a
              href="#howitworks"
              className="inline-block px-5 py-3 rounded-lg border border-gray-300 text-gray-800 bg-white/60 backdrop-blur-sm"
            >
              How it works
            </a>

            {/* PickupModal reads context; render without props */}
            <PickupModal />
          </div>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <ClothesShowcase />
        </div>
      </div>

      {/* Mobile fallback */}
      <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div style={{ scale }}>
          <ClothesShowcase small />
        </motion.div>
      </div>

      <BottomCart />
    </div>
  );
}
