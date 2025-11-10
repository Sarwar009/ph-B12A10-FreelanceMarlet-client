import React from "react";
import { motion } from "framer-motion";
import FilterBar from "./Filter";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative bg-linear-to-r from-indigo-600 via-purple-600 to-pink-300 text-white py-20 px-6 shadow-xl overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_20%_30%,white,transparent_25%),radial-gradient(circle_at_80%_70%,white,transparent_25%)]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Find Your Next <span className="text-yellow-300">Freelance Job</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg text-indigo-200 mb-8"
        >
          Discover top freelance opportunities that match your skills and passion.
        </motion.p>
            
            <div className="flex gap-4 justify-center">
              <Link to='/addJob'>
                <button className="btn btn-outline border-gray-600 text-white">
                Create a Job
              </button>
              </Link>
            </div>
      </div>
    </section>
  );
};

export default Banner;
