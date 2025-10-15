import { NavLink, Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { UserRound, Folder, Languages, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const timerRef = useRef(null);
  const userImage = "https://placehold.co/600x400?text=S";

  const handleEnterTheMouse = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpenMenu(true);
  };

  const handleLeaveTheMouse = () => {
    timerRef.current = setTimeout(() => {
      setOpenMenu(false);
    }, 300);
  };

  return (
    <>
      <nav className="flex justify-between bg-blue-500 h-16 fixed top-0 left-0 w-full z-50">
        {/* Brand */}
        <div className="mt-4 ms-32">
          <h1 className="text-3xl font-bold text-amber-800">
            Aarogya <span className="text-amber-600">Link</span>
          </h1>
        </div>

      
        <div className="mt-5 flex gap-8 text-white">
          {["/", "/doctorlist", "/contact", "/about"].map((path, i) => {
            const names = ["Home", "Doctors", "Contact", "About"];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-500 font-semibold text-[18px]"
                    : "text-white text-[18px]"
                }
              >
                {names[i]}
              </NavLink>
            );
          })}
        </div>

        {/* Right Section (Login / Register / Profile Menu) */}
        <div className="mt-4 mr-32 flex gap-8 text-white items-center">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 text-[18px] -mt-3 font-semibold"
                : "text-white text-[18px] -mt-3"
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 text-[18px] font-semibold -mt-3"
                : "text-white text-[18px] -mt-3"
            }
          >
            Register
          </NavLink>

          {/* Profile Dropdown */}
          <div
            className="relative -mt-1.5"
            onMouseEnter={handleEnterTheMouse}
            onMouseLeave={handleLeaveTheMouse}
          >
            <img
              src={userImage}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer"
            />

            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-[-120px] mt-3 w-52 bg-blue-200 text-gray-700 rounded-lg shadow-lg p-3 z-50"
                >
                  <ul className="space-y-2">
                    <li>
                      <Link to="/profile" className="block hover:text-blue-600">
                        <div className="flex items-center">
                          <UserRound className="w-6 h-6 mx-2" /> Profile
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/emr" className="block hover:text-blue-600">
                        <div className="flex items-center">
                          <Folder className="w-6 h-6 mx-2" /> EMR
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/ehr" className="block hover:text-blue-600">
                        <div className="flex items-center">
                          <Folder className="w-6 h-6 mx-2" /> EHR
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cliniclab"
                        className="block hover:text-blue-600"
                      >
                        <div className="flex items-center">
                          <Stethoscope className="w-6 h-6 mx-2" /> Prescription
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/disease" className="block hover:text-blue-600">
                        🦠 Disease
                      </Link>
                    </li>
                    <li>
                      <Link to="/language" className="block hover:text-blue-600">
                        <div className="flex items-center">
                          <Languages className="w-6 h-6 mx-2" /> Language
                        </div>
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
