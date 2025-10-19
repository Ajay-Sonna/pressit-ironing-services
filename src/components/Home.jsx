import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ShirtPlaceholder from "./ShirtPlaceholder";
import ClothesShowcase from "./ClothesShowcase";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Animate the shirt
  const xRaw = useTransform(scrollYProgress, [0, 0.6], [0, 150]); // move right
  const yRaw = useTransform(scrollYProgress, [0, 0.6], [0, -100]); // move up
  const rotateYRaw = useTransform(scrollYProgress, [0, 0.6], [0, 180]); // rotate
  const scaleRaw = useTransform(scrollYProgress, [0, 0.8], [1, 1.2]); // zoom
  const opacityRaw = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]); // fade

  // Smooth with springs
  const x = useSpring(xRaw, { stiffness: 120, damping: 24 });
  const y = useSpring(yRaw, { stiffness: 120, damping: 24 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 100, damping: 20 });
  const scale = useSpring(scaleRaw, { stiffness: 100, damping: 20 });
  const opacity = useSpring(opacityRaw, { stiffness: 100, damping: 20 });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden hero-bg bg-gray-400"
    >
      <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center">
        {/* Left column: text */}
        <div className="w-full md:w-1/2 lg:w-5/12 z-20">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 drop-shadow-md">
            Fresh Clothes, <br /> Fresh You
          </h1>
          <p className="mt-5 text-lg text-gray-700 max-w-xl leading-relaxed">
            Premium ironing at your doorstep — ₹30 per item. Minimum order ₹100.
            Second order free. Schedule pickup and we’ll return perfectly
            pressed and folded clothes.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="#book"
              className="inline-block px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
            >
              Book Pickup
            </a>
            <a
              href="#how"
              className="inline-block px-5 py-3 rounded-lg border border-gray-300 text-gray-800 bg-white/60 backdrop-blur-sm"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Right column: animated shirt */}
        {/* <div className="hidden md:flex w-1/2 justify-end items-center pointer-events-none">
          <motion.div
            style={{ x, y, rotateY, scale, opacity }}
            className="relative"
          >
            <ShirtPlaceholder />
          </motion.div>
        </div> */}
        <div className="relative flex-1 flex items-center justify-center">
          {/* <ShirtPlaceholder /> */}
          <ClothesShowcase />
        </div>
      </div>

      {/* Mobile fallback */}
      <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div style={{ scale }}>
          <ClothesShowcase small />
        </motion.div>
      </div>
    </section>
  );
}

//--
// import shirtImg from "/models/shirt02.png";
// // update your path- /models/shirt01.png

// const Hero = () => {
//   return (
//     <section className="h-screen flex items-center bg-[#fffde7] px-10">
//       {/* Left side - Business text */}
//       <div className="w-1/2 flex flex-col justify-center space-y-6">
//         <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
//           Fresh Clothes, <br /> Fresh You
//         </h1>
//         <p className="text-lg text-gray-600">
//           Premium ironing services delivered right to your doorstep.
//         </p>
//         <button className="w-fit px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition">
//           Book Now
//         </button>
//       </div>

//       {/* Right side - Shirt image */}
//       <div className="w-1/2 flex justify-center">
//         <img
//           src={shirtImg}
//           alt="Wrinkled Shirt"
//           className="max-h-[400px] object-contain"
//         />
//       </div>
//     </section>
//   );
// };

// export default Hero;

// Home.jsx
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import ShirtPlaceholder from "./ShirtPlaceholder";

// const Home = () => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   // Map scroll progress to opacity + scale
//   const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.8]);
//   const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

//   return (
//     <section ref={ref} className="relative h-screen bg-yellow-50">
//       {/* Wrinkled Shirt */}
//       <motion.div
//         style={{ opacity, scale, y }}
//         className="flex items-center justify-center h-full"
//       >
//         <ShirtPlaceholder size={300} />
//       </motion.div>

//       {/* Text Overlay */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//         <h1 className="text-5xl font-bold drop-shadow-lg text-gray-900">
//           Fresh Clothes, Fresh You
//         </h1>
//         <p className="mt-4 text-lg text-gray-700">
//           Ironing Services at your doorstep.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Home;

// import ShirtPlaceholder from "./ShirtPlaceholder";

// const Home = () => {
//   return (
//     // make it tall so scroll exists
//     <div className="relative bg-yellow-50">

//         <div className="absolute inset-0 bg-black/30" />
//       {/* Cloth placeholders */}
//       <ShirtPlaceholder top="5rem" right="5rem" index={0} />
//       <ShirtPlaceholder top="8rem" right="7rem" index={1} />
//       <ShirtPlaceholder top="10rem" right="10rem" index={2} />

//       {/* Hero section */}
//       <div
//         className="relative  flex flex-col items-center justify-center h-screen bg-cover bg-center"
//         style={{
//           backgroundImage: "url('./models/fabric.jpg')",
//       }}
//       >
//         <div className="absolute inset-0 bg-black/30" />

//         <h1 className="text-5xl font-bold  drop-shadow-lg">
//           Fresh Clothes, Fresh You
//         </h1>
//         <p className="mt-4 text-lg text-white drop-shadow-lg">
//           Ironing Services at your doorstep.
//         </p>
//       </div>

//       {/* Extra spacer to scroll further */}
//     </div>
//   );
// };

// export default Home;
