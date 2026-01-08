import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router";
import { Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../contexts/AuthProvider";

const JobCard = ({ job, onDelete, loading }) => {
  const { API, user, setAcceptedTasks, accessToken } = useAuth();
  const navigate = useNavigate();
  const isOwner = user?.email === job?.userEmail;

  const [acceptJob, setAcceptJob] = useState(job); // track acceptedBy

  const handleAccept = async () => {
    if (!user?.email) return toast.error("Login first to accept this job");

    try {
      await axios.patch(`${API}/my-accepted-tasks/${job._id}`, { acceptedBy: user.email }, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // <-- এইটা দরকার
        },
      });
      setAcceptJob(prev => ({ ...prev, acceptedBy: user.email }));
      setAcceptedTasks(prev => [...prev, { ...job, acceptedBy: user.email }]);
      toast.success("Job accepted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept job");
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    try {
      await axios.delete(`${API}/deleteJob/${job._id}`);
      onDelete(job._id);
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  if (loading) return <LoadingSpinner />;
  console.log(job);
  

  return (
    <motion.div
      key={job._id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={job.coverImage}
          alt={job.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />

        {isOwner && (
          <div className="absolute top-2 right-3 text-xs flex items-center gap-4 drop-shadow">
            <button
              className="group p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              onClick={handleDelete}
            >
              <Trash2 className="w-5 h-5 text-red-600 dark:text-red-300 group-hover:text-red-500 transition" />
            </button>
          </div>
        )}

        <div className="absolute bottom-2 left-3 text-xs text-white flex items-center gap-4 drop-shadow">
          <p className="bg-indigo-400/70 px-2 py-1 rounded-md">{job.postedBy}</p>
          <p className="bg-white/30 px-2 py-1 rounded-md backdrop-blur-sm">{job.postedDate}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="p-5">
        <h3
          className="text-xl font-semibold text-indigo-700 mb-1 group-hover:text-indigo-800 transition-colors cursor-pointer"
          onClick={() => navigate(`/allJobs/${job._id}`)}
        >
          {job.title}
        </h3>
        <p className="text-sm text-gray-500 font-medium mb-2">{job.category}</p>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{job.summary}</p>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-2">
          <Link
            to={`/allJobs/${job._id}`}
            className="btn bg-indigo-600 text-white hover:bg-indigo-700"
          >
            View Details
          </Link>

          {isOwner ? (
            <button
              onClick={() => navigate(`/dashboard/update-job/${job._id}`)}
              className="btn bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
              Update Job
            </button>
          ) : acceptJob?.acceptedBy === user?.email ? (
            <button className="btn bg-gray-400 cursor-not-allowed text-white px-4 py-2 rounded-lg">
              Already Accepted
            </button>
          ) : (
            <button
              onClick={handleAccept}
              className="btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Accept Job
            </button>
          )}
        </div>
      </div>

      {/* Hover bar */}
      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-indigo-600 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
};

export default JobCard;
