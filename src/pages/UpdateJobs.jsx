import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import UpdateForm from "../components/UpdateJobs/UpdateForm";

const UpdateJob = () => {
  const { API, jobData, setJobData } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API}/allJobs/${id}`);
        const job = res.data;
        setJobData({
          ...job,
          skills: job.skills?.join(", ") || "",
          requirements: job.requirements?.join(", ") || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load job!");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [API, id, setJobData]);

  // Handle form submit
  const handleSubmit = async () => {
    if (!jobData) return;

    const updatedJob = {
      ...jobData,
      skills: jobData.skills ? jobData.skills.split(",").map((s) => s.trim()) : [],
      requirements: jobData.requirements
        ? jobData.requirements.split(",").map((r) => r.trim())
        : [],
      postedDate: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.patch(`${API}/updateJobs/${id}`, updatedJob);
      toast.success("Job updated successfully!");
      navigate("/allJobs");
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to update job!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-indigo-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen   py-10 px-4 flex justify-center items-start">
      <UpdateForm jobData={jobData} setJobData={setJobData} onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateJob;
