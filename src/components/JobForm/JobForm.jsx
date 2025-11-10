import React, { useState } from "react";

const JobForm = ({ jobData, setJobData, handleSubmit }) => {
  const [skillInput, setSkillInput] = useState("");
  const [reqInput, setReqInput] = useState("");

  const handleAddSkill = () => {
    if (skillInput && !jobData.skills.includes(skillInput)) {
      setJobData({ ...jobData, skills: [...jobData.skills, skillInput] });
      setSkillInput("");
    }
  };

  const handleAddRequirement = () => {
    if (reqInput && !jobData.requirements.includes(reqInput)) {
      setJobData({ ...jobData, requirements: [...jobData.requirements, reqInput] });
      setReqInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Job Title"
          className="input-field"
          value={jobData.title}
          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Posted By"
          className="input-field"
          value={jobData.postedBy}
          onChange={(e) => setJobData({ ...jobData, postedBy: e.target.value })}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Category"
          className="input-field"
          value={jobData.category}
          onChange={(e) => setJobData({ ...jobData, category: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="User Email"
          className="input-field"
          value={jobData.userEmail}
          onChange={(e) => setJobData({ ...jobData, userEmail: e.target.value })}
          required
        />
      </div>

      {/* Summary & Cover Image */}
      <textarea
        placeholder="Job Summary"
        className="input-field resize-none h-24"
        value={jobData.summary}
        onChange={(e) => setJobData({ ...jobData, summary: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Cover Image URL"
        className="input-field"
        value={jobData.coverImage}
        onChange={(e) => setJobData({ ...jobData, coverImage: e.target.value })}
      />

      {/* Skills */}
      <div>
        <label className="font-semibold text-gray-700">Skills</label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {jobData.skills.map((skill, i) => (
            <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Add Skill"
            className="input-field flex-1"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <button type="button" onClick={handleAddSkill} className="btn-indigo">
            Add
          </button>
        </div>
      </div>

      {/* Requirements */}
      <div>
        <label className="font-semibold text-gray-700">Requirements</label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {jobData.requirements.map((req, i) => (
            <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {req}
            </span>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Add Requirement"
            className="input-field flex-1"
            value={reqInput}
            onChange={(e) => setReqInput(e.target.value)}
          />
          <button type="button" onClick={handleAddRequirement} className="btn-indigo">
            Add
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid md:grid-cols-3 gap-6">
        <input
          type="text"
          placeholder="Experience"
          className="input-field"
          value={jobData.experience}
          onChange={(e) => setJobData({ ...jobData, experience: e.target.value })}
        />
        <input
          type="text"
          placeholder="Job Type (Full-time/Part-time)"
          className="input-field"
          value={jobData.jobType}
          onChange={(e) => setJobData({ ...jobData, jobType: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location Type (Remote/Onsite)"
          className="input-field"
          value={jobData.locationType}
          onChange={(e) => setJobData({ ...jobData, locationType: e.target.value })}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="date"
          placeholder="Posted Date"
          className="input-field"
          value={jobData.postedDate}
          onChange={(e) => setJobData({ ...jobData, postedDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Salary Range"
          className="input-field"
          value={jobData.salaryRange}
          onChange={(e) => setJobData({ ...jobData, salaryRange: e.target.value })}
        />
      </div>

      <button type="submit" className="btn-indigo w-full py-3 text-white font-semibold rounded-2xl shadow-lg hover:bg-indigo-600 transition">
        Post Job
      </button>
    </form>
  );
};

export default JobForm;
