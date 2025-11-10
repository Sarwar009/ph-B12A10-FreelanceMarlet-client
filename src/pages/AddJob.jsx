import React, { useState } from "react";
import JobForm from "../components/JobForm/JobForm";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

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

  const { API } = useAuth();

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

      // Optional: reset form after success
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
      alert("Job added successfully!");
    } catch (err) {
      console.error("Error adding job:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Create a job
      </h1>

      <div className="w-full max-w-4xl bg-red-800 border border-gray-200 rounded-3xl shadow-lg p-8">
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
