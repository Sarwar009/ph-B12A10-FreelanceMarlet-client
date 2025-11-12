import React from 'react'
import {  Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation(); // get current route

  if (loading) return <div>Loading...</div>;
  
  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
