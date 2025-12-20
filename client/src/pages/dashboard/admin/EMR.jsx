import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import authAxios from "../../../utils/authAxios";

const EMR = () => {
  const { user } = useAuth();

  const [searchText, setSearchText] = useState("");
  const [activePatientId, setActivePatientId] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchEMR = async () => {
      try {
        const res = await authAxios.get(
          "/emr/doctor/emr"
        );
        console.log("response", res)
        setAppointments(res.data)
        console.log(appointments);
      } catch (err) {
        console.error(err);
        setError("Failed to load EMR data");
      } finally {
        setLoading(false);
      }
    };

    fetchEMR();
  }, []);

  // 🔹 Filter by search
  const filteredAppointments = appointments.filter((item) =>
    item.patientDetail.fullName
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const calculateAge = (dob) =>
    new Date().getFullYear() - new Date(dob).getFullYear();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString();

  return (
    <div className="flex">
     
      <div className="w-[18%] min-h-screen bg-gray-900">
        <div className="mt-20">
          <h1 className="text-white text-2xl font-bold ms-3">
            Welcome {user?.fullName}
          </h1>

          <div className="grid">
            {[
              "Dashboard",
              "Today Appointment",
              "Appointment",
              "Doctors",
              "EMR",
              "EHR",
            ].map((item) => (
              <NavLink
                key={item}
                className="text-white text-xl h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-6"
              >
                {item}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      
      <div className="w-[82%] p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Electronic Medical Record (EMR)
        </h1>

      
        <input
          type="text"
          placeholder="Search patient by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-xl shadow-sm mb-6"
        />

       
        {loading && <p>Loading EMR data...</p>}

        
        {error && <p className="text-red-500">{error}</p>}

        
        {!loading && filteredAppointments.length === 0 && (
          <p className="text-gray-500">No patients found.</p>
        )}

        <div className="flex flex-col gap-6">
          {filteredAppointments.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-xl shadow border"
            >
              <h2 className="text-xl font-bold">
                {item.patientDetail.fullName}
              </h2>

              <p className="mt-1">
                <strong>Date:</strong> {formatDate(item.appointmentDate)}
              </p>
              <p>
                <strong>Time:</strong> {item.appointmentTime}
              </p>

              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {item.status.toUpperCase()}
              </span>

              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <p><strong>Email:</strong> {item.patientDetail.email}</p>
                <p><strong>Phone:</strong> {item.patientDetail.phoneNumber}</p>
              </div>

              <button
                onClick={() =>
                  setActivePatientId(
                    activePatientId === item._id ? null : item._id
                  )
                }
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                {activePatientId === item._id
                  ? "Hide Complete Details"
                  : "View Complete Details"}
              </button>

              {activePatientId === item._id && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg grid grid-cols-2 gap-4 text-sm">
                  <p><strong>Gender:</strong> {item.patientDetail.gender}</p>
                  <p><strong>Age:</strong> {calculateAge(item.patientDetail.age)}</p>

                  <div className="col-span-2">
                    <h3 className="font-semibold">Prescription</h3>
                    <p className="text-gray-500">Not added yet</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EMR;
