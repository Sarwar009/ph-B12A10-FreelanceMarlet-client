// src/components/MyJobs/MyAddedJobs.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import JobCard from "../components/AllJobs/JobCard";
import { useAuth } from "../contexts/AuthProvider";
import useApi from "../hooks/useApi";

const MyAddedJobs = () => {
  const { user, API } = useAuth();
  const api = useApi();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    const fetchJobs = async () => {
      try {
        const res = await api.get("/myAddedJobs", { params: { email: user.email } });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your jobs!");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [API, user?.email]);

  const onDelete = async (id) => {
    try {
      await api.delete(`/deleteJob/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the job!");
    }
  };

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
              onDelete={onDelete}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyAddedJobs;
