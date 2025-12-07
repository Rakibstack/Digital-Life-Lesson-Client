import React from 'react';
import lifelesson from '../../assets/life-lesson.png'
import { Link, NavLink } from 'react-router';

const Navber = () => {

    const links = <>
            <NavLink>Home</NavLink>
            <NavLink>Add Lesson</NavLink>
            <NavLink>My Lessons</NavLink>
            <NavLink>Public Lessons</NavLink>
            <NavLink>Upgrade</NavLink>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                          <nav>
                             {
                            links
                           }
                          </nav>
                        </ul>
                    </div>
                    <div className='flex justify-center items-center'>
                       <img className='w-15 h-14' src={lifelesson} alt="" />
                       <h2 className='font-extrabold hidden sm:block text-3xl'>Digital Life <span className=' bg-gradient-to-r from-[#632EE3]  to-[#9F62F2] bg-clip-text text-transparent'>Lesson</span></h2>

                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                      <nav className='flex gap-4 font-medium'>
                         {
                        links
                       }
                      </nav>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to='/auth/login' className='bg-gradient-to-r from-[#632EE3]  to-[#9F62F2] bg-clip-text text-transparent font-bold rounded-md px-4 py-1.5 border-2 border-[#632EE3] mr-3'>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Navber;