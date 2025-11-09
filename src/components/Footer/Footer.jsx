import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";

export default function Footer() {
  const links = (
    <>
      <li>
        <NavLink to='/' className="hover:text-white">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='about' className="hover:text-white">
          About
        </NavLink>
      </li>
      <li>
        <NavLink to='allJobs' className="hover:text-white">
          All Jobs
        </NavLink>
      </li>
      <li>
        <NavLink to='/contact' className="hover:text-white">
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to='/t&c' className="hover:text-white">
          Terms & Conditions
        </NavLink>
      </li>
    </>
  );
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-900 text-white py-12 px-6 mt-20"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400 text-sm">
            We are passionate about creating amazing web experiences for our
            users.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            {links}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="text-gray-400 text-sm">Email: info@example.com</p>
          <p className="text-gray-400 text-sm">Phone: +123 456 7890</p>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-sm">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </motion.footer>
  );
}
