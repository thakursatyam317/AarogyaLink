import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import authAxios from "../../../utils/authAxios";

const Notification = () => {
  const [newDate, setNewDate] = useState("2023-08-12");
  const [newTime, setNewTime] = useState("15:30");
  const [isEditing, setIsEditing] = useState(false);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    // Fetch appointment details from backend
    const fetchAppointment = async () => {
      try {
        const response = await authAxios.get("/appointments/allappointments");
        setAppointment(response.data.data);
        console.log("Fetched Appointments:", response);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointment();
  }, []);

  // convert time like "15:30" → "03:30 PM"
  const formatTime = (t) => {
    const [h, m] = t.split(":");
    const hours = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hours}:${m} ${ampm}`;
  };

  return (
    <>
      <div className="flex w-full min-h-screen bg-gray-100">
        {/* ============ Sidebar ============ */}
        <div className="w-[20%] h-screen bg-gray-600 fixed ">
          <div className="mt-20">
            <h1 className="text-white text-2xl font-bold ms-3">
              Welcome Satyam Thakur
            </h1>
          </div>
          <div className="grid ">
            <NavLink
              to="/doctor/dashboard"
              className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/doctor/dashboard"
              className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
            >
              Appointments
            </NavLink>
            <NavLink
              to="/doctor/dashboard"
              className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
            >
              Today Appointment
            </NavLink>
            <NavLink
              to="/doctor/dashboard"
              className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
            >
              Details
            </NavLink>
          </div>
        </div>

        {/* ============ Notification Section ============ */}
        <div className="flex-1 p-6 ml-[22%]">
          <h1 className="text-2xl font-bold mb-4">Notifications</h1>

          {/* Notification Card */}
          <div className="bg-white shadow-md rounded-xl p-4 flex items-start gap-4 hover:shadow-lg transition-all">
            {/* Image */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="profile"
              className="w-16 h-16 rounded-full object-cover"
            />

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Dr. Satyam Thakur</h2>
              <p className="text-gray-600">Doctor Appointment Request</p>

              {/* Editing UI */}
              {isEditing ? (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mt-2">
                  <p className="text-blue-700 font-semibold mb-2">
                    Edit Date & Time
                  </p>

                  <div className="flex flex-col gap-3">
                    {/* Date */}
                    <div>
                      <label className="text-sm font-medium">New Date:</label>
                      <input
                        type="date"
                        className="block w-full p-2 border rounded-lg mt-1"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label className="text-sm font-medium">New Time:</label>
                      <input
                        type="time"
                        className="block w-full p-2 border rounded-lg mt-1"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-3">
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                      onClick={() => setIsEditing(false)}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Updated Doctor Timing */}
                  <p className="text-gray-700 font-medium mt-1">
                    New Time:{" "}
                    <span className="text-blue-600">{formatTime(newTime)}</span>
                  </p>

                  <p className="text-gray-700 font-medium">
                    New Date: <span className="text-blue-600">{newDate}</span>
                  </p>

                  {/* Previous Timing */}
                  <p className="text-gray-500 text-sm mt-1">
                    Previous: 10th Aug, 2023 • 10:00 AM
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Updated by Doctor • 5 mins ago
                  </p>

                  {/* Edit Button */}
                  <button
                    className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Date & Time
                  </button>
                </>
              )}
            </div>

            {/* Accept / Reject Buttons */}
            <div className="flex flex-col gap-3">
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Accept
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;  