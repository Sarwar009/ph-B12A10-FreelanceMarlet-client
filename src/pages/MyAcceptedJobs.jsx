import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import useApi from "../hooks/useApi";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const MyAcceptedJobs = () => {
  const { user, setAcceptedTasks, loading } = useAuth();
  const api = useApi();

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  /* ---------- Fetch Accepted Tasks ---------- */
  useEffect(() => {
    if (!user?.email) return;

    const fetchTasks = async () => {
      try {
        const res = await api.get("/my-accepted-tasks", {
          params: { email: user.email },
        });
        setTasks(res.data);
        setAcceptedTasks?.(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch accepted tasks!");
      }
    };

    fetchTasks();
  }, [user?.email]);

  /* ---------- Mark Task Done ---------- */
  const handleDone = async (taskId) => {
    try {
      await api.patch(`/my-accepted-tasks/${taskId}`, {
        acceptedBy: null,
      });

      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      setAcceptedTasks?.((prev) => prev.filter((t) => t._id !== taskId));

      toast.success("Task successfully completed");
    } catch (err) {
      console.error(err);
      toast.error("Action failed!");
    }
  };

  /* ---------- Cancel Task ---------- */
  const handleCancel = async (taskId) => {
    try {
      await api.patch(`/my-accepted-tasks/${taskId}`, {
        acceptedBy: null,
      });

      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      setAcceptedTasks?.((prev) => prev.filter((t) => t._id !== taskId));

      toast.success("Task canceled");
    } catch (err) {
      console.error(err);
      toast.error("Action failed!");
    }
  };

  const handleTitleClick = (id) => {
    navigate(`/allJobs/${id}`);
  };

  /* ---------- Loading ---------- */
  if (loading) return <LoadingSpinner />;

  /* ---------- Empty State ---------- */
  if (tasks.length === 0) {
    return (
      <div className="min-h-screen p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-10"
        >
          ✅ My Accepted Tasks
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-lg mt-20 text-gray-600"
        >
          You haven’t accepted any tasks yet.
        </motion.p>
      </div>
    );
  }

  /* ---------- Main UI ---------- */
  return (
    <div className="min-h-screen p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-10"
      >
        ✅ My Accepted Tasks
      </motion.h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col justify-between"
            >
              {/* Task Info */}
              <div>
                <h2
                  onClick={() => handleTitleClick(task._id)}
                  className="text-xl font-semibold text-indigo-700 cursor-pointer mb-2"
                >
                  {task.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-4">
                  {task.summary}
                </p>
                <p className="text-gray-400 text-xs mt-3">
                  Posted by: {task.postedBy}
                </p>
                <p className="text-gray-400 text-xs">
                  Category: {task.category}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleDone(task._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold"
                >
                  <Check className="w-5 h-5" /> DONE
                </button>

                <button
                  onClick={() => handleCancel(task._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold"
                >
                  <Trash className="w-5 h-5" /> CANCEL
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyAcceptedJobs;
