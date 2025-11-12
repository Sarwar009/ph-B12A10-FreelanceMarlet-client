import React from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { toggleTheme, theme, user, logout, loading } = useAuth();

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allJobs">All Jobs</NavLink>
      </li>
      <li>
        <NavLink to="/addJob">Add a Job</NavLink>
      </li>
      <li>
        <NavLink to="/myTask">My Accepted Tasks</NavLink>
      </li>
    </>
  );

  if (loading) return null;
  return (
    <div className="navbar shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl header">Freelance Market</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      {user ? (
  <div className="flex items-center gap-3">
    <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full"/>
    <button onClick={logout} className="btn btn-sm">Log Out</button>
  </div>
) : (
  <div className="flex gap-3">
    <Link to="/login" className="btn btn-sm">Login</Link>
    <Link to="/register" className="btn btn-sm">Register</Link>
  </div>
)}
      <div className="flex items-center gap-3 rounded-3xl p-1">
        <label className="swap swap-rotate cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="w-8 h-8 swap-off">🔆</span>
          <span className="swap-on w-8 h-8">🌙</span>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
