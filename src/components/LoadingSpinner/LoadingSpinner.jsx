import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ size = 16, text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Rotating circle */}
      <motion.div
        className="rounded-full border-4 border-t-4 border-indigo-500 border-r-purple-500 border-b-pink-500 border-l-green-500 shadow-lg"
        style={{ width: size * 5, height: size * 5 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />

      {/* Bouncing text */}
      <motion.span
        className="mt-6 text-gray-700 dark:text-gray-300 font-semibold text-lg"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default LoadingSpinner;
