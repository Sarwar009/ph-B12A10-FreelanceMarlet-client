import React, { useState } from "react";
import JobForm from "../components/JobForm/JobForm";

const AddJob = () => {
  const [jobData, setJobData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Job:", jobData);
    // Call API here (axios.post)
    // axios.post(`${API}/allJobs`, jobData)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Add New Job</h1>
      <div className="w-full max-w-4xl bg-red-800 rounded-3xl shadow-xl p-8">
        <JobForm jobData={jobData} setJobData={setJobData} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddJob;
