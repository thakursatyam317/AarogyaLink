import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post(
        "http://localhost:4500/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const data = res.data;
      const { user, token } = data;

      if (!user || !user.role) {
        throw new Error("Invalid user data from server");
      }

      if (role === "admin" && user.role !== "admin") {
        toast.error("You are not authorized as Admin");
        localStorage.clear();
        return;
      }
      if (role === "doctor" && user.role !== "doctor") {
        toast.error("You are not authorized as Doctor");
        localStorage.clear();
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      window.dispatchEvent(new Event("authChange"));

      toast.success("Login Successful!", {
        duration: 1500,
        position: "top-center",
      });

      e.target.reset();

      setTimeout(() => {
        navigate(user.role === "admin" ? "/admin/dashboard" : "/");
      }, 1500);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center bg-blue-50 min-h-screen px-4">
        <div className="mt-24 md:mt-48 h-auto md:h-[480px] w-full md:w-[60%] shadow-[0_0_25px_rgba(59,130,246,0.25)] border border-blue-100 rounded-2xl bg-white p-6">
          <Toaster position="top-center" reverseOrder={false} />

          <div className="">
            <div>{/* image placeholder */}</div>

            <div className="mt-0 md:ml-8">
              <form
                action=""
                className="grid justify-center md:ml-96"
                onSubmit={handleSubmit}
              >
                <div className="mb-7 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl mt-3 font-bold md:ml-32">
                    Login
                  </h1>
                </div>

                <div className="grid justify-center w-full">
                  <div className="flex flex-wrap justify-center gap-6 my-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={role === "user"}
                        onChange={() => setRole("user")}
                        className="accent-amber-500"
                      />
                      <span>User</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="doctor"
                        checked={role === "doctor"}
                        onChange={() => setRole("doctor")}
                        className="accent-amber-500"
                      />
                      <span>Doctor</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={role === "admin"}
                        onChange={() => setRole("admin")}
                        className="accent-amber-500"
                      />
                      <span>Admin</span>
                    </label>
                  </div>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your Email"
                    className="border my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 w-full md:w-[350px]"
                  />

                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Enter your Password"
                    className="border my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 w-full md:w-[350px]"
                  />

                  <div className="flex justify-between mt-2 w-full md:w-[350px]">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-500 font-semibold text-[14px] hover:text-blue-800"
                          : "text-blue-500 text-[14px] hover:text-blue-800"
                      }
                      to='/login/forgetpassword'
                    >
                      Forgot password
                    </NavLink>

                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-500 font-semibold text-[14px] hover:text-blue-800"
                          : "text-blue-500 text-[14px] hover:text-blue-800"
                      }
                    >
                      Sign Up?
                    </NavLink>
                  </div>

                  <button
                    type="sumbit"
                    className="h-12 w-full md:w-80 mx-auto bg-blue-500 rounded-xl font-medium text-xl md:text-2xl mt-4 hover:bg-amber-500 hover:text-white"
                  >
                    Login
                  </button>

                  <div className="flex items-center mt-3 w-full md:w-80 mx-auto">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-gray-500 font-medium">Or</span>
                    <hr className="flex-grow border-gray-300" />
                  </div>

                  <button
                    type="sumbit"
                    className="h-10 w-full md:w-80 mx-auto bg-blue-500 rounded-xl font-medium text-xl md:text-2xl mt-3 hover:bg-amber-500 hover:text-white"
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
