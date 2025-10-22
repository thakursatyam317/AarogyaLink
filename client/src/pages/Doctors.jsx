import React from "react";
import { Link } from "react-router-dom";

const Doctors = () => {
  const doctorPic = `https://placehold.co/600x400?text=S`;
  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center ">
            Doctors List
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div>
                <img src={doctorPic} alt="" className="w-full h-80 object-cover rounded" />
              </div>
              <div className="p-4">
                <h1 className="font-semibold text-2xl text-blue-500 hover:text-amber-500">Dorctor Name</h1>
                <p className="text-gray-700 mt-1">doc.specialty</p>
                <h3 className="text-gray-700 mt-1">dorctorID</h3>
                <h3 className="text-gray-500 mt-1">email</h3>
                <span className="text-gray-500 mt-1">phone Number</span>
                
              </div>
              <div className="flex justify-end">
                <Link 
                 className="  mt-3 me-3 mb-3 inline-block bg-blue-500 hover:bg-amber-500 text-white px-4 py-2 rounded transition-colors"
                >View Details</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
