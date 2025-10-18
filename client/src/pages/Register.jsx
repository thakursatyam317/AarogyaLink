import { useState } from "react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    createPassword: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.createPassword !== data.password) {
      toast.error("❌ Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4500/api/auth/register", data);
      if (res.status === 200 || res.status === 201) {
        toast.success("✅ User Registered Successfully");
        setData({
          userName: "",
          email: "",
          phoneNumber: "",
          createPassword: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("❌ Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong.");
    }
  };

  return (
    <>
      <div className="flex justify-center bg-blue-50 h-[834px]">
        <div className=" mt-48 h-[480px] w-[60%] shadow-[0_0_25px_rgba(59,130,246,0.25)] border border-blue-100 rounded-2xl bg-white p-6">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="">
            <div>
              <img src="" alt="" />
            </div>
            <div className="mt-0 ml-8 ">
              <form
                action=""
                className="grid justify-center  ml-96"
                onSubmit={handleSubmit}
              >
                <div className="mb-7">
                  <h1 className="text-4xl mt-3 font-bold ml-28">Register</h1>
                </div>

                <div className="grid justify-center">
                  <input
                    type="text"
                    onChange={handleChange}
                    name="userName"
                    value={data.userName}
                    required
                    placeholder="Enter your Name"
                    className="border  my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />
                  <input
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={data.email}
                    required
                    placeholder="Enter your email"
                    className="border my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />
                  <input
                    type="number"
                    onChange={handleChange}
                    name="phoneNumber"
                    value={data.phoneNumber}
                    required
                    placeholder="Enter your Number"
                    className="border my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />
                  <input
                    type="password"
                    onChange={handleChange}
                    name="createPassword"
                    value={data.createPassword}
                    required
                    placeholder="Enter your Create Password"
                    className="border my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />
                  <input
                    type="text"
                    onChange={handleChange}
                    name="password"
                    value={data.password}
                    required
                    placeholder="Enter your Confirm Password"
                    className="border my-1.5 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  w-[350px]"
                  />
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 font-semibold  text-[14px] mx-2 hover:text-blue-800"
                        : "text-blue-500  text-[14px] mx-2 hover:text-blue-800"
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
