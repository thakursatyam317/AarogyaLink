import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";

const Appointment = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { authUser, fetchProfile } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (authUser) {
      setUserData({
        userName: authUser.userName || "",
        email: authUser.email || "",
        phoneNumber: authUser.phoneNumber || "",
        dob: authUser.dob?.slice(0, 10) || "",
        gender: authUser.gender || "",
        profilePic: authUser.profilePic || "",
        userID: authUser._id || authUser.userID || "",
        hospitalID: authUser.hospitalID || "",
      });
    }
    console.log("Auth User:", authUser);
  }, [authUser]);

  const handlePayment = () => {
    if (!patientName || !age || !date || !time) {
      alert("Please fill all details before payment!");
      return;
    }

    alert("₹50 Appointment Payment Successful!");
  };

  return (
    <div className="min-h-screen flex justify-center p-6 bg-gray-100">
      <div className="w-full mt-16 max-w-lg bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Appointment</h1>

        {/* Doctor Detail */}
        <h2 className="text-xl font-semibold mb-2">Doctor Details</h2>
        <div className="mb-6 p-4 border rounded-lg bg-blue-50 flex">
          <div className="mx-6 my-8 ">
              <img
                src={userData?.profilePic || ""}
                alt="Profile"
                className="h-28 w-28"
              />
            </div>
          <div>
            <p>
            <strong>Name:</strong> Dr. Rohan Khanna
          </p>
          <p>
            <strong>Specialist:</strong> Cardiologist
          </p>
          <p>
            <strong>Experience:</strong> 10+ Years
          </p>
          <p>
            <strong>Fee:</strong> ₹50
          </p>
          </div>
        </div>

        {/* Patient Form */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Patient Details</h2>

          <div className="mb-6 p-4 border rounded-lg bg-green-50 flex">
            <div className="mx-6 my-8 ">
              <img
                src={userData?.profilePic || ""}
                alt="Profile"
                className="h-28 w-28"
              />
            </div>
            {/* <div>
            <input
            type="text"
            placeholder="Patient Name"
            className="w-full p-2 border rounded mb-3"
            value={userData?.userName || ""}
            disabled={true}
            onChange={(e) => setPatientName(e.target.value)}
          />

          <input type="email" 
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={userData?.email || ""}
          disabled={true}
          onChange={(e) => setPatientName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-2 border rounded mb-3"
            value={userData?.phoneNumber || ""}
            disabled={true}
            onChange={(e) => setPatientName(e.target.value)}
          />

          <input
            type="date"
            placeholder="Age"
            className="w-full p-2 border rounded mb-3"
            value={userData?.dob || ""}
            onChange={(e) => setAge(e.target.value)}
          />

          

          <input
            type="date"
            className="w-full p-2 border rounded mb-3"
            value={date}
            placeholder="Enter your appointment date"
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            className="w-full p-2 border rounded mb-3"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div> */}

            <div>
              <p>
                <strong>Name:</strong> {userData?.userName || ""}
              </p>
              <p>
                <strong>Email:</strong> {userData?.email || ""}
              </p>
              <p>
                <strong>Phone Number:</strong> {userData?.phoneNumber || ""}
              </p>
              <p>
                <strong>Gender:</strong> {userData?.gender || ""}
              </p>
              <p>
                <strong>Blood Group: </strong>
                {userData?.bloodGroup || ""}
              </p>
              <strong></strong>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {userData?.dob
                  ? (() => {
                      const d = userData.dob.replace(/T.*$/, ""); // "2025-10-23"
                      const [year, month, day] = d.split("-");
                      return `${day}-${month}-${year}`;
                    })()
                  : ""}
              </p>
            </div>

            {/* Payment Button */}
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
          >
            Pay ₹50 & Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
