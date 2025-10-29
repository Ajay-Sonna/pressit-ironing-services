import React from "react";
import { motion } from "framer-motion";

const RevealSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)", boxShadow: "0 0 0 rgba(0, 153, 255, 0)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        boxShadow: "0 0 20px rgba(0, 153, 255, 0.15)",
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      viewport={{ once: false, amount: 0.25 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default RevealSection;

