import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authAxios from "../utils/authAxios";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔹 STEP 1: SEND OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      await authAxios.patch("auth/forgotpassword", { email });
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // 🔹 STEP 2: VERIFY OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      await authAxios.patch("auth/forgotpasswordotp", { email, otp });
      toast.success("OTP verified");
      setStep(3); // move to change password
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  // 🔹 STEP 3: CHANGE PASSWORD
  const changePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await authAxios.patch("auth/changepassword", {
        email,
        otp,
        password,
      });

      toast.success("Password changed successfully");
      navigate(-1); // close modal
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">

        {/* Close */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center text-blue-600">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-500 text-center mt-2">
              Enter your registered email to receive OTP
            </p>

            <form onSubmit={sendOtp} className="mt-6 space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@aarogyalink.com"
                className="w-full border rounded-lg px-4 py-2"
              />

              <button className="w-full bg-blue-500 hover:bg-amber-500 text-white py-2 rounded-lg">
                Send OTP
              </button>
            </form>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center text-blue-600">
              Verify OTP
            </h2>

            <p className="text-sm text-gray-500 text-center mt-2">
              Enter OTP sent to <br />
              <span className="font-medium">{email}</span>
            </p>

            <form onSubmit={verifyOtp} className="mt-6 space-y-4">
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full border rounded-lg px-4 py-2 text-center tracking-widest text-lg"
              />

              <button className="w-full bg-blue-500 hover:bg-amber-500 text-white py-2 rounded-lg">
                Verify OTP
              </button>
            </form>

            <p
              onClick={() => setStep(1)}
              className="text-center text-sm text-blue-500 mt-4 cursor-pointer hover:underline"
            >
              Change Email
            </p>
          </>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-center text-blue-600">
              Change Password
            </h2>

            <p className="text-sm text-gray-500 text-center mt-2">
              Create a new password for your account
            </p>

            <form onSubmit={changePassword} className="mt-6 space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="w-full border rounded-lg px-4 py-2"
                required
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full border rounded-lg px-4 py-2"
                required
              />

              <button className="w-full bg-blue-500 hover:bg-amber-500 text-white py-2 rounded-lg">
                Change Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
