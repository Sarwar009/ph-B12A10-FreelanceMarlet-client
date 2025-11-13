// src/components/contact/Contact.jsx
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you can integrate with your backend or email API
    alert("Message sent!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-5 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400 animate-fadeIn">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300 animate-fadeIn delay-200">
          Have questions or want to collaborate? We’re here to help! Fill out the form or reach us via the contact details below.
        </p>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-5 md:px-20 grid md:grid-cols-3 gap-10 text-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-fadeIn">
          <FaPhone className="text-4xl text-indigo-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Phone</h3>
          <p>+880 123 456 789</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-fadeIn delay-200">
          <FaEnvelope className="text-4xl text-indigo-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p>support@freelancemarket.com</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-fadeIn delay-400">
          <FaMapMarkerAlt className="text-4xl text-indigo-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Location</h3>
          <p>Dhaka, Bangladesh</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-5 md:px-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-6 animate-fadeIn"
        >
          <h2 className="text-3xl font-semibold text-indigo-600 mb-4 text-center">
            Send Us a Message
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
            required
          />
          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Optional: Map */}
      <section className="py-16 px-5 md:px-20">
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.904896411446!2d90.40126407549138!3d23.81033148458893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85d1f92ef1d%3A0x91a2f39e3c19dc0b!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1696351847623!5m2!1sen!2sus"
          className="w-full h-64 rounded-xl shadow-lg border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
