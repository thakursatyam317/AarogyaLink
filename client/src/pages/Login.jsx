import React from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
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
                  <h1 className="text-4xl mt-3 font-bold ml-32">Login</h1>
                </div>

                <div className="grid justify-center">
                  <div className="flex justify-center gap-10 my-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        className="accent-amber-500"
                      />
                      <span>User</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="doctor"
                        className="accent-amber-500"
                      />
                      <span>Doctor</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        className="accent-amber-500"
                      />
                      <span>Admin</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your Email"
                    className="border  my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    className="border my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />

                  <div className="flex mt-2 ">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-500 font-semibold text-[14px] mx-2"
                          : "text-blue-500 text-[14px] mx-2"
                      }
                    >
                      Forgot password
                    </NavLink>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-500 font-semibold ml-40 text-[14px] mx-2"
                          : "text-blue-500 ml-40 text-[14px] mx-2"
                      }
                    >
                      Sign In?
                    </NavLink>
                  </div>
                  <button
                    type="sumbit"
                    className="h-12 w-80 mx-auto bg-blue-500 rounded-xl font-medium text-2xl mt-4 hover:bg-amber-500 hover:text-white"
                  >
                    Login
                  </button>
                  <div className="flex items-center mt-3 ">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-gray-500 font-medium">Or</span>
                    <hr className="flex-grow border-gray-300" />
                  </div>
                  <button
                    type="sumbit"
                    className="h-10 w-80 mx-auto bg-blue-500 rounded-xl font-medium text-2xl mt-3 hover:bg-amber-500 hover:text-white"
                  >
                    Google
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

export default Login;
