import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../Data/Data";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import JobCard from "../components/AllJobs/JobCard";
import { useNavigate } from "react-router";

export default function Home() {
  const { jobs, setJobs, API, loading } = useAuth();
  const [recentJobs, setRecentJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await axios.get(`${API}/alljobs`);
        const data = res.data;
        console.log(data);
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    loadJobs();
  }, []);

  useEffect(() => {
    if (jobs?.length > 0) {
      const sorted = [...jobs].sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );
      const latestSix = sorted.slice(0, 6);
      setRecentJobs(latestSix);
    }
  }, [jobs]);
if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="w-full overflow-hidden">
      {/* Banner */}
      <div className="hero min-h-[80vh] bg-indigo-50">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/921/921071.png"
            alt="Banner"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-72 lg:w-[400px]"
          />
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-indigo-800">
              Your Reliable Freelance Marketplace
            </h1>
            <p className="py-6 text-gray-600 max-w-lg">
              Connect with talented professionals and trusted clients. Create
              jobs, find work, and collaborate easily — all in one platform.
            </p>
            <div className="flex gap-4">
              <button onClick={(e)=> {e.preventDefault(); navigate('/alljobs')}} className="btn bg-indigo-600 text-white hover:bg-indigo-700">
                Explore Jobs
              </button>
              <button onClick={(e)=> {e.preventDefault(); navigate('/addJob')}} className="btn btn-outline border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                Create a Job
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-16 px-4 lg:px-20 bg-white">
        {/* Title */}
        <div className="text-center mb-4 relative">
          <h2 className="text-3xl font-bold text-indigo-800 inline-block relative">
            Latest Jobs
            {/*  line */}
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-indigo-600 rounded-full -translate-x-1/2"></span>
          </h2>
        </div>

        {/* Subtitle / Description */}
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          Explore the latest opportunities from top recruiters. Here you can
          find the most recent jobs in web development, digital marketing,
          graphics designing, and more. Stay updated and never miss a chance!
        </p>

        {/* Jobs Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>

      <div className="py-16 bg-indigo-50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4 relative"
        >
          <h2 className="text-3xl font-bold text-indigo-800 inline-block relative">
            Top Categories
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-indigo-600 rounded-full -translate-x-1/2"></span>
          </h2>
          {/* Subtitle */}
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Discover the main areas where we have exciting job opportunities.
            Pick a category and explore the latest positions to boost your
            career today!
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="relative card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 p-6 w-60 text-center cursor-pointer group transition-all duration-500"
            >
              {/* Icon  */}
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-linear-to-tr from-indigo-100 to-indigo-200 group-hover:from-indigo-200 group-hover:to-indigo-300 transition-all duration-500">
                <img src={cat.img} alt={cat.name} className="w-10 h-10" />
              </div>

              {/* Category Name */}
              <h3 className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-indigo-700 transition-colors">
                {cat.name}
              </h3>

              {/* description */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {cat.description ||
                  "Explore jobs in this category and advance your career."}
              </p>

              {/* line */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-indigo-600 transition-all duration-500 group-hover:w-full"></div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="py-20 px-6 lg:px-32 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">
            About Freelance MarketPlace
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Freelance MarketPlace is a modern platform where clients and
            freelancers connect, collaborate, and grow together. Our goal is to
            make the job hiring and working process smooth, transparent, and
            rewarding for everyone.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
