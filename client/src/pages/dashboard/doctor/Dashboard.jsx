import React, { use } from "react";
import {
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  IndianRupee,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/authContext";
import authAxios from "../../../utils/authAxios";

const Dashboard = () => {
  const { user } = useAuth();
  const [counter, setCounter] = useState(0);
  const [todayTotalPatients, setTodayTotalPatients] = useState(0);
  const [todayCompletedPatients, setTodayCompletedPatients] = useState(0);
  const [todayRemainingPatients, setTodayRemainingPatients] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [allTodayAppointments, setAllTodayAppointments] = useState([]);

  const dashboardData = {
    totalPayment: 150000,
    totalRevenue: 95000,
    totalPatients: 320,
    todayPatients: 25,
    completedToday: 18,
    remainingToday: 7,
  };

  useEffect(() => {
    try {
      const featchTodayAppointments = async () => {
        const response = await authAxios.get(
          "/doctordashboard/todayappointments",
        );

        console.log("Response Data:--- ", response.data);
        setTodayTotalPatients(
          response.data.data.todayAppointments[0]?.count || 0,
        );
        setTodayCompletedPatients(
          response.data.data.completedTodayAppointments[0]?.count || 0,
        );
        setTodayRemainingPatients(
          response.data.data.todayRemainingAppointments[0]?.count || 0,
        );
        console.log("Today's Appointments Count:", todayTotalPatients);
      };
      featchTodayAppointments();
    } catch (error) {
      console.error("Error fetching today's appointments count:", error);
    }
  }, [todayTotalPatients]);

  useEffect(() => {
    try {
      const featchCount = async () => {
        const response = await authAxios.get("/doctordashboard/notifications");

        console.log("Response Data:- ", response.data);
        setCounter(response.data.data?.count[0].count || 0);
        console.log("Notifications Count:", counter);
      };
      featchCount();
    } catch (error) {
      console.error("Error fetching notifications count:", error);
    }
  }, [counter]);

  useEffect(() => {
    try {
      const fetchPaymentOrRevenue = async () => {
        const response = await authAxios.get(
          "/doctordashboard/paymentOrRevenue",
        );

        console.log("Response Data:--- ", response.data);
        setTotalPayment(response.data.data.totalPayment || 0);
        setTotalRevenue(response.data.data.totalRevenue || 0);
      };
      fetchPaymentOrRevenue();
    } catch (error) {}
  }, [totalPayment, totalRevenue]);

  useEffect(() => {
    const fetchAllTodayAppointments = async () => {
      try {
        const response = await authAxios.get(
          "/doctordashboard/alltodayappointments",
        );

        console.log("Response Data:---: ", response.data);
        setAllTodayAppointments(response.data.data || []);
      } catch (error) {
        console.error("Error fetching all today's appointments:", error);
      }
    };

    fetchAllTodayAppointments();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[20%] bg-gray-800 text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">Doctor Panel</h1>

        <div className="space-y-4">
          <NavLink
            to="/doctor/dashboard"
            className="block hover:bg-gray-700 p-3 rounded-xl"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/doctor/dashboard/appointment"
            className="block hover:bg-gray-700 p-3 rounded-xl"
          >
            Appointments
          </NavLink>

          <NavLink
            to="/doctor/dashboard/today"
            className="block hover:bg-gray-700 p-3 rounded-xl"
          >
            Today Appointment
          </NavLink>

          <NavLink
            to="/doctor/dashboard/details"
            className="block hover:bg-gray-700 p-3 rounded-xl"
          >
            Details
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">
          Doctor Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            title="Total Payment"
            value={`₹${totalPayment}`}
            icon={<IndianRupee />}
          />
          <Card
            title="Total Revenue (Profit)"
            value={`₹${totalRevenue}`}
            icon={<IndianRupee />}
          />
          <Card
            title="Total Patients"
            value={todayTotalPatients}
            icon={<Users />}
          />
          <Card
            title="Today Patients"
            value={todayTotalPatients}
            icon={<Users />}
          />
          <Card
            title="Completed Today"
            value={todayCompletedPatients}
            icon={<CheckCircle />}
          />
          <Card
            title="Remaining Today"
            value={todayRemainingPatients}
            icon={<Clock />}
          />
          <NavLink to="/doctor/dashboard/notifications" className="relative">
            {counter > 0 && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
            )}

            <Card title="New Notifications" value={counter} icon={<Clock />} />
          </NavLink>
        </div>

        {/* Today Patient Table */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Today's Patients</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">ID</th>
                <th className="py-2">Patient Name</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {allTodayAppointments.map((patient) => (
                <tr
                  key={patient.patientId}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-2">{patient.patientId}</td>
                  <td className="py-2">{patient.name}</td> {/* ✅ fixed */}
                  <td
                    className={`py-2 font-semibold ${
                      patient.status === "completed"
                        ? "text-green-600"
                        : patient.status === "accepted"
                          ? "text-blue-600"
                          : patient.status === "scheduled" ||
                              patient.status === "remaining"
                            ? "text-yellow-500"
                            : "text-red-500"
                    }`}
                  >
                    {patient.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-gray-700">{value}</p>
      </div>
      <div className="text-blue-500">{icon}</div>
    </div>
  );
};

export default Dashboard;
