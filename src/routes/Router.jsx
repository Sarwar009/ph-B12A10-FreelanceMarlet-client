import React from "react";
import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import AllJobs from "../pages/AllJobs";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import UpdateJobs from "../pages/UpdateJobs";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter([
    
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/allJobs',
                element: <ProtectedRoute><AllJobs /></ProtectedRoute>
            },
            {
                path: '/allJobs/:id',
                element: <JobDetails />
            },
            {
                path: '/addJob',
                element: 
                    <ProtectedRoute><AddJob /></ProtectedRoute>
            },
            {
                path: '/updateJobs/:id',
                element: <ProtectedRoute><UpdateJobs /></ProtectedRoute>
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '*',
        element: <NotFound />
    },
])


export default Router;