import React, { useEffect, useState } from "react";
import Banner from "../components/AllJobs/Banner";
import JobCard from "../components/AllJobs/JobCard";
import FilterBar from "../components/AllJobs/Filter";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../contexts/AuthProvider";

const Home = () => {
  const { API, jobs, setJobs } = useAuth();

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("");

  // Load jobs from API
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/alljobs`);
        const data = Array.isArray(res.data) ? res.data : res.data.jobs || [];
        setJobs(data);

        const cats = [...new Set(data.map((job) => job.category))];
        setCategories(cats);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [API, setJobs]);

  // Filter & sort jobs
  useEffect(() => {
    const safeJobs = Array.isArray(jobs) ? jobs : [];
    let tempJobs = [...safeJobs];

    // Filter by category
    if (selectedCategory) {
      tempJobs = tempJobs.filter((job) => job.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      tempJobs = tempJobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by date
    if (dateFilter === "newest") {
      tempJobs.sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );
    } else if (dateFilter === "oldest") {
      tempJobs.sort(
        (a, b) => new Date(a.postedDate) - new Date(b.postedDate)
      );
    }

    setFilteredJobs(tempJobs);
  }, [jobs, selectedCategory, searchQuery, dateFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner text="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-500">
      <Banner />

      {/* Filtering jobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto pt-8"
      >
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onFilterChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
        {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={(deletedId) =>
                setJobs((prev) => prev.filter((j) => j._id !== deletedId))
              }
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No jobs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
