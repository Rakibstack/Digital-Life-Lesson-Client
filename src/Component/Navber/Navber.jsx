import React, { useState,    } from 'react';
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import lifelesson from '../../assets/life-lesson.png';
import useAuth from '../../Hooks/useAuth';
import Loading from '../Loading/Loading';

const Navber = () => {
    const { user, logout, loading } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    if (loading) {
        return <Loading />;
    }

    const links = <>
        <NavLink>Home</NavLink>
        <NavLink>Add Lesson</NavLink>
        <NavLink>My Lessons</NavLink>
        <NavLink>Public Lessons</NavLink>
        <NavLink to='/upgrade'>Upgrade</NavLink>
    </>;

    return (
        <div className="navbar bg-base-100 px-4 shadow-md">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                        <nav className='flex flex-col gap-2'>
                            {links}
                        </nav>
                    </ul>
                </div>
                <div className='flex justify-center items-center'>
                    <img className='w-15 h-14' src={lifelesson} alt="" />
                    <h2 className='font-extrabold hidden sm:block text-3xl'>
                        Digital Life <span className='bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Lesson</span>
                    </h2>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <nav className='flex gap-4 font-medium'>
                        {links}
                    </nav>
                </ul>
            </div>

            <div className="navbar-end flex items-center space-x-4">
                {!user ? (
                    <>
                        <Link to="/auth/login" className="btn">Login</Link>
                        <Link to="/auth/register" className="btn btn-primary">Signup</Link>
                    </>
                ) : (
                    <div className="relative">
                        <img
                            src={user.photoURL }
                            alt={user.displayName}
                            className="w-13 h-13 mr-4 rounded-full cursor-pointer "
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-54 bg-white border shadow-lg rounded overflow-hidden z-50"
                                >
                                    <div className="p-2 border-b font-semibold">{user.displayName}</div>
                                    <Link  className="block px-4 py-2 hover:bg-gray-100 transition">Profile</Link>
                                    <Link className="block px-4 py-2 hover:bg-gray-100 transition">Dashboard</Link>
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
                )}
            </div>
        </div>
    );
};

export default Navber;
