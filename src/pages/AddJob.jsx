import React, { useState } from "react";
import JobForm from "../components/JobForm/JobForm";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddJob = () => {
  const {API, jobData, setJobData} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Job:", jobData);

    const jobWithDate = {
    ...jobData,
    postedDate: new Date().toISOString().split("T")[0],
  };

    try {
      const res = await axios.post(`${API}/allJobs`, jobWithDate);
      console.log("✅ Job added successfully:", res.data);
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
      toast.success("Job added successfully!");
      navigate("/allJobs"); 
    } catch (err) {
      console.error("Error adding job:", err);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center py-12 px-4">
      <div className="text-center mb-4 relative pb-1 md:pb-10">
          <h2 className="text-3xl font-bold inline-block relative">
            CREATE A JOB
            {/*  line */}
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-indigo-600 rounded-full -translate-x-1/2"></span>
          </h2>
        </div>

      <div className="w-full max-w-4xl bg-indigo-50 border border-gray-200 rounded-3xl shadow-lg p-8">
        <JobForm
          jobData={jobData}
          setJobData={setJobData}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddJob;
