import {Outlet} from 'react-router';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';


const Layout = () => {
  const {loading} = useAuth()

  if (loading) return <LoadingSpinner text='Laoding' />

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
