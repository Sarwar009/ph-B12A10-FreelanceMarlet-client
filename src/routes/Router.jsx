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
import MyAddedJobs from "../pages/MyAddedJobs";
import MyAcceptedJobs from "../pages/MyAcceptedJobs";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import Profile from "../pages/Profile";

const Router = createBrowserRouter([

    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },{
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/allJobs',
                element: <AllJobs />
            },
            {
                path: '/allJobs/:id',
                element: <JobDetails />
            },
            {
                path: '/dashboard',
                element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
                children: [
                    {
                        path: '',
                        element: <Dashboard />
                    },
                    {
                        path: 'profile',
                        element: <Profile />
                    },
                    {
                        path: 'add-job',
                        element: <AddJob />
                    },
                    {
                        path: 'my-jobs',
                        element: <MyAddedJobs />
                    },
                    {
                        path: 'accepted-tasks',
                        element: <MyAcceptedJobs />
                    },
                    {
                        path: 'update-job/:id',
                        element: <UpdateJobs />
                    }
                ]
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