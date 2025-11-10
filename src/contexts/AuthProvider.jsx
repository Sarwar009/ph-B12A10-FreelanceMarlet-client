import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [jobs, setJobs] = useState ([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <AuthContext.Provider value={{ toggleTheme, theme, jobs, setJobs, API }}>
      {children}
    </AuthContext.Provider>
  );
};
