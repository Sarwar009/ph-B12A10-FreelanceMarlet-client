import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash, X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const MyAcceptedJobs = () => {
  const { user, API, setAcceptedTasks } = useAuth();
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${API}/my-accepted-tasks`, { params: { email: user.email } });
        setTasks(res.data);
        setAcceptedTasks(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch accepted tasks!");
      }
    };
    fetchTasks();
  }, [API, user?.email]);

  const handleDone = async (taskId) => {
    try {
      await axios.patch(`${API}/acceptJob/${taskId}`, { acceptedBy: null });
      setTasks(prev => prev.filter(t => t._id !== taskId));
      setAcceptedTasks(prev => prev.filter(t => t._id !== taskId));
      toast.success("Task Successfully Completed");
    } catch (err) {
      console.error(err);
      toast.error("Action failed!");
    }
  };
  const handleCancel = async (taskId) => {
    try {
      await axios.patch(`${API}/acceptJob/${taskId}`, { acceptedBy: null });
      setTasks(prev => prev.filter(t => t._id !== taskId));
      setAcceptedTasks(prev => prev.filter(t => t._id !== taskId));
      toast.success("Task Canceled");
    } catch (err) {
      console.error(err);
      toast.error("Action failed!");
    }
  };

  const handleTitleClick = (id) => {
    navigate(`/allJobs/${id}`);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Page Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-10"
      >
        ✅ My Accepted Tasks
      </motion.h1>

      {tasks.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-lg mt-20"
        >
          You haven’t accepted any tasks yet.
        </motion.p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence>
            {tasks.map(task => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col justify-between transition-all duration-300"
              >
                {/* Task Info */}
                <div>
                  <h2 className="text-xl font-semibold text-indigo-700 cursor-pointer dark:text-indigo-400 mb-2" onClick={() => handleTitleClick(task._id)}>
                    {task.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">
                    {task.summary}
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-3">
                    Posted by: {task.postedBy}
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs">
                    Category: {task.category}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleDone(task._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                  >
                    <Check className="w-5 h-5" /> DONE
                  </button>
                  <button
                    onClick={() => handleCancel(task._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                  >
                    <Trash className="w-5 h-5" /> CANCEL
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MyAcceptedJobs;
