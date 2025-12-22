import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import authAxios from "../utils/authAxios";
import { Toaster, toast } from "react-hot-toast";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Building,
  Stethoscope,
  IdCard,
} from "lucide-react";

const DoctorDetailComplete = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await authAxios.get(`/doctor/detail/${id}`);
        setDoctor(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load doctor details");
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-blue-600">
          Loading doctor details...
        </h1>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl text-red-600 font-medium">Doctor not found!</h1>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-10 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-blue-100">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
              Doctor Profile
            </h1>
            <Link
              to="/doctor/list"
              className="text-blue-500 hover:text-blue-700 text-lg font-medium"
            >
              ← Back to Doctors
            </Link>
          </div>

          {/* Doctor Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Section */}
            <div className="flex flex-col items-center md:border-r border-blue-100 md:pr-6">
              <img
                src={
                  doctor?.userDetails.profilePic ||
                  "https://placehold.co/200x200?text=Doctor"
                }
                alt="Doctor"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-md mb-4 object-cover border-4 border-blue-100"
              />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1 hover:text-amber-500">
                {doctor.userDetails.userName}
              </h2>
              <p className="text-blue-500 font-medium mb-3 text-center">
                {doctor.specialization || "General Physician"}
              </p>
              <div className="flex flex-col gap-2 text-gray-600 text-sm md:text-base">
                <p className="flex items-center gap-2">
                  <Mail size={18} /> {doctor.userDetails.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={18} /> {doctor.userDetails.phoneNumber}
                </p>
                <p className="flex items-center gap-2">
                  <User size={18} /> Gender: {doctor.userDetails.gender}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-blue-600 border-b pb-2 border-blue-200">
                Professional Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm md:text-base">
                <div>
                  <span className="font-medium">Specialization:</span> <br />
                  {doctor.specialization || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Experience:</span> <br />
                  {doctor.experience ? `${doctor.experience} years` : "N/A"}
                </div>
                <div>
                  <span className="font-medium">Qualification:</span> <br />
                  {doctor.qualification || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Doctor ID:</span> <br />
                  {doctor.doctorUniqueId || doctor.doctorID}
                </div>
                <div>
                  <span className="font-medium">Holidays:</span> <br />
                  {doctor.holidays}
                </div>
                <div>
                  <span className="font-medium">Description:</span> <br />
                  {doctor.description}
                </div>
              </div>

              <div className="mt-6 flex justify-center md:justify-end">
                <Link
                  to={`/appointments/.?${doctor.doctorID}`}
                  className="bg-blue-500 hover:bg-amber-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              Last Updated:{" "}
              {new Date(doctor.updatedAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetailComplete;
