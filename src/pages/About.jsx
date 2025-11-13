// src/pages/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <motion.section
        className="relative bg-indigo-600 dark:bg-indigo-700 text-white py-24 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          We are a team of passionate developers building amazing digital experiences.
        </p>
      </motion.section>

      {/* Our Mission */}
      <motion.section
        className="py-16 px-6 max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Our Mission</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          To provide high-quality web solutions that empower businesses to grow and succeed online.
        </p>
      </motion.section>

      {/* Our Values */}
      <motion.section
        className="py-16 px-6 bg-gray-100 dark:bg-gray-800 max-w-6xl mx-auto rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600 dark:text-indigo-400">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Integrity", desc: "We maintain honesty and transparency in all our work." },
            { title: "Innovation", desc: "We embrace creativity and cutting-edge technology." },
            { title: "Collaboration", desc: "Teamwork is at the heart of everything we do." },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Team */}
      <motion.section
        className="py-16 px-6 max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-indigo-600 dark:text-indigo-400">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Alice Johnson", role: "Frontend Developer", img: "https://i.ibb.co/XYZ123/alice.jpg" },
            { name: "Bob Smith", role: "Backend Developer", img: "https://i.ibb.co/XYZ123/bob.jpg" },
            { name: "Charlie Lee", role: "UI/UX Designer", img: "https://i.ibb.co/XYZ123/charlie.jpg" },
            { name: "Dana White", role: "Project Manager", img: "https://i.ibb.co/XYZ123/dana.jpg" },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={member.img} alt={member.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact / Call to Action */}
      <motion.section
        className="py-16 px-6 bg-indigo-600 dark:bg-indigo-700 text-white text-center rounded-3xl mx-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Ready to build something amazing with us? Reach out and let's get started!
        </p>
        <button className="px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-200 transition">
          Contact Us
        </button>
      </motion.section>
    </div>
  );
};

export default About;
