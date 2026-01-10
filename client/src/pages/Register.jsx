import { useState } from "react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import doctImage from "../assets/doctorImg/doctorIMG.jpg";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    createPassword: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // STEP 1️⃣ Register & Send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.createPassword !== data.password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4500/api/auth/register",
        data
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("OTP sent to your email");
        setOtpSent(true); // 🔥 enable OTP field
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2️⃣ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.patch(
        "http://localhost:4500/api/auth/emailverification",
        {
          email: data.email,
          otp,
        }
      );

      if (res.status === 200) {
        toast.success("Email verified successfully");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center bg-blue-50 min-h-screen px-4">
        <div className="mt-24 md:mt-36 h-auto md:h-[600px] w-full md:w-[60%] shadow-[0_0_25px_rgba(59,130,246,0.25)] border border-blue-100 rounded-2xl bg-white p-6">
          <Toaster position="top-center" />
          <div className="flex  relative flex-col md:flex-row items-center md:items-start">
            <div className=" ms-33  w-[480px] -left-40 hidden md:block absolute -mt-6 ">
              <img
                src={doctImage}
                alt="Doctor"
                className=" w-full h-[600px] object-cover rounded-l-2xl rounded-r-none"
              />
            </div>
          

          <div className="mt-0 ms-28 ">
            <form
              className="grid justify-center md:ml-96"
              onSubmit={handleSubmit}
            >
              <div className="mb-7 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl mt-3 font-bold md:ml-28">
                  Register
                </h1>
              </div>

              <div className="grid justify-center w-full">
                <input
                  type="text"
                  name="userName"
                  value={data.userName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your Name"
                  className="border my-1.5 rounded-lg px-4 py-2 w-full md:w-[350px]"
                />

                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="border my-1.5 rounded-lg px-4 py-2 w-full md:w-[350px]"
                />

                <input
                  type="number"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your Number"
                  className="border my-1.5 rounded-lg px-4 py-2 w-full md:w-[350px]"
                />

                <input
                  type="password"
                  name="createPassword"
                  value={data.createPassword}
                  onChange={handleChange}
                  required
                  placeholder="Create Password"
                  className="border my-1.5 rounded-lg px-4 py-2 w-full md:w-[350px]"
                />

                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                  className="border my-1.5 rounded-lg px-4 py-2 w-full md:w-[350px]"
                />

                {/* 🔐 OTP FIELD */}
                {otpSent && (
                  <>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="border my-2 rounded-lg px-4 py-2 w-full md:w-[350px]"
                    />
                  </>
                )}
                <NavLink
                  to="/login"
                  className="text-blue-500 text-[14px] mx-2 mt-3"
                >
                  Sign In?
                </NavLink>

                {!otpSent && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full md:w-80 mx-auto bg-blue-500 rounded-xl font-medium text-xl mt-6 hover:bg-amber-500 text-white"
                  >
                    Register
                  </button>
                )}
                {otpSent && (
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={handleVerifyOtp}
                    className="h-12 w-full md:w-80 mx-auto bg-blue-500 rounded-xl font-medium text-xl mt-6 hover:bg-amber-500 text-white"
                  >
                    OTP Verify
                  </button>
                )}
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
