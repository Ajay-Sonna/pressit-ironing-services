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
        </motion.div>
      </motion.div>
    </div>
  );
}

