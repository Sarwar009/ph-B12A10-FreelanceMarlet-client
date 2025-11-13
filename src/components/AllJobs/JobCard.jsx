import React from 'react';
import {motion} from 'framer-motion';
import { useNavigate} from 'react-router';
import {X} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const JobCard = ({job}) => {

  const { API, setJobs, user} = useAuth ();
  const isOwner = user?.email === job.userEmail;

  const handleDelete = async () => {
    if (!job._id) return console.error("Job ID is missing!");

    try {
      const res = await axios.delete(`${API}/deleteJobs/${job._id}`);
      console.log("Deleted:", res.data);
      setJobs(prevJobs => prevJobs.filter(j => j._id !== job._id));
      toast.success('Job Deleted Successfully')
    } catch (error) {
      toast.error('Delete Failed')
      console.error("Delete failed:", error);
    }
  };

  const navigate = useNavigate ();
  return (
    <motion.div
      key={job._id}
      initial={{opacity: 0, y: 50}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.2}}
      className="relative bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 
             hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={job.coverImage}
          alt={job.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
        {
          isOwner && <div className="absolute top-2 right-3 text-xs flex items-center gap-4 drop-shadow">
          <button className="group p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" 
          onClick={()=> handleDelete()}
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition" />
          </button>

        </div>
        }
        

        {/* PostedBy + Date */}
        <div className="absolute bottom-2 left-3 text-xs text-white flex items-center gap-4 drop-shadow">
          <p className="bg-indigo-400/70 px-2 py-1 rounded-md">
            {job.postedBy}
          </p>
          <p className="bg-white/30 px-2 py-1 rounded-md backdrop-blur-sm">
            {job.postedDate}
          </p>
        </div>
      </div>

      {/* Job Info */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-indigo-700 mb-1 group-hover:text-indigo-800 transition-colors cursor-pointer" 
      onClick={() => navigate (`/allJobs/${job._id}`)}>
          {job.title}
        </h3>

        <p className="text-sm text-gray-500 font-medium mb-2">
          {job.category}
        </p>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {job.summary}
        </p>
        <div className="flex gap-4 mt-2">
              <button onClick={() => navigate (`/allJobs/${job._id}`)} className="btn bg-indigo-600 text-white hover:bg-indigo-700">
                View Details
              </button>
              <button onClick={() => navigate (`/updateJobs/${job._id}`)} className="btn btn-outline border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                Update Info
              </button>
            </div>
      </div>

      {/* Line */}
      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-indigo-600 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
};

export default JobCard;
