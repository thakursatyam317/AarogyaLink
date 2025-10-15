import React from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="flex justify-center ">
        <div className="border-2 rounded-2xl mt-48 h-[480px] w-[60%]">
          <div className="">
            <div>
              <img src="" alt="" />
            </div>
            <div className="mt-5 ml-8 ">
              <form action="" className="grid justify-center  ml-96">
                <div className="mb-7">
                  <h1 className="text-4xl mt-3 font-bold ml-28">Register</h1>
                </div>

                <div className="grid justify-center">
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    className="border  my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="border my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />
                  <input
                    type="number"
                    placeholder="Enter your Number"
                    className="border my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />
                  <input
                    type="password"
                    placeholder="Enter your Create Password"
                    className="border my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />
                  <input
                    type="text"
                    placeholder="Enter your Confirm Password"
                    className="border my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 font-semibold  text-[14px] mx-2"
                        : "text-blue-500  text-[14px] mx-2"
                    }
                  >
                    Sign In?
                  </NavLink>

                  <button
                    type="sumbit"
                    className="h-12 w-80 mx-auto bg-blue-500 rounded-xl font-medium text-2xl mt-6 hover:bg-amber-500 hover:text-white"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
