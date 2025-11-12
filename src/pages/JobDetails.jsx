import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const {API} = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API}/allJobs/${id}`);
        setJob(res.data);

        const relatedRes = await axios.get(`${API}/allJobs`);
        setRelatedJobs(
          relatedRes.data
            .filter((j) => j.category === res.data.category && j._id !== res.data._id)
            .slice(0, 4)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id,API]);

  const handleDelete = async () => {
  if (!job?._id) return console.error("Job ID is missing!");

  try {
    const res = await axios.delete(`${API}/deleteJobs/${job._id}`);
    console.log("Deleted:", res.data);

    if (res.data.deletedCount > 0) {
      toast.success("Job deleted successfully!");
      navigate("/allJobs"); 
    }
  } catch (error) {
    console.log(error);
    
    toast.error("Failed to delete job. Check console for details.");
  }
};

  useEffect(() => {
    document.title = job ? `FreelanceMarket • ${job.title}` : "Job Details";
  }, [job]);

  if (loading) return <p className="p-8 text-center text-gray-600">Loading...</p>;
  if (!job) return <p className="p-8 text-center text-gray-600">Job not found</p>;

  return (
    <div className="mx-auto p-6 space-y-12 text-gray-700">

      {/* Hero Section */}
      <div className="relative rounded-sm overflow-hidden shadow-lg">
        <img
          src={job.coverImage}
          alt={job.title}
          className="w-full h-72 object-cover brightness-90"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-linear-to-t from-white/80 to-transparent">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-800">{job.title}</h1>
        </div>
        <div className="absolute top-4 right-4 flex gap-3">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition">
            Apply
          </button>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
            Save
          </button>
          <button onClick={handleDelete} className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
            Delete
          </button>
        </div>
      </div>

      {/* Job Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
      >
        {/* Job Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {job.category}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              Posted by: {job.postedBy}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {job.postedDate}
            </span>
          </div>
        </div>

        {/* Description / Requirements / Skills */}
        <div className="space-y-4">
          <p className="text-gray-700">{job.summary}</p>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Requirements:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Experience in {job.category}</li>
              <li>Strong communication skills</li>
              <li>Portfolio of previous projects</li>
              <li>Familiarity with related tools and software</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-gray-600 font-semibold">Experience:</p>
            <p className="text-gray-700">{job.experience || "Not specified"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Job Type:</p>
            <p className="text-gray-700">{job.jobType || "Remote/Onsite"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Location:</p>
            <p className="text-gray-700">{job.locationType || "Not specified"}</p>
          </div>
        </div>
      </motion.div>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Jobs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedJobs.map((relJob) => (
              <motion.div
                key={relJob._id}
                whileHover={{ scale: 1.03 }}
                onClick={() => navigate(`/allJobs/${relJob._id}`)}
                className="bg-white rounded-2xl shadow p-5 cursor-pointer hover:shadow-lg transition-all"
              >
                <img
                  src={relJob.coverImage}
                  alt={relJob.title}
                  className="h-40 w-full object-cover rounded-lg mb-3"
                />
                <h3 className="text-gray-800 font-semibold text-lg mb-1">{relJob.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{relJob.category}</p>
                <p className="text-gray-400 text-sm line-clamp-2">{relJob.summary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
