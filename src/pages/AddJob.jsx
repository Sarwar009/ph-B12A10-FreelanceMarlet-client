// AddJob.jsx
import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import JobForm from "../components/JobForm/JobForm";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function AddJob() {
  const { API, jobData, setJobData, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Login first");

    try {
      const jobToSend = {
        ...jobData,
        postedBy: user.displayName,
        userEmail: user.email,
        postedDate: new Date().toISOString().split("T")[0],
      };

      const res = await axios.post(`${API}/allJobs`, jobToSend);
      console.log(res);
      
      toast.success("Job added successfully!");
      setJobData({
        title: "",
        postedBy: "",
        category: "",
        summary: "",
        coverImage: "",
        userEmail: "",
        skills: [],
        experience: "",
        requirements: [],
        jobType: "",
        locationType: "",
        postedDate: "",
        salaryRange: "",
      });
      navigate("/allJobs");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add job");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <h2 className="text-3xl font-bold mb-6">CREATE A JOB</h2>
      <div className="w-full max-w-4xl bg-indigo-50 border rounded-3xl shadow-lg p-8">
        <JobForm jobData={jobData} setJobData={setJobData} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
