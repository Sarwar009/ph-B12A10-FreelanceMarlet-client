import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Slider() {
  return (
    <motion.div
      className="carousel w-full max-w-4xl mx-auto rounded-xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://images.unsplash.com/photo-1581092795360-9b6c1cc1b6f8"
          className="w-full object-cover"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            <ChevronLeft />
          </a>
          <a href="#slide2" className="btn btn-circle">
            <ChevronRight />
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://images.unsplash.com/photo-1556761175-129418cb2dfe"
          className="w-full object-cover"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            <ChevronLeft />
          </a>
          <a href="#slide3" className="btn btn-circle">
            <ChevronRight />
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://images.unsplash.com/photo-1551836022-4c4c79ecde16"
          className="w-full object-cover"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            <ChevronLeft />
          </a>
          <a href="#slide1" className="btn btn-circle">
            <ChevronRight />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
