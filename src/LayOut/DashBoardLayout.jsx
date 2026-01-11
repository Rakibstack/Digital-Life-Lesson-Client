import { 
  BetweenVerticalEnd, BookOpenCheck,  NotebookPen, ShieldUser, 
  UserCog, BookOpenCheck as BookCheck, FlagOff, UserStar, 
  HeartPlus,
  Home
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import useUser from '../Hooks/useUser';
import useAuth from '../Hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';

const DashBoardLayout = () => {
  const { role, name } = useUser();
  const { logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

const menuLinks = [
  { to: '/dashboard', label: 'Homepage', icon: <Home size={18} /> },
  { to: '/dashboard/addlesson', label: 'Add Lesson', icon: <BetweenVerticalEnd size={18} /> },
  { to: '/dashboard/mylesson', label: 'My Lesson', icon: <NotebookPen size={18} /> },
  { to: '/dashboard/favoriteLesson', label: 'Favorite Lesson', icon: <HeartPlus size={18} /> },
  { to: '/dashboard/myprofile', label: 'My Profile', icon: <ShieldUser size={18} /> },
];


  const adminLinks = [
    { to: '/dashboard/admin/manage-users', label: 'Manage Users', icon: <UserCog size={18} /> },
    { to: '/dashboard/admin/manage-lesson', label: 'Manage Lessons', icon: <BookOpenCheck size={18} /> },
    { to: '/dashboard/admin/report-lesson', label: 'Report Lessons', icon: <FlagOff size={18} /> },
    { to: '/dashboard/adminProfile', label: 'Admin Profile', icon: <UserStar size={18} /> },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="navbar bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-30">
          <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </label>

          <Link to="/" className="font-extrabold text-2xl sm:text-3xl">
            Digital Life <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">Lesson</span>
          </Link>

          {/* User dropdown */}
          <div className="relative flex items-center gap-3">
            <img 
              src={user.photoURL} 
              alt={name} 
              className="w-12 h-12 rounded-full cursor-pointer border-2 border-purple-500 shadow-sm"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <h2 className="font-semibold text-gray-800">{user.displayName}</h2>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                {role?.toUpperCase() || 'USER'}
              </span>
            </div>

            {/* Dropdown menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-14 mt-52 w-52 bg-white border shadow-lg rounded-xl overflow-hidden z-50"
                >
                  <div className="p-3 border-b font-semibold">{name}</div>
                  <Link to='/' className="block px-4 py-2 hover:bg-gray-100 transition">Home Page</Link>
                  <button onClick={() => { logout(); setDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 transition">Log out</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Page Outlet */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side bg-gray-100 border-r border-gray-200">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 space-y-1">
          {menuLinks.map((link, i) => (
            <motion.li 
              key={i} 
              whileHover={{ scale: 1.03 }}
              className={`rounded-lg ${location.pathname === link.to ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' : ''}`}
            >
              <Link to={link.to} className="flex items-center gap-3 px-3 py-2 transition-colors">
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </motion.li>
          ))}

          {/* Admin Links */}
          {role === 'admin' && adminLinks.map((link, i) => (
            <motion.li 
              key={i} 
              whileHover={{ scale: 1.03 }}
              className={`rounded-lg ${location.pathname === link.to ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' : ''}`}
            >
              <Link to={link.to} className="flex items-center gap-3 px-3 py-2 transition-colors">
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
