// src/components/ClothItem.jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * ClothItem
 * Props:
 *  - wrinkledSrc: string (public path to wrinkled image, e.g. "/images/shirt-wrinkled.png")
 *  - foldedSrc: string (public path to folded image)
 *  - index: number (used to stagger)
 *  - size: 'md'|'lg' etc (optional)
 */
export default function ClothItem({
  wrinkledSrc,
  foldedSrc,
  index = 0,
  size = "lg",
  flipDelayOffset = 0.6, // seconds after entrance to flip
}) {
  const [flipped, setFlipped] = useState(false);
  const controls = useAnimation();

  // entrance animation variant + stagger uses index
  useEffect(() => {
    // play entrance using index-based delay
    controls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: index * 0.35, duration: 0.7, ease: "easeOut" },
    });

    // schedule flip (wrinkled -> folded)
    const flipTimer = setTimeout(() => {
      controls.start({
        rotateY: 180,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }, // smooth cubic
      });
      setTimeout(() => setFlipped(true), 450); // halfway through flip mark flipped
    }, 1000 * (index * 0.35 + flipDelayOffset)); // entrance delay + offset

    return () => clearTimeout(flipTimer);
  }, [controls, index, flipDelayOffset]);

  // sizes
  const sizeMap = {
    sm: { w: 160, h: 160 },
    md: { w: 220, h: 220 },
    lg: { w: 260, h: 260 },
  };
  const { w, h } = sizeMap[size] || sizeMap.lg;

  // styling helpers
  const wrapperStyle = {
    width: w,
    height: h,
    perspective: 1400, // important for 3D flip
  };

  const faceStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    objectFit: "contain",
  };

  return (
    <div
      style={wrapperStyle}
      className="relative flex items-center justify-center"
      // hover to flip back quickly (optional)
      onMouseEnter={() => {
        // small interactive preview: flip back while hovering
        if (flipped) {
          controls.start({ rotateY: 0, transition: { duration: 0.6 } });
          setFlipped(false);
          // flip forward again after 1.5s
          setTimeout(() => {
            controls.start({ rotateY: 180, transition: { duration: 0.9 } });
            setTimeout(() => setFlipped(true), 450);
          }, 1500);
        }
      }}
    >
      {/* soft drop shadow */}
      <motion.div
        style={{ width: "90%", height: 18 }}
        className="absolute bottom-2 rounded-full bg-black/20"
        animate={{
          scaleX: [0.9, 1, 0.95],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D card container */}
      <motion.div
        animate={controls}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front (Wrinkled) */}
        <motion.img
          src={wrinkledSrc}
          alt="wrinkled"
          style={{
            ...faceStyle,
            transform: "rotateY(0deg)",
            // slight floating animation
            translateZ: 0,
          }}
          className="rounded-md"
          draggable={false}
        />

        {/* Back (Folded) - rotated 180deg so it appears upright after container rotates */}
        <motion.div
          style={{
            ...faceStyle,
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <img
            src={foldedSrc}
            alt="folded"
            style={{ width: "96%", height: "96%", objectFit: "contain" }}
            draggable={false}
            className="rounded-md"
          />

          {/* shine sweep (only visible after folded appears) */}
          {/* <motion.div
            initial={{ opacity: 0, x: "-120%" }}
            animate={flipped ? { opacity: 0.85, x: "120%" } : { opacity: 0 }}
            transition={
              flipped
                ? { delay: 0.25 + index * 0.05, duration: 0.9, ease: "easeInOut" }
                : { duration: 0.2 }
            }
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "35%",
              height: "100%",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%)",
              transform: "skewX(-20deg)",
              pointerEvents: "none",
            }}
          /> */}
        </motion.div>
      </motion.div>
    </div>
  );
}


// // src/components/ClothItem.jsx
// import { motion } from "framer-motion";

// const ClothItem = ({ wrinkledSrc, foldedSrc, delay = 0 }) => {
//   return (
//     <div className="relative w-40 h-40 flex items-center justify-center">
//       {/* Wrinkled phase */}
//       <motion.img
//         src={wrinkledSrc}
//         alt="Wrinkled cloth"
//         className="absolute w-60 h-60 object-contain"
//         initial={{ opacity: 0, scale: 0.2, y: 50 }}
//         animate={{
//           opacity: [0, 1, 1, 0],
//           scale: [0.8, 1, 1, 0.5],
//           rotate: [0, 15, -15, 20],
//           y: [50, -20, 20, -80],
//         }}
//         transition={{
//           duration: 4,
//           delay,
//           ease: "easeInOut",
//           times: [0, 0.3, 0.7, 1],
//         }}
//       />

//       {/* Folded phase */}
//       <motion.img
//         src={foldedSrc}
//         alt="Folded cloth"
//         className="absolute w-64 h-60 object-cover "
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1, delay: delay + 3.5 }}
//       />
//     </div>
//   );
// };

// export default ClothItem;
