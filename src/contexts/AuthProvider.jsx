import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { Toaster } from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../Firebase/Firebase.init";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [acceptedTasks, setAcceptedTasks] = useState([]);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [jobData, setJobData] = useState({
    title: "",
    postedBy: "",
    category: "",
    summary: "",
    coverImage: "",
    userEmail: "",
    skills: [],
    experience: "",
    requirements: [],
    jobType: "",
    locationType: "",
    postedDate: "",
    salaryRange: "",
  });

  const API = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = (name, email, password, photoURL) =>
    createUserWithEmailAndPassword(auth, email, password).then((res) =>
      updateProfile(res.user, { displayName: name, photoURL })
    );

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  const validatePassword = (password) => {
    const errors = [];

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must include at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must include at least one lowercase letter.");
    }

    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    return errors;
  };

  // Logout
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        toggleTheme,
        theme,
        jobs,
        setJobs,
        API,
        jobData,
        setJobData,
        user,
        login,
        register,
        logout,
        loginWithGoogle,
        loading,
        validatePassword,
        acceptedTasks,
        setAcceptedTasks
      }}
    >
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-text)",
            borderRadius: "14px",
            padding: "14px 18px",
            fontSize: "15px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          },
          success: {
            iconTheme: {
              primary: "#4F46E5", // Indigo-600
              secondary: "#fff",
            },
            style: {
              background: "rgba(237, 242, 255, 0.95)", // Light indigo tint
              color: "#1E1E1E",
              border: "1px solid #4F46E5",
            },
          },
          error: {
            iconTheme: {
              primary: "#DC2626", // Red-600
              secondary: "#fff",
            },
            style: {
              background: "rgba(254, 226, 226, 0.95)", // Light red tint
              color: "#1E1E1E",
              border: "1px solid #DC2626",
            },
          },
        }}
      />
    </AuthContext.Provider>
  );
};
