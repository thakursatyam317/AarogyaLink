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
        const res = await authAxios.get("/emr/doctor/emr");
        console.log("response", res.data.data);
        setAppointments(res.data.data);
        // console.log("Appointments :- ",appointments);
      } catch (err) {
        console.error(err);
        setError("Failed to load EMR data");
      } finally {
        setLoading(false);
      }
    };

    fetchEMR();
  }, []);
  //   useEffect(() => {
  //   console.log("Appointments updated:", appointments);
  // }, [appointments]);

  // 🔹 Filter by search
  const filteredAppointments = appointments.filter((item) =>
    item.patientDetail.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  const calculateAge = (dob) =>
    new Date().getFullYear() - new Date(dob).getFullYear();

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="flex ">
      <div className="w-full md:w-[20%] h-auto md:h-screen bg-gray-800 md:fixed text-white">
        <div className="mt-20 ms-5">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Welcome {user?.userName}
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

      <div className="w-[80%] ms-[20%] p-10 bg-gray-100 min-h-screen mt-10">
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
                {item.patientDetail.userName}
              </h2>

             
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <p>
                  <strong>Email:</strong> {item.patientDetail.email}
                </p>
                <p>
                  <strong>Phone:</strong> {item.patientDetail.phoneNumber}
                </p>
                
                <p>
                  <strong>Doctor:</strong> {item.doctorDetail.userName}
                </p>
                <p>
                  <strong>Prescription report:</strong>{" "}
                  <a
                    href={item.prescriptionpdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Prescription
                  </a>
                </p>
              </div>

              <button
                onClick={() =>
                  setActivePatientId(
                    activePatientId === item._id ? null : item.userID
                  )
                }
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                {activePatientId === item._id
                  ? "Hide Complete Details"
                  : "View Complete Details"}
              </button>
              <button
                onClick={() => alert("Data Shared Successfully!")}
                className="mt-4 ms-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
              >
                Share the Data
              </button>

              {activePatientId === item._id && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg grid grid-cols-2 gap-4 text-sm">
                  <p>
                    <strong>Gender:</strong> {item.patientDetail.gender}
                  </p>
                  <p>
                    <strong>Age:</strong> {calculateAge(item.patientDetail.age)}
                  </p>

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
