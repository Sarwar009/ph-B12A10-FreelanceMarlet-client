import React, { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../Firebase/Firebase.init";

/* ---------------- Context ---------------- */
const AuthContext = createContext();

/* ---------------- Hook ---------------- */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

/* ---------------- Provider ---------------- */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
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

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  /* ---------------- Theme ---------------- */
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e) => {
    if (e?.target) {
      setTheme(e.target.checked ? "dark" : "light");
    } else {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }
  };

  /* ---------------- Auth Listener ---------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const token = await u.getIdToken(false);
          setAccessToken(token);
        } catch (err) {
          console.error("Failed to get token:", err);
          setAccessToken(null);
        }
      } else {
        setAccessToken(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  /* ---------------- Auth Actions ---------------- */
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = (name, email, password, photoURL) =>
    createUserWithEmailAndPassword(auth, email, password).then((res) =>
      updateProfile(res.user, { displayName: name, photoURL })
    );

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  /* ---------------- Utils ---------------- */
  const validatePassword = (password) => {
    const errors = [];
    if (!/[A-Z]/.test(password)) errors.push("Password must include an uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Password must include a lowercase letter.");
    if (password.length < 6) errors.push("Password must be at least 6 characters long.");
    return errors;
  };

  /* ---------------- Context Value ---------------- */
  const value = {
    user,
    accessToken,
    loading,
    setLoading,
    jobs,
    setJobs,
    acceptedTasks,
    setAcceptedTasks,
    theme,
    toggleTheme,
    jobData,
    setJobData,
    API,
    login,
    register,
    loginWithGoogle,
    logout,
    validatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}

      {/* Toast UI from 1st file */}
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
              primary: "#4F46E5",
              secondary: "#fff",
            },
            style: {
              background: "rgba(237, 242, 255, 0.95)",
              color: "#1E1E1E",
              border: "1px solid #4F46E5",
            },
          },
          error: {
            iconTheme: {
              primary: "#DC2626",
              secondary: "#fff",
            },
            style: {
              background: "rgba(254, 226, 226, 0.95)",
              color: "#1E1E1E",
              border: "1px solid #DC2626",
            },
          },
        }}
      />
    </AuthContext.Provider>
  );
}
