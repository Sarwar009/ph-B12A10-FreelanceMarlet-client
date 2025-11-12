import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {Link, replace, useLocation, useNavigate} from 'react-router';
import {Eye, EyeOff} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Register () {
  const [showPass, setShowPass] = useState (false);
  const { register, validatePassword } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState('');

  const location = useLocation()
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    const errors = validatePassword(password);
    if (errors.length > 0) {
      errors.forEach(err => toast.error(err));
      return;
    }

    try {
      await register(name, email, password);
      toast.success("Account created successfully!");
      navigate(from, {replace: true});
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 px-4">
      {/* Animated Container */}
      <motion.div
        initial={{opacity: 0, y: 60}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1}}
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md"
      >
        {/* Floating Title */}
        <motion.h2
          initial={{opacity: 0, y: -30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.3}}
          className="text-3xl font-bold text-center text-gray-800 mb-6"
        >
          Create an Account
        </motion.h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <motion.div whileFocus={{scale: 1.03}}>
            <label className="label">
              <span className="label-text font-semibold text-gray-500">
                Full Name
              </span>
            </label>
            <input
            value={name} onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Your full name"
              className="input input-bordered w-full bg-indigo-50 text-gray-800 placeholder-gray-500 focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            />
          </motion.div>

          {/* Email */}
          <motion.div whileFocus={{scale: 1.03}}>
            <label className="label">
              <span className="label-text font-semibold text-gray-500">
                Email
              </span>
            </label>
            <input
            value={email} onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-indigo-50 text-gray-800 placeholder-gray-500 focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            />
          </motion.div>

          <motion.div whileFocus={{scale: 1.03}}>
            <label className="label">
              <span className="label-text font-semibold text-gray-500">
                Photo URL
              </span>
            </label>
            <input
            value={photoUrl} onChange={e => setPhotoUrl(e.target.value)}
              placeholder="photo url"
              className="input input-bordered w-full bg-indigo-50 text-gray-800 placeholder-gray-500 focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            />
          </motion.div>

          <div className="form-control w-full relative">
            <label className="label">
              <span className="label-text font-semibold text-gray-500">
                Password
              </span>
            </label>

            <div className="relative">
              <input
              value={password} onChange={e => setPassword(e.target.value)}
                type={showPass ? 'text' : 'password'}
                placeholder="Create a strong password"
                className="input input-bordered w-full bg-indigo-50 text-gray-800 placeholder-gray-500 focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 pr-10 relative z-10"
                required
              />

              <motion.button
                type="button"
                onClick={() => setShowPass (!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors z-20"
                whileTap={{scale: 0.9}}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="btn btn-primary w-full mt-4 bg-indigo-600 text-white border-none hover:bg-indigo-700"
          >
            Register
          </motion.button>
        </form>

        <motion.p
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1}}
          className="text-center text-gray-600 text-sm mt-6"
        >
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
