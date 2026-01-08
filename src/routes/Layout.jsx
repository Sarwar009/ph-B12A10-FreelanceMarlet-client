import {Outlet, useLocation} from 'react-router';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { useAuth } from '../contexts/AuthProvider';


const Layout = () => {
  const {loading} = useAuth()
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (loading) return <LoadingSpinner text='Laoding' />

  return (
    <div>
      {!isDashboard && <Navbar />}
      <Outlet />
      {!isDashboard && <Footer />}
    </div>
  );
};

export default Layout;
