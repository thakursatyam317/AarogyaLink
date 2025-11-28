import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import authAxios from "../../../utils/authAxios";

const Notification = () => {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await authAxios.get("/appointments/allappointments");

        const data = response?.data?.data || response?.data;
        setAppointments(data || []);

        console.log("Fetched Appointments:", data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointment();
  }, []);

  // convert 15:30 → 03:30 PM
  const formatTime = (t) => {
    if (!t) return "";
    const [h, m] = t.split(":");
    const hours = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hours}:${m} ${ampm}`;
  };

  // ===============================
  // ✔ ACCEPT APPOINTMENT
  // ===============================
  const handleAccept = async (id) => {
    try {
      const response = await authAxios.put(
        `/appointments/update-status/${id}`,
        { status: "accepted" }
      );

      console.log("Accept Response:", response.data);

      setAppointments((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: "accepted" } : item
        )
      );
    } catch (error) {
      console.error("Accept Error:", error);
    }
  };

  // ===============================
  // ✔ REJECT APPOINTMENT
  // ===============================
  const handleReject = async (id) => {
    try {
      const response = await authAxios.put(
        `/appointments/update-status/${id}`,
        { status: "rejected" }
      );

      console.log("Reject Response:", response.data);

      setAppointments((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: "rejected" } : item
        )
      );
    } catch (error) {
      console.error("Reject Error:", error);
    }
  };

  // ===============================
  // ✔ SAVE DATE & TIME
  // ===============================
  const saveNewDateTime = async (id) => {
    try {
      const response = await authAxios.put(
        `/appointments/update-status/${id}`,
        {
          date: newDate,
          time: newTime,
        }
      );

      console.log("Updated Date/Time:", response.data);

      setAppointments((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, date: newDate, time: newTime }
            : item
        )
      );

      setIsEditing(null);
    } catch (error) {
      console.error("Date/Time Update Error:", error);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-[20%] h-screen bg-gray-600 fixed">
        <div className="mt-20">
          <h1 className="text-white text-2xl font-bold ms-3">
            Welcome Satyam Thakur
          </h1>
        </div>
      </div>

      {/* Notifications */}
      <div className="flex-1 p-6 ml-[22%]">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>

        {appointments.length === 0 && (
          <p className="text-gray-600">No appointments found.</p>
        )}

        {appointments.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl p-4 flex items-start gap-4 hover:shadow-lg transition-all mb-4"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="profile"
              className="w-16 h-16 rounded-full object-cover"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {item.patientDetail?.email || "Unknown Patient"}
              </h2>

              <p className="text-gray-600">Doctor Appointment Request</p>

              {/* EDIT UI */}
              {isEditing === item._id ? (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mt-2">

                  <div className="flex flex-col gap-3">
                    <input
                      type="date"
                      className="block w-full p-2 border rounded-lg"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                    />

                    <input
                      type="time"
                      className="block w-full p-2 border rounded-lg"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3 mt-3">
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                      onClick={() => saveNewDateTime(item._id)}
                    >
                      Save
                    </button>

                    <button
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                      onClick={() => setIsEditing(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-700 font-medium mt-1">
                    Time: <span className="text-blue-600">{formatTime(item.time)}</span>
                  </p>

                  <p className="text-gray-700 font-medium">
                    Date: <span className="text-blue-600">{item.date}</span>
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    Status:{" "}
                    <span
                      className={
                        item.status === "accepted"
                          ? "text-green-600"
                          : item.status === "rejected"
                          ? "text-red-600"
                          : "text-gray-600"
                      }
                    >
                      {item.status || "Pending"}
                    </span>
                  </p>

                  <button
                    className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg"
                    onClick={() => {
                      setIsEditing(item._id);
                      setNewDate(item.date);
                      setNewTime(item.time);
                    }}
                  >
                    Edit Date & Time
                  </button>
                </>
              )}
            </div>

            {/* Accept / Reject Buttons */}
            <div className="flex flex-col gap-3">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={() => handleAccept(item._id)}
              >
                Accept
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => handleReject(item._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Notification;
