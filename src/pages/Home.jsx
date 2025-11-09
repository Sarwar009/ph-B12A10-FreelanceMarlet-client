import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import Slider from '../components/Silder/Slider';
import {categories} from '../Data/Data';

export default function Home () {
  const [jobs, setJobs] = useState ([]);

  // Fetch latest 6 jobs from backend
  useEffect (() => {
    fetch ('http://localhost:3000/')
      .then (res => res.json ())
      .then (data => setJobs (data))
      .catch (err => console.error (err));
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* 🏁 Banner Section */}
      <section className="hero min-h-[80vh] bg-indigo-50">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/921/921071.png"
            alt="Banner"
            initial={{opacity: 0, x: 100}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 1}}
            className="w-72 lg:w-[400px]"
          />
          <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 1}}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-indigo-800">
              Your Reliable Freelance Marketplace
            </h1>
            <p className="py-6 text-gray-600 max-w-lg">
              Connect with talented professionals and trusted clients. Create
              jobs, find work, and collaborate easily — all in one platform.
            </p>
            <div className="flex gap-4">
              <button className="btn bg-indigo-600 text-white hover:bg-indigo-700">
                Explore Jobs
              </button>
              <button className="btn btn-outline border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                Create a Job
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ⚡ Latest Jobs (Dynamic Section) */}
      <div className="my-20 px-4 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Latest Jobs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map (job => (
            <motion.div
              key={job._id}
              whileHover={{scale: 1.03}}
              className="card bg-white shadow-xl border border-gray-100 p-5"
            >
              <img
                src={job.coverImage}
                alt={job.title}
                className="rounded-xl h-48 w-full object-cover"
              />
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-indigo-700">
                  {job.title}
                </h3>
                <p className="text-gray-500">{job.category}</p>
                <p className="text-sm text-gray-400 mt-2">{job.summary}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
        className="py-16 bg-indigo-50"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Top Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map (cat => (
            <motion.div
              key={cat.name}
              whileHover={{scale: 1.05}}
              className="card bg-white shadow-md border p-6 w-60 text-center"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-16 h-16 mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-700">
                {cat.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 🧩 Static Section 2 — About The Platform */}
      <div className="py-20 px-6 lg:px-32 bg-white">
        <motion.div
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            About Freelance MarketPlace
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Freelance MarketPlace is a modern platform where clients and freelancers
            connect, collaborate, and grow together. Our goal is to make the job
            hiring and working process smooth, transparent, and rewarding for everyone.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
