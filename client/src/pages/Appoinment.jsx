import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import authAxios from "../utils/authAxios";
import { useLocation } from "react-router-dom";


const Appointment = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { authUser } = useAuth();
  const location = useLocation();


  const [userData, setUserData] = useState({});
  const [doctorData, setDoctorData] = useState({});


  useEffect(() => {
    if (authUser) {
      setUserData({
        userName: authUser.userName || "",
        email: authUser.email || "",
        phoneNumber: authUser.phoneNumber || "",
        gender: authUser.gender || "",
        dob: authUser.dob?.slice(0, 10) || "",
        bloodGroup: authUser.bloodGroup || "",
        profilePic: authUser.profilePic || "",
        userID: authUser._id,
      });
    }
  }, [authUser]);

 useEffect(() => {
  const fetchDoctor = async () => {
    try {
  
      const doctorID = location.search.replace("?", "");

      if (!doctorID) {
        console.error("No doctor ID found in URL");
        return;
      }

      const response = await authAxios.get(`/doctor/appointments/${doctorID}`);

      const data = response.data.data;

      setDoctorData({
        name: data?.userDetails?.userName || "",
        specialist: data?.specialization || "",
        experience: data?.experience || "",
        fee: data?.consultationFee || "",
        profilePic: data?.userDetails?.profilePic || "",
      });
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  fetchDoctor();
}, [location.search]);

  const handlePayment = () => {
    if (!date || !time) {
      alert("Please select date & time before confirming!");
      return;
    }
    alert("₹50 Appointment Payment Successful!");
  };

  return (
    <div className="min-h-screen flex justify-center p-6 bg-gray-100">
      <div className="w-full mt-16 max-w-lg bg-white p-6 rounded-xl shadow-lg">
        
        <h1 className="text-3xl font-bold text-center mb-6">Appointment</h1>

        {/* -------------------------
           Doctor Detail Section
        -------------------------- */}
        <h2 className="text-xl font-semibold mb-2">Doctor Details</h2>
        <div className="mb-6 p-4 border rounded-lg bg-blue-50 flex">
          <div className="mx-6 my-8">
            <img
              src={doctorData?.profilePic || ""}
              alt="Doctor"
              className="h-28 w-28 rounded-full border"
            />
          </div>

          <div>
            <p><strong>Name:</strong> {doctorData?.name}</p>
            <p><strong>Specialist:</strong> {doctorData?.specialist}</p>
            <p><strong>Experience:</strong> {doctorData?.experience} Years</p>
            <p><strong>Fee:</strong> ₹{doctorData?.fee}</p>
          </div>
        </div>

        {/* -------------------------
            Patient Details Section
        -------------------------- */}
        <h2 className="text-xl font-semibold mb-2">Patient Details</h2>
        <div className="mb-6 p-4 border rounded-lg bg-green-50 flex">
          <div className="mx-6 my-8">
            <img
              src={userData?.profilePic}
              alt="User"
              className="h-28 w-28 rounded-full border"
            />
          </div>

          <div>
            <p><strong>Name:</strong> {userData.userName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phoneNumber}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Date of Birth:</strong> {userData.dob}</p>
            <p><strong>Blood Group:</strong> {userData.bloodGroup}</p>
          </div>
        </div>

        {/* -------------------------
            Date & Time Selection
        -------------------------- */}
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          className="w-full p-2 border rounded mb-4"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        {/* -------------------------
            Payment Button
        -------------------------- */}
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
        >
          Pay ₹{doctorData.fee || 50} & Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
