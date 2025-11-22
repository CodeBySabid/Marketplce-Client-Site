import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";
import AOS from 'aos';
import 'aos/dist/aos.css';
import image from '../../assets/download (9).jpg';

const user = {
  displayName: "JobPortal",
  photoURL: image,
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
    });
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        AOS.refresh();
      }, 50);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const links = (
    <>
        <NavLink to="/" onClick={() => setOpen(false)}
        className={({ isActive }) => isActive ? "text-blue-600 font-semibold hover:bg-[#3f51f3] rounded-2xl hover:text-white" : "text-black hover:bg-[#3f51f3] px-2 hover:rounded-2xl hover: hover:text-white"}>
        Home
      </NavLink>

      <NavLink to="/a" onClick={() => setOpen(false)}
        className={({ isActive }) => isActive ? "text-blue-600 font-semibold hover:bg-[#3f51f3] rounded-2xl hover:text-white" : "text-black hover:bg-[#3f51f3] px-2 hover:rounded-2xl hover: hover:text-white"}>
        All Jobs
      </NavLink>

      <NavLink to="/b" onClick={() => setOpen(false)}
        className={({ isActive }) => isActive ? "text-blue-600 font-semibold hover:bg-[#3f51f3] rounded-2xl hover:text-white" : "text-black hover:bg-[#3f51f3] px-2 hover:rounded-2xl hover: hover:text-white"}>
        Add a Job
      </NavLink>

      <NavLink to="/c" onClick={() => setOpen(false)}
        className={({ isActive }) => isActive ? "text-blue-600 font-semibold hover:bg-[#3f51f3] rounded-2xl hover:text-white" : "text-black hover:bg-[#3f51f3] px-2 hover:rounded-2xl hover: hover:text-white"}>
        My Accepted Tasks
      </NavLink>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">

      <div className="navbar px-4 py-3 flex justify-between items-center">

        <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-black">
          <img src={image} className="w-12 h-10 rounded-md object-cover" alt="logo" />
          <span>JobPortal</span>
        </Link>

        <div className="hidden lg:flex gap-6 text-lg">
          {links}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {user && (
            <div className="relative group">
              <img src={user.photoURL} className="w-11 h-11 rounded-full object-cover cursor-pointer" />
              <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {user.displayName}
              </span>
            </div>
          )}

          <button className="btn w-32 bg-green-500 text-white rounded-xl hover:bg-green-600">Log Out</button>
        </div>

        <button
          className="lg:hidden text-black relative z-[999]"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiXMark size={32} /> : <IoMdMenu size={32} />}
        </button>
      </div>

      {open && (
        <div
          ref={dropdownRef}
          data-aos="fade-down"
          className="lg:hidden flex-col flex bg-white shadow-md px-6 py-5 space-y-4 text-center"
        >
          {links}

          <div className='flex w-full justify-center items-center gap-2 h-auto'>
                            <div className="relative group">
                                {user ? (
                                    <Link to={'/'}><img className="rounded-full w-[45px] h-[45px] object-cover cursor-pointer" src={user.photoURL} alt="profile" /></Link>
                                ) : ''}
                                {user && (
                                    <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                        {user.displayName}
                                    </span>
                                )}
                            </div>
                            {user ? (
                                <Link className="w-36 btn font-semibold bg-green-400 text-gray-50 hover:text-black hover:bg-green-500 border rounded-2xl py-1 px-2.5 text-xl" >
                                    Log Out
                                </Link>
                            ) : <>
                                <Link to="/" className="w-36 btn font-semibold bg-green-400 text-gray-50 hover:text-black hover:bg-green-500 border rounded-2xl py-1 px-2.5 text-xl" >
                                    Login
                                </Link>
                                <Link to="/" className="w-36 btn font-semibold bg-green-400 text-gray-50 hover:text-black hover:bg-green-500 border rounded-2xl py-1 px-2.5 text-xl" >
                                    Register
                                </Link>
                            </>}
                        </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;
