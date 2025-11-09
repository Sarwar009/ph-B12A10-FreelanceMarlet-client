import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Floating 404 number */}
      <motion.h1
        className="text-[10rem] font-extrabold text-red-500"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        404
      </motion.h1>

      {/* Floating text */}
      <motion.p
        className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        Oops! Page Not Found
      </motion.p>

      <Link
        to="/"
        className="btn btn-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}

