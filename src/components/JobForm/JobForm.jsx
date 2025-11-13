import React, {useEffect, useState} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import axios from 'axios';
import AnimatedBtn from '../UpdateJobs/AnimatedBtn';

const JobForm = ({jobData, setJobData, handleSubmit}) => {
  const [skillInput, setSkillInput] = useState ('');
  const [reqInput, setReqInput] = useState ('');

  const {jobs, setJobs, API, user} = useAuth ();

  useEffect (() => {
    axios.get (`${API}/allJobs`).then (res => setJobs (res.data));
  }, [API, setJobs]);

  useEffect(() => {
    if (user?.email) {
      setJobData(prev => ({ ...prev, userEmail: user.email }));
    }
  }, [user, setJobData]);

  useEffect(() => {
  if (user?.displayName) {
    setJobData(prev => ({ ...prev, postedBy: user.displayName }));
  }
}, [user, setJobData]);
  

  const handleAddSkill = () => {
    if (skillInput && !jobData.skills.includes (skillInput)) {
      setJobData ({...jobData, skills: [...jobData.skills, skillInput]});
      setSkillInput ('');
    }
  };

  const handleAddRequirement = () => {
    if (reqInput && !jobData.requirements.includes (reqInput)) {
      setJobData ({
        ...jobData,
        requirements: [...jobData.requirements, reqInput],
      });
      setReqInput ('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Job Title:</label>
          <input
            type="text"
            placeholder="Job Title"
            className="input input-field shadow-sm p-2 bg-white"
            value={jobData.title}
            onChange={e => setJobData ({...jobData, title: e.target.value})}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Posted By:</label>
          <input
            type="text"
            placeholder="Posted by"
            className="input input-field shadow-sm p-2 bg-white"
            value={jobData.postedBy || ''}
            
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 ml-0.5">

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Email:</label>
          <input
            type="email"
            placeholder="User Email"
            className="input input-field shadow-sm p-2 bg-white"
            value={jobData.userEmail || ''}
            
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Cover Image:</label>
          <input
            type="text"
            placeholder="Cover Image URL"
            className="input input-field shadow-sm p-2 bg-white"
            value={jobData.coverImage}
            onChange={e =>
              setJobData ({...jobData, coverImage: e.target.value})}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col mb-2">

          <label className="font-semibold text-gray-700">
            Select Category:
          </label>
          <select
            className="input input-field shadow-sm p-2 bg-white cursor-pointer"
            value={jobData.category}
            onChange={e => setJobData ({...jobData, category: e.target.value})}
            required
          >
            <option value="">Select Category</option>
            {jobs.length > 0 &&
              jobs.map (jobCat => (
                <option key={jobCat._id} value={jobCat.category}>
                  {jobCat.category}
                </option>
              ))}
          </select>
        </div>

        <div>
            <label className="font-semibold text-gray-700">Add Skills:</label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {jobData.skills.map ((skill, i) => (
              <span
                key={i}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add Skill"
            className="input input-field shadow-sm p-2 bg-white flex-1"
            value={skillInput}
            onChange={e => setSkillInput (e.target.value)}
          />
            <button
              type="button"
              onClick={handleAddSkill}
              className="btn btn-primary"
            >
              Add
            </button>
        </div>
      </div>

      {/* Requirements */}
      <div>
          <label className="font-semibold text-gray-700">
            Add Requirements:
          </label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {jobData.requirements.map ((req, i) => (
            <span
              key={i}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {req}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add Requirement"
            className="input input-field shadow-sm p-2 bg-white flex-1"
            value={reqInput}
            onChange={e => setReqInput (e.target.value)}
          />
          
          <button
            type="button"
            onClick={handleAddRequirement}
            className="btn btn-primary"
          >
            Add 
          </button>
        </div>
        
      </div>

      {/* Additional Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Experience:</label>
          <input
            type="text"
            placeholder="Experience"
            className="input input-field shadow-sm p-2 bg-white"
            value={jobData.experience}
            onChange={e =>
              setJobData ({...jobData, experience: e.target.value})}
          />
        </div>
        <div className="flex flex-col">

          <label className="font-semibold text-gray-700">
            Select Job Type:
          </label>
          <select
            className="input input-field shadow-sm p-2 bg-white"
            value={jobData.jobType}
            onChange={e => setJobData ({...jobData, jobType: e.target.value})}
            required
          >
            <option value="">Select Job Type</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>

          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col">

          <label className="font-semibold text-gray-700">Salary Range:</label>
          <input
            type="text"
            placeholder="Salary Range"
            className="input input-field shadow-sm p-2 bg-white"
            value={jobData.salaryRange}
            onChange={e =>
              setJobData ({...jobData, salaryRange: e.target.value})}
          />
        </div>
      </div>
      <div className="flex flex-col">

        <label className="font-semibold text-gray-700">Job Summary:</label>
        <textarea
          placeholder="Job Summary"
          className="input-field resize-none h-24 w-full bg-white input shadow-sm"
          value={jobData.summary}
          onChange={e => setJobData ({...jobData, summary: e.target.value})}
          required
        />
      </div>

      <AnimatedBtn text="Post a Job" />
    </form>
  );
};

export default JobForm;
