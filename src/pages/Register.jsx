import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Register() {
  const [showPass, setShowPass] = useState(false);

  const { register, validatePassword, loginWithGoogle } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle();
      toast.success("Google login successful!");

      await upsertUser(res.user);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ================= REGISTER ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validatePassword(password);
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    try {
      const createdUser = await register(name, email, password, photoUrl);
      toast.success("Account created successfully!");

      await upsertUser(createdUser);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ================= BACKEND USER SAVE ================= */
  const upsertUser = async (user) => {
    try {
      await axios.post(`${API}/users`, {
        email: user.email,
        name: user.displayName || name,
        photoURL: user.photoURL || photoUrl,
      });
    } catch (err) {
      console.error("User upsert failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-300 via-purple-200 to-pink-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl font-bold text-center text-gray-800 mb-6"
        >
          Create an Account
        </motion.h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="input input-bordered w-full bg-indigo-50"
            required
          />

          {/* Email */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            className="input input-bordered w-full bg-indigo-50"
            required
          />

          {/* Photo */}
          <input
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Photo URL"
            className="input input-bordered w-full bg-indigo-50"
          />

          {/* Password */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPass ? "text" : "password"}
              placeholder="Create a strong password"
              className="input input-bordered w-full bg-indigo-50 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPass ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button className="btn btn-primary w-full">
            Register
          </button>
        </form>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-4"
        >
          Sign up with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
