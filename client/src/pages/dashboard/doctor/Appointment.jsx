import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import authAxios from "../../../utils/authAxios";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await authAxios.get("/appointments/acceptedappointments");
        setAppointments(response.data.data);
        console.log("Accepted Appointments:", response.data.data);
      } catch (error) {
        console.error("Error fetching accepted appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Reverse date → DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("-").reverse().join("-");
  };

  return (
    <>
      <div className="flex">
        {/* LEFT SIDEBAR */}
        <div className="w-[20%] h-screen bg-gray-800 fixed text-white">
          <div className="mt-20 ms-5">
            <h1 className="text-2xl font-bold">Welcome Satyam Thakur</h1>

            <div className="grid mt-10 space-y-4">
              <NavLink to="/doctor/dashboard"
                className="hover:bg-gray-700 p-3 rounded-xl text-lg"
              >
                Dashboard
              </NavLink>

              <NavLink to="/doctor/appointments"
                className="hover:bg-gray-700 p-3 rounded-xl text-lg"
              >
                Appointments
              </NavLink>

              <NavLink className="hover:bg-gray-700 p-3 rounded-xl text-lg">
                Today Appointment
              </NavLink>

              <NavLink to="/doctor/dashboard/details"
                className="hover:bg-gray-700 p-3 rounded-xl text-lg"
              >
                Details
              </NavLink>
            </div>
          </div>
        </div>

        {/* MAIN AREA */}
        <div className="ms-[20%] w-[80%] p-10">
          <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>

          <h2 className="text-xl font-semibold mb-5">Accepted Appointments</h2>

          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {appointments.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200"
                >
                  {/* PATIENT IMAGE */}
                  <img
                    src={
                      item?.patientDetail?.profilePic ||
                      "https://via.placeholder.com/80"
                    }
                    alt="Patient"
                    className="w-20 h-20 rounded-full border shadow"
                  />

                  {/* DETAILS */}
                  <div className="ml-5">
                    <h1 className="text-xl font-bold">
                      {item.patientDetail?.fullName}
                    </h1>

                    <p className="text-gray-600 text-sm">Patient Appointment</p>

                    <p className="text-gray-700 font-medium mt-1">
                      📅 {formatDate(item.appointmentDate)}  
                      &nbsp; | &nbsp;  
                      ⏰ {item.appointmentTime}
                    </p>

                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Appointment;
