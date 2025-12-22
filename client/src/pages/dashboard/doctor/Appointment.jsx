import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import authAxios from "../../../utils/authAxios";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await authAxios.get(
          "/appointments/acceptedappointments",
          {
            withCredentials: true,
          }
        );
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching accepted appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("-").reverse().join("-");
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const filteredAppointments = appointments.filter((item) =>
    item.patientDetail?.userName
      ?.toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-[20%] h-auto md:h-screen bg-gray-800 md:fixed text-white">
          <div className="mt-20 ms-5">
            <h1 className="text-xl md:text-2xl font-bold">
              Welcome Satyam Thakur
            </h1>

            <div className="grid mt-6 md:mt-10 space-y-3 md:space-y-4">
              <NavLink
                to="/doctor/dashboard"
                className="hover:bg-gray-700 p-3 rounded-xl text-lg"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/doctor/dashboard/appointment"
                className="hover:bg-gray-700 p-3 rounded-xl text-lg"
              >
                Appointments
              </NavLink>

              <NavLink className="hover:bg-gray-700 p-3 rounded-xl text-lg">
                Today Appointment
              </NavLink>

              <NavLink
                to="/doctor/dashboard/details"
                className="hover:bg-gray-700 p-3 rounded-xl text-lg"
              >
                Details
              </NavLink>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full md:ms-[20%] md:w-[80%] mt-6 md:mt-16 p-4 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Accepted Appointments
          </h1>

          {/* SEARCH BAR */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by patient name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full md:w-1/2 p-3 border border-gray-300 rounded-xl shadow-sm focus:border-blue-600 outline-none"
            />
          </div>

          {filteredAppointments.length === 0 ? (
            <p className="text-gray-500">No appointments found.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredAppointments.map((item) => (
                <div
                  key={item._id}
                  className="bg-white min-h-[180px] flex flex-col md:flex-row items-center p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200"
                >
                  {/* PATIENT IMAGE */}
                  <img
                    src={
                      item?.patientDetail?.profilePic ||
                      "https://via.placeholder.com/80"
                    }
                    alt="Patient"
                    className="w-24 h-24 md:w-48 md:h-48 rounded-full border shadow"
                  />

                  {/* DETAILS */}
                  <div className="w-full mt-4 md:mt-0 md:ml-28">
                    <h1 className="text-lg md:text-xl font-bold hover:text-amber-500">
                      {item.patientDetail?.userName}
                    </h1>

                    <p className="text-gray-600 text-sm">
                      Patient Appointment
                    </p>

                    <p className="text-gray-700 font-medium mt-1">
                      <strong>Appointment Date: </strong>
                      {formatDate(item.appointmentDate)} <br />
                      <strong>Appointment Time: </strong>
                      {item.appointmentTime}
                    </p>

                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {item.status.toUpperCase()}
                    </span>

                    <div className="mt-3 text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <p>
                        <strong>Email:</strong>{" "}
                        {item.patientDetail?.email || "N/A"}
                      </p>
                      <p>
                        <strong>Age:</strong>{" "}
                        {calculateAge(item.patientDetail?.age)}
                      </p>
                      <p>
                        <strong>Gender:</strong>{" "}
                        {item.patientDetail?.gender || "N/A"}
                      </p>
                      <p>
                        <strong>Phone:</strong>{" "}
                        {item.patientDetail?.phoneNumber || "N/A"}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        View Details
                      </button>

                      <NavLink
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center"
                        to={`/doctor/dashboard/appointment/prescription/${item.patientDetail.userID}`}
                      >
                        Start Consultation
                      </NavLink>
                    </div>
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
