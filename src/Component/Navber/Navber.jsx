import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../Hooks/useAuth';
import useUser from '../../Hooks/useUser';
import DynamicLoading from '../Loading/Loading';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navber = () => {
  const { user, logout, loading } = useAuth();
  const { isPremium } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) {
    return <DynamicLoading />;
  }

  const links = (
    <>
      <NavLink to="/" className="hover:text-primary transition">
        Home
      </NavLink>
      <NavLink to="/about" className="hover:text-primary transition">
        About
      </NavLink>
      <NavLink to="/services" className="hover:text-primary transition">
        Services
      </NavLink>
      <NavLink to="/public" className="hover:text-primary transition">
        Public Lessons
      </NavLink>
     

      {user && (
        <NavLink to="/dashboard" className="hover:text-primary transition">
          Dashboard
        </NavLink>
      )}

      {user &&
        (isPremium ? (
          <span className="px-3 py-1 rounded-full bg-yellow-400 text-black font-semibold text-sm shadow-sm flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3l2.4 6.9H21l-5.4 3.9L17.4 21 12 17.4 6.6 21l1.8-7.2L3 9.9h6.6L12 3z"
              />
            </svg>
            Premium
          </span>
        ) : (
          <NavLink
            to="/upgrade"
            className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-sm hover:shadow-md transition"
          >
            Upgrade
          </NavLink>
        ))}
    </>
  );

  return (
    <div className="navbar  sticky top-0 z-50 bg-base-100 px-6 min-h-[72px] border-b">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-3 shadow"
          >
            <nav className="flex flex-col gap-3 font-medium">{links}</nav>
          </ul>
        </div>

        {/* LOGO */}
        <h2 className="font-extrabold text-2xl sm:text-3xl ml-15 tracking-tight">
          Digital Life{' '}
          <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
            Lesson
          </span>
        </h2>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <nav className="flex gap-4 font-semibold">{links}</nav>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-2 mr-5">
        <ThemeToggle />
        {!user ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="/auth/login"
              className="px-6 py-2 rounded-lg font-semibold text-white
              bg-gradient-to-r from-[#632EE3] to-[#9F62F2]
              shadow-md hover:shadow-lg transition-all duration-200"
            >
              Login
            </Link>
          </motion.div>
        ) : (
          <div className="relative">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-12 h-12 mr-2 rounded-full cursor-pointer border"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-56 bg-base-100 border border-base-300 shadow-lg rounded-lg overflow-hidden z-50"
                >
                  <div className="px-4 py-2 border-b border-base-300 font-semibold">
                    {user.displayName}
                  </div>
                  <Link
                    to="/dashboard/myprofile"
                    className="block px-4 py-2 hover:bg-base-200 transition"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-base-200 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-base-200 transition"
                  >
                    Log out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navber;
