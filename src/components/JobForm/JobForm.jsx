import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function JobForm({ jobData, setJobData, handleSubmit }) {
  const [skillInput, setSkillInput] = useState("");
  const [reqInput, setReqInput] = useState("");
  const { jobs, setJobs, API, loading } = useAuth();

  // Fetch all jobs for category dropdown
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API}/allJobs`);
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error(err);
        setJobs([]);
      }
    };
    fetchJobs();
  }, [API, setJobs]);

  // Add skill
  const handleAddSkill = () => {
    if (skillInput && !jobData.skills.includes(skillInput)) {
      setJobData({ ...jobData, skills: [...jobData.skills, skillInput] });
      setSkillInput("");
    }
  };

  // Add requirement
  const handleAddRequirement = () => {
    if (reqInput && !jobData.requirements.includes(reqInput)) {
      setJobData({ ...jobData, requirements: [...jobData.requirements, reqInput] });
      setReqInput("");
    }
  };

  const categories = Array.isArray(jobs) ? [...new Set(jobs.map(job => job.category || "Other"))] : [];

  if (loading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
      {/* Title & Cover Image */}
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Job Title"
          className="input"
          value={jobData.title || ""}
          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          className="input"
          value={jobData.coverImage || ""}
          onChange={(e) => setJobData({ ...jobData, coverImage: e.target.value })}
        />
      </div>

      {/* Category */}
      <div>
        <select
          className="input cursor-pointer"
          value={jobData.category || ""}
          onChange={(e) => setJobData({ ...jobData, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Job Type & Location Type */}
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Job Type"
          className="input"
          value={jobData.jobType || ""}
          onChange={(e) => setJobData({ ...jobData, jobType: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          className="input"
          value={jobData.locationType || ""}
          onChange={(e) => setJobData({ ...jobData, locationType: e.target.value })}
        />
      </div>

      {/* Skills */}
      <div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add Skill"
            className="input flex-1"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <button type="button" onClick={handleAddSkill} className="btn btn-primary">Add</button>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {(jobData.skills || []).map((s, i) => (
            <span key={i} className="bg-indigo-100 px-2 rounded">{s}</span>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add Requirement"
            className="input flex-1"
            value={reqInput}
            onChange={(e) => setReqInput(e.target.value)}
          />
          <button type="button" onClick={handleAddRequirement} className="btn btn-primary">Add</button>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {(jobData.requirements || []).map((r, i) => (
            <span key={i} className="bg-gray-100 px-2 rounded">{r}</span>
          ))}
        </div>
      </div>

      {/* Summary */}
      <textarea
        placeholder="Job Summary"
        className="input w-full h-24"
        value={jobData.summary || ""}
        onChange={(e) => setJobData({ ...jobData, summary: e.target.value })}
        required
      />

      {/* Experience & Salary */}
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Experience"
          className="input"
          value={jobData.experience || ""}
          onChange={(e) => setJobData({ ...jobData, experience: e.target.value })}
        />
        <input
          type="text"
          placeholder="Salary Range"
          className="input"
          value={jobData.salaryRange || ""}
          onChange={(e) => setJobData({ ...jobData, salaryRange: e.target.value })}
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Post Job
      </button>
    </form>
  );
}
