import React, {useEffect, useState} from 'react';
import Banner from '../components/AllJobs/Banner';
import JobCard from '../components/AllJobs/JobCard';
import FilterBar from '../components/AllJobs/Filter';
import {motion} from 'framer-motion';
import axios from 'axios';
import {useAuth} from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const Home = () => {
  const {API, jobs, setJobs} = useAuth ();

  const [filteredJobs, setFilteredJobs] = useState ([]);
  const [categories, setCategories] = useState ([]);
  const [selectedCategory, setSelectedCategory] = useState ('');
  const [searchQuery, setSearchQuery] = useState ('');
  const [loading, setLoading] = useState (true);

  useEffect (() => {
    const loadJobs = async () => {
      try {
        const res = await axios.get (`${API}/alljobs`);
        const data = res.data;
        console.log (data);
        setJobs (data);
        const cats = [...new Set (data.map (job => job.category))];
        setCategories (cats);
      } catch (err) {
        console.error ('Error fetching jobs:', err);
      } finally {
        
    setLoading (false);
      }
    };

    loadJobs ();
  }, [setJobs, API]);

  useEffect (
    () => {
      let updated = [...jobs];

      // category filter
      if (selectedCategory) {
        updated = updated.filter (job => job.category === selectedCategory);
      }

      // search filter
      if (searchQuery.trim () !== '') {
        updated = updated.filter (job =>
          job.title.toLowerCase ().includes (searchQuery.toLowerCase ())
        );
      }

      setFilteredJobs (updated);

      setLoading (false);
    },
    [selectedCategory, searchQuery, jobs]
  );

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner text='Loading...'/>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-500">
      <Banner />

      {/* Filtering jobs */}

      <motion.div
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{delay: 0.3}}
        className="max-w-4xl mx-auto pt-8"
      >
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onFilterChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
        {filteredJobs.map (job => <JobCard key={job._id} job={job} onDelete={(deletedId) =>
                setJobs((prev) => prev.filter((j) => j._id !== deletedId))
              }/>)}
      </div>
    </div>
  );
};

export default Home;
