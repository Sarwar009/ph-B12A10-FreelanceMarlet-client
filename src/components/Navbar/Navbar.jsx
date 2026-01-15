import React from "react";
import { Link, NavLink } from "react-router";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../contexts/AuthProvider";


const Navbar = () => {
  const { toggleTheme, theme, user, logout, loading } = useAuth();

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold bg-primary/10 rounded-lg"
              : "hover:text-primary hover:bg-base-200 rounded-lg"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold bg-primary/10 rounded-lg"
              : "hover:text-primary hover:bg-base-200 rounded-lg"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allJobs"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold bg-primary/10 rounded-lg"
              : "hover:text-primary hover:bg-base-200 rounded-lg"
          }
        >
          All Jobs
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold bg-primary/10 rounded-lg"
                : "hover:text-primary hover:bg-base-200 rounded-lg"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold bg-primary/10 rounded-lg"
              : "hover:text-primary hover:bg-base-200 rounded-lg"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="navbar bg-base-100 shadow-lg border-b border-base-300">
      <div className="navbar-start">
        <div className="dropdown ">
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
            className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box mt-3 w-52 p-2 shadow z-10"
          >
            {links}
            {user ? (
              <div className="items-center gap-3 flex flex-col">
                <button onClick={logout} className="btn btn-sm flex">
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="btn btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-sm">
                  Register
                </Link>
              </div>
            )}
          </ul>
        </div>
        <Link to="/" className="text-xl header px-5 md:px-20">
          Freelance Market
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="flex flex-row navbar-end px-5 md:px-20">
        {user ? (
          <div className="items-center gap-3 flex">
            <NavLink to='/dashboard/profile'>
              <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-8 h-8 rounded-full"
            />
            </NavLink>
            <button onClick={logout} className="btn btn-sm hidden md:flex">
              Log Out
            </button>
          </div>
        ) : (
          <div className="gap-3 hidden md:flex">
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm">
              Register
            </Link>
          </div>
        )}
        <div className="flex gap-3 rounded-3xl p-1">
          <label className="swap swap-rotate cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="w-8 h-8 swap-off p-1">🔆</span>
            <span className="swap-on w-8 h-8 p-1">🌙</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
