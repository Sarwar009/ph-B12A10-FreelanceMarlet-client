// src/components/MyJobs/MyAddedJobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import JobCard from "../components/AllJobs/JobCard";

const MyAddedJobs = () => {
  const { user, API } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API}/allJobs`);
        const userJobs = res.data.filter((job) => job.userEmail === user.email);
        setJobs(userJobs);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your jobs!");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [API, user?.email]);

  if (loading) return <LoadingSpinner text="Loading" />;

  return (
    <div className="min-h-screen py-10 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-10"
      >
        🧾 My Added Jobs
      </motion.h2>

      {jobs.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 dark:text-gray-300"
        >
          You haven’t added any jobs yet.
        </motion.p>
      ) : (
        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        >
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={(deletedId) =>
                setJobs((prev) => prev.filter((j) => j._id !== deletedId))
              }
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyAddedJobs;
