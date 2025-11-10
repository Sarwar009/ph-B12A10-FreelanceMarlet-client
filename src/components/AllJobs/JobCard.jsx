import React from 'react';
import {motion} from 'framer-motion';
import { useNavigate } from 'react-router';

const JobCard = ({job}) => {
  const navigate =useNavigate();
  return (
    <motion.div
  key={job._id}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2 }}
  onClick={() => navigate(`/allJobs/${job._id}`)}
  className="relative bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 
             hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group"
>
  {/* Image */}
  <div className="relative h-48 w-full overflow-hidden">
    <img
      src={job.coverImage}
      alt={job.title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />

    
    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent"></div>

    {/* PostedBy + Date */}
    <div className="absolute bottom-2 left-3 text-xs text-white flex items-center gap-3 drop-shadow">
      <p className="bg-indigo-700/70 px-2 py-0.5 rounded-md">
        {job.postedBy}
      </p>
      <p className="bg-white/30 px-2 py-0.5 rounded-md backdrop-blur-sm">
        {job.postedDate}
      </p>
    </div>
  </div>

  {/* Job Info */}
  <div className="p-5">
    <h3 className="text-xl font-semibold text-indigo-700 mb-1 group-hover:text-indigo-800 transition-colors">
      {job.title}
    </h3>

    <p className="text-sm text-gray-500 font-medium mb-2">
      {job.category}
    </p>

    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
      {job.summary}
    </p>
  </div>

  {/* Line */}
  <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-indigo-600 transition-all duration-500 group-hover:w-full"></div>
</motion.div>

  );
};

export default JobCard;
