import { BetweenVerticalEnd,  BookOpenCheck, FilePlusCorner, FilePlusCornerIcon, FlagOff, HeartPlus, NotebookPen, ShieldUser, UserCog, UserStar } from 'lucide-react';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import useUser from '../Hooks/useUser';
import useAuth from '../Hooks/useAuth';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

const DashBoardLayout = () => {

  const { role, name, photo } = useUser();
  const { logout, user } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false);


  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className='flex justify-between w-full'>
            <div>
              <Link to='/' className='font-extrabold hidden sm:block text-3xl'>
                Digital Life <span className='bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Lesson</span>
              </Link>
            </div>

            <div className="relative flex">
              <img
                src={user.photoURL}
                alt={name}
                className="w-13 h-13 mr-4 rounded-full cursor-pointer "
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {/* Name & Role */}
              <div className="text-left mr-2 leading-tight">
                <h2 className="font-semibold mb-1 text-gray-800">
                  {user.displayName}
                </h2>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full
                    ${role === "admin"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                    }`}
                >
                  {(role || 'user').toUpperCase()}
                </span>
              </div>
              

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-12 mt-16 w-54 bg-white border shadow-lg rounded overflow-hidden z-50"
                  >
                    <div className="p-2 border-b font-semibold">{name}</div>
                    
                    <Link to='/' className="block px-4 py-2 hover:bg-gray-100 transition">Home Page</Link>
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            <li>
              <Link to='/dashboard/addlesson' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add lesson">
                <BetweenVerticalEnd size={19} />
                <span className="is-drawer-close:hidden">Add Lesson</span>
              </Link>
            </li>
            <li>
              <Link to='/dashboard/mylesson' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My lesson">
                <NotebookPen size={19} />
                <span className="is-drawer-close:hidden">My Lesson</span>
              </Link>
            </li>

            <li>
              <Link to='/dashboard/favoriteLesson' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Favorite lesson">
                <HeartPlus size={19} />
                <span className="is-drawer-close:hidden">Favorite Lesson</span>
              </Link>
            </li>
            <li>
              <Link to='/dashboard/myprofile' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                <ShieldUser size={19} />
                <span className="is-drawer-close:hidden">My Profile</span>
              </Link>
            </li>
            {
              role === 'admin' && (

                <>
                  <li>
                    <Link to='/dashboard/admin/manage-users' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage User">
                      <UserCog size={19} />
                      <span className="is-drawer-close:hidden">Manage User</span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/dashboard/admin/manage-lesson' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Lesson">
                      <BookOpenCheck size={19} />
                      <span className="is-drawer-close:hidden">Manage Lesson</span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/dashboard/admin/report-lesson' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Report Lesson">
                      <FlagOff size={19} />
                      <span className="is-drawer-close:hidden">Report Lesson</span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/dashboard/adminProfile' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Admin Profile">
                    <UserStar size={19} /> 
                      <span className="is-drawer-close:hidden">Admin Profile</span>
                    </Link>
                  </li>

                </>


              )


            }

            {/* List item */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                {/* Settings icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;