import { motion } from "framer-motion";
import ShirtImage from "/models/blue_w.png"; // replace with your actual shirt image

const ShirtPlaceholder = () => {
  return (
    <motion.img
      src={ShirtImage}
      alt="Shirt"
      className="w-96 h-auto"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1, 1, 0.6],
        rotate: [0, 5, -5, 15],
        x: [0, 30, -30, 120], // smooth curvy movement
        y: [50, -20, 20, -120],
      }}
      transition={{
        duration: 6,
        ease: "easeInOut",
        times: [0, 0.3, 0.7, 1],
        repeat: Infinity, // loop forever
        repeatDelay: 1,
      }}
    />
  );
};

export default ShirtPlaceholder;
