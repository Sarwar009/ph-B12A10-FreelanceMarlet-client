import React, { useState } from 'react';
import {motion} from 'framer-motion';
import {Link, useLocation, useNavigate} from 'react-router';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthProvider';

export default function Login () {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const location =useLocation()

  const from = location.state?.from?.pathname || "/";
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful!");
       navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Google login successful!");
       navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-200 via-purple-200 to-pink-200 px-4">
      <motion.div
        initial={{opacity: 0, y: 50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1}}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.div
            whileFocus={{scale: 1.05}}
            className="form-control w-full"
          >
            <label className="label">
              <span className="label-text font-semibold text-gray-500">
                Email
              </span>
            </label>
            <input
            onChange={e => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="Enter your email"
              className="input input-bordered w-full bg-amber-50 text-gray-700 placeholder-gray-500"
              required
            />
          </motion.div>

          <motion.div
            whileFocus={{scale: 1.05}}
            className="form-control w-full"
          >
            <label className="label">
              <span className="label-text font-semibold text-gray-500">
                Password
              </span>
            </label>
            <input
            onChange={e => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="Enter your password"
              className="input input-bordered w-full bg-amber-50 text-gray-700 placeholder-gray-500"
              required
            />
          </motion.div>
          <motion.div
            className="form-control w-full text-right mt-2"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.3}}
          >
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-gray-500 transition-colors duration-300 underline cursor-pointer hover:text-gray-700"
            >
              Forgot password?
            </Link>
          </motion.div>

          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="btn btn-primary w-full mt-4"
          >
            Login
          </motion.button>
        </form>

        <div className="divider text-gray-600 font-bold">
          <span>------</span>OR<span>-------</span>
        </div>

        <motion.button
        onClick={handleGoogleLogin}
          whileFocus={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          className="btn bg-white text-black border-[#e5e5e5] btn-outline btn-secondary w-full "
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff" />
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </g>
          </svg>
          Sign in with Google
        </motion.button>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
