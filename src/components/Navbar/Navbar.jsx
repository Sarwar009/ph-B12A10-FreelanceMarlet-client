import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../contexts/AuthProvider";


const Navbar = () => {
  const { toggleTheme, theme, user, logout, loading } = useAuth();

  
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-lg border-b border-base-300">
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
            <div className="flex items-center">
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu-button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.photoURL || 'https://via.placeholder.com/32'}
                    alt={user?.displayName || 'User'}
                  />
                  <span className="ml-2 hidden md:block">{user?.displayName || 'User'}</span>
                  <svg className="ml-1 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard Home
                      </Link>
                      <button
                        onClick={() => { handleLogout(); setDropdownOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
