import { NavLink, Link, useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { UserRound, Folder, Languages, Stethoscope, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/authContext";
import authAxios from "../utils/authAxios";

const Navbar = () => {
  const { authUser, setAuthUser } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const userImage = "https://placehold.co/600x400?text=S";

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setAuthUser(userData);
  }, []);

  const handleEnterTheMouse = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpenMenu(true);
  };

  const handleLeaveTheMouse = () => {
    timerRef.current = setTimeout(() => {
      setOpenMenu(false);
    }, 300);
  };

  const handleLogout = async () => {
    try {
      await authAxios.post("/auth/logout");
      localStorage.clear();
      setAuthUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-blue-500 h-16 fixed top-0 left-0 w-full z-50 px-4 md:px-32">
        
        {/* LOGO */}
        <h1 className="text-2xl md:text-3xl font-bold text-amber-800">
          Aarogya <span className="text-amber-600">Link</span>
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-white">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? "text-amber-500 font-semibold" : "text-white"
          }>Home</NavLink>

          <NavLink to="/doctor/dashboard" className={({ isActive }) =>
            isActive ? "text-amber-500 font-semibold" : "text-white"
          }>Dashboard</NavLink>

          <NavLink to="/doctorlist">Doctors</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4 text-white">

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <Menu size={28} />
          </button>

          {!authUser ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <>
              <button onClick={handleLogout}>Logout</button>

              {/* PROFILE */}
              <div
                className="relative"
                onMouseEnter={handleEnterTheMouse}
                onMouseLeave={handleLeaveTheMouse}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <img
                  src={authUser.profilePic || userImage}
                  alt="user"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                />

                <AnimatePresence>
                  {openMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-3 w-52 bg-blue-200 rounded-lg shadow-lg p-3"
                    >
                      <ul className="space-y-2 text-gray-700">
                        <li><Link to="/profile"><UserRound /> Profile</Link></li>
                        <li><Link to="/dashboard/emr"><Folder /> EMR</Link></li>
                        <li><Link to="/ehr"><Folder /> EHR</Link></li>
                        <li><Link to="/cliniclab"><Stethoscope /> Prescription</Link></li>
                        <li><Link to="/doctorregisteration">Doctor Registration</Link></li>
                        <li><Link to="/language"><Languages /> Language</Link></li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="absolute top-16 left-0 w-full bg-blue-600 text-white flex flex-col items-center gap-4 py-4 md:hidden">
            <NavLink to="/" onClick={() => setMobileMenu(false)}>Home</NavLink>
            <NavLink to="/doctor/dashboard" onClick={() => setMobileMenu(false)}>Dashboard</NavLink>
            <NavLink to="/doctorlist" onClick={() => setMobileMenu(false)}>Doctors</NavLink>
            <NavLink to="/contact" onClick={() => setMobileMenu(false)}>Contact</NavLink>
            <NavLink to="/about" onClick={() => setMobileMenu(false)}>About</NavLink>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
