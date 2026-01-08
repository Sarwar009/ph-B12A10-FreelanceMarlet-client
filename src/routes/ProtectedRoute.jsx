import React from 'react'
import {  Navigate, useLocation } from "react-router";
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { useAuth } from '../contexts/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation(); // get current route

  if (loading) return <div><LoadingSpinner text='Loading....' /></div>;
  
  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
