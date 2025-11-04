import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import authAxios from "../utils/authAxios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors list from the server
    const fetchDoctors = async () => {
      try {
        const response = await authAxios.get("/doctor/list");
        console.log("Doctors fetched:", response.data);
        if (response.data?.statusCode === 200) {
          setDoctors(response.data.data);
        } else {
          console.error("Failed to fetch doctors:", response?.data?.message);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const doctorPic = `https://placehold.co/600x400?text=S`;
  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center ">
            Doctors List
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {doctors.map((doc) => (
              <div
                key={doc.doctorID}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div>
                  <img
                    src={doc.userDetails.profilePic || doctorPic}
                    alt={doc.userDetails.userName}
                    className="w-full h-80 object-cover rounded"
                  />
                </div>
                <div className="p-4">
                  <h1 className="font-semibold text-2xl text-blue-500 hover:text-amber-500">
                    {doc.userDetails.userName}
                  </h1>
                  <p className="text-gray-700 mt-1">{doc.specialization}</p>
                  <h3 className="text-gray-700 mt-1">{doc.doctorID}</h3>
                  <h3 className="text-gray-500 mt-1">{doc.userDetails.email}</h3>
                  <span className="text-gray-500 mt-1">{doc.userDetails.phoneNumber}</span>
                </div>
                <div className="flex justify-end">
                  <Link
                    to={`/doctor/${doc.doctorID}`}
                    className="mt-3 me-3 mb-3 inline-block bg-blue-500 hover:bg-amber-500 text-white px-4 py-2 rounded transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
