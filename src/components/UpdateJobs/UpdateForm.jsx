import React from "react";
import { motion } from "framer-motion";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import AnimatedBtn from "./AnimatedBtn";

const UpdateForm = ({ jobData, setJobData, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full max-w-3xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-8">
        Update Your Job Post
      </h2>
      

      <div className="grid md:grid-cols-2 gap-6">
        <InputField label="Job Title" name="title" value={jobData.title} onChange={handleChange} />
        <InputField label="Posted By" name="postedBy" value={jobData.postedBy} onChange={handleChange} />
        <InputField label="User Email" name="userEmail" value={jobData.userEmail} onChange={handleChange} />
        <InputField label="Category" name="category" value={jobData.category} onChange={handleChange} />
        <InputField label="Cover Image URL" name="coverImage" value={jobData.coverImage} onChange={handleChange} />
        <InputField label="Experience" name="experience" value={jobData.experience} onChange={handleChange} />
        <InputField label="Job Type" name="jobType" value={jobData.jobType} onChange={handleChange} />
        <InputField label="Location Type" name="locationType" value={jobData.locationType} onChange={handleChange} />
        <InputField label="Salary Range" name="salaryRange" value={jobData.salaryRange} onChange={handleChange} />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <TextareaField label="Skills (comma separated)" name="skills" value={jobData.skills} onChange={handleChange} />
        <TextareaField label="Requirements (comma separated)" name="requirements" value={jobData.requirements} onChange={handleChange} />
      </div>

      <div className="mt-6">
        <TextareaField label="Summary" name="summary" value={jobData.summary} onChange={handleChange} />
      </div>

      <AnimatedBtn text="Update Job" />
    </motion.form>
  );
};

export default UpdateForm;
