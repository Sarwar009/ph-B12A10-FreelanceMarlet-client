import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-4">
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeInOut" }}
          className="text-6xl mb-6"
        >
          😔
        </motion.div>

        {/* Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          We are sorry for this request.
        </motion.h2>

        {/* Animated Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-gray-600 leading-relaxed mb-8"
        >
          Currently you can’t reset your password. <br />
          If you forgot your password, you can create a new account.
        </motion.p>

        {/* Button Animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/register"
            className="btn bg-indigo-600 text-white border-none hover:bg-indigo-700 w-full"
          >
            Create New Account
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
