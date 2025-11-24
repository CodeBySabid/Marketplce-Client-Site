import React, { useState, useRef, useEffect, use } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";
import AOS from 'aos';
import 'aos/dist/aos.css';
import image from '../../assets/download (9).jpg';
import { AuthContext } from '../../context/AuthContext';
import '../../Button/button.css';


const Navbar = () => {
  const { user, sigOut } = use(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


  const handleSigOut = () => {
    sigOut();
  };

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

  const ToggleBtn = () => {
    const enabled = theme === "dark";

    return (
      <button
        onClick={toggleTheme}
        className={`relative w-14 h-8 flex items-center rounded-full transition-colors duration-300
          ${enabled ? "bg-gray-600" : "bg-gray-300"}
        `}
      >
        <span
          className={`absolute w-6 h-6 bg-white rounded-full transition-all duration-300
            ${enabled ? "right-1" : "left-1"}
          `}
        ></span>

        {enabled ? (
          <span className="absolute right-1 text-yellow-300 text-xl">🌙</span>
        ) : (
          <span className="absolute right-1 text-yellow-500 text-xl">☀️</span>
        )}
      </button>
    );
  };

  const links = (
    <>
      <NavLink to={"/"} onClick={() => setOpen(false)}
        className={({ isActive }) => isActive ? "text-blue-600 px-3 font-semibold rounded-2xl" : "text-white hover:bg-[#3f51f3] px-3 hover:rounded-2xl hover:text-white"}>
        Home
      </NavLink>

      <NavLink to={"/alljobs"} onClick={() => setOpen(false)}
        className={({ isActive }) => isActive ? "text-blue-600 px-3 font-semibold rounded-2xl" : "text-white hover:bg-[#3f51f3] px-3 hover:rounded-2xl hover:text-white"}>
        All Jobs
      </NavLink>

      <NavLink to={"/addjob"} onClick={() => setOpen(false)}
        className={({ isActive }) => isActive ? "text-blue-600 px-3 font-semibold rounded-2xl" : "text-white hover:bg-[#3f51f3] px-3 hover:rounded-2xl hover:text-white"}>
        Add a Job
      </NavLink>

      <NavLink to={"/mytasks"} onClick={() => setOpen(false)}
        className={({ isActive }) => isActive ? "text-blue-600 px-3 font-semibold rounded-2xl" : "text-white hover:bg-[#3f51f3] px-3 hover:rounded-2xl hover:text-white"}>
        My Accepted Tasks
      </NavLink>
    </>
  );


  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#11062c49] shadow-sm backdrop-blur">
      <div className="navbar px-4 py-3 flex justify-between items-center">
        <Link to={"/"} className="flex items-center gap-3 text-2xl font-bold text-white">
          <img src={image} className="w-12 h-10 rounded-md object-cover" alt="logo" />
          <span>JobPortal</span>
        </Link>
        <div className="hidden lg:flex text-lg">
          {links}
        </div>
        <div className="hidden lg:flex gap-2 items-center">
          <ToggleBtn />
          <div className="relative group">
            {user ? (
              <Link to={'/myprofile'}>
                <img className="rounded-full w-[45px] h-[45px] object-cover cursor-pointer" src={user.photoURL} alt="profile" />
              </Link>
            ) : ''}
            {user && (
              <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                {user.displayName}
              </span>
            )}
          </div>
          {user ? (
            <Link onClick={handleSigOut} className="btns w-36">Log Out</Link>
          ) : (
            <>
              <Link to={"/login"} className="btns w-36">Login</Link>
              <Link to={"/register"} className="btns w-36">Register</Link>
            </>
          )}
        </div>
        <button
          className="lg:hidden text-black relative z-[999]"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiXMark className='text-white' size={32} /> : <IoMdMenu className='text-white' size={32} />}
        </button>
      </div>
      {open && (
        <div
          ref={dropdownRef}
          data-aos="fade-down"
          className="lg:hidden flex-col flex bg-[#0000007e] shadow-md px-6 py-5 space-y-4 text-center"
        >
          {links}

          <div className='flex w-full justify-center items-center gap-2'>
            <ToggleBtn />
            <div className="relative group">
              {user ? (
                <Link to={'/'}>
                  <img className="rounded-full w-[45px] h-[45px] object-cover cursor-pointer" src={user.photoURL} alt="profile" />
                </Link>
              ) : ''}
            </div>
            {user ? (
              <Link onClick={handleSigOut} className="btns w-36">Log Out</Link>
            ) : (
              <>
                <Link to={"/login"} className="btns w-36 max-sm:w-25">Login</Link>
                <Link to={"/register"} className="btns w-36 max-sm:w-25">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
