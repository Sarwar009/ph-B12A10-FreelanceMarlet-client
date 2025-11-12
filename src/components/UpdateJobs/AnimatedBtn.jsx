import React from "react";
import { motion } from "framer-motion";

const AnimatedBtn = ({ text }) => (
  <motion.button
    type="submit"
    className="relative w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg overflow-hidden"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.span
      className="absolute left-0 bottom-0 h-[3px] bg-indigo-400"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
    />
    {text}
  </motion.button>
);

export default AnimatedBtn;
