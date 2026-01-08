import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import UpdateForm from "../components/UpdateJobs/UpdateForm";
import { useAuth } from "../contexts/AuthProvider";

const UpdateJob = () => {
  const { API, jobData, setJobData, accessToken } = useAuth(); // accessToken for auth headers
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // Fetch job data with Authorization header
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API}/allJobs/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // pass token
          },
        });
        const job = res.data;

        setJobData({
          ...job,
          skills: Array.isArray(job.skills) ? job.skills.join(", ") : "",
          requirements: Array.isArray(job.requirements)
            ? job.requirements.join(", ")
            : "",
        });
      } catch (err) {
        console.error("Fetch Job Error:", err.response || err);
        toast.error("Failed to load job!");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) fetchJob(); // only fetch if token exists
  }, [API, id, setJobData, accessToken]);

  // Handle form submit with Authorization header
  const handleSubmit = async () => {
    if (!jobData) return;

    const updatedJob = {
      ...jobData,
      skills: jobData.skills
        ? jobData.skills.split(",").map((s) => s.trim())
        : [],
      requirements: jobData.requirements
        ? jobData.requirements.split(",").map((r) => r.trim())
        : [],
      postedDate: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.patch(`${API}/updateJob/${id}`, updatedJob, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // pass token
        },
      });
      toast.success("Job updated successfully!");
      navigate("/allJobs");
    } catch (err) {
      console.error("Update Job Error:", err.response || err);
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
    <div className="min-h-screen py-10 px-4 flex justify-center items-start">
      <UpdateForm jobData={jobData} setJobData={setJobData} onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateJob;
