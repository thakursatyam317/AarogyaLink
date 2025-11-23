import React from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div>
        <div className="flex">
          <div className="w-[20%] h-screen bg-gray-600 fixed ">
            <div className="mt-20">
              <h1 className="text-white text-2xl font-bold ms-3">
                Welcome Satyam Thakur
              </h1>

              <div className="grid">
                <NavLink
                  to="/doctor/dashboard"
                  className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
                >
                  Dashboard
                </NavLink>
                <NavLink className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12">
                  Appointments
                </NavLink>
                <NavLink className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12">
                  Today Appointment
                </NavLink>
                <NavLink className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12">
                  Today Appointment
                </NavLink>
                <NavLink
                  to="/doctor/dashboard/details"
                  className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
                >
                  Details
                </NavLink>
              </div>
            </div>
          </div>
          <div className="ms-[20%] w-[80%]">
            <div className="mt-20 px-10">
              <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

              {/* Top Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-blue-500 text-white rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold">Total Patients</h2>
                  <p className="text-4xl font-bold mt-2">120</p>
                </div>

                <div className="p-6 bg-yellow-500 text-white rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold">
                    Pending Appointments
                  </h2>
                  <p className="text-4xl font-bold mt-2">08</p>
                </div>

                <div className="p-6 bg-green-500 text-white rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold">Completed Today</h2>
                  <p className="text-4xl font-bold mt-2">15</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Link className="p-5 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700"  to="/doctor/dashboard/notifications">
                  Notification
                </Link>
                <button className="p-5 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">
                  Schedule Appointment
                </button>
                
                <button className="p-5 bg-red-600 text-white rounded-xl shadow hover:bg-red-700">
                  Emergency Requests
                </button>
              </div>
              {/* Earnings / Revenue Summary */}
              <div className="bg-white rounded-xl shadow-md p-6 mt-10 mb-20">
                <h2 className="text-2xl font-semibold mb-4">
                  Earnings Summary
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-xl text-center bg-green-50">
                    <h3 className="font-semibold">Today</h3>
                    <p className="text-3xl font-bold text-green-600">₹4,500</p>
                  </div>

                  <div className="p-4 border rounded-xl text-center bg-blue-50">
                    <h3 className="font-semibold">This Week</h3>
                    <p className="text-3xl font-bold text-blue-600">₹25,000</p>
                  </div>

                  <div className="p-4 border rounded-xl text-center bg-yellow-50">
                    <h3 className="font-semibold">This Month</h3>
                    <p className="text-3xl font-bold text-yellow-600">
                      ₹92,000
                    </p>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
