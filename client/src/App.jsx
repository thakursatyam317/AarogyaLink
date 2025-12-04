import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/dashboard/doctor/Dashboard";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/dashboard/doctor/Details";
import Appointment from "./pages/dashboard/doctor/Appointment";
import CreateDoctor from "./pages/CreateDoctor";
import DoctorDetailComplete from "./pages/DoctorDetailComplete";
import HospitalDashboard from './pages/dashboard/admin/Dashboard'
import Appointments from "./pages/Appoinment";
import DoctorNotification from "./pages/dashboard/doctor/Notifiation";
import Prescription from "./pages/dashboard/doctor/Prescription";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctorlist" element={<Doctors />} />
        <Route path="/doctorregisteration" element={<CreateDoctor />} />
        <Route path="/doctor/:id" element={<DoctorDetailComplete />} />
        <Route path="/appointments" element={<Appointments />} />

        <Route path="/doctor/dashboard" element={<Dashboard />} />
        <Route path="/doctor/dashboard/details" element={<DoctorDetails />} />
        <Route path="/doctor/dashboard/appointment" element={<Appointment />} />
        <Route path="/doctor/dashboard/notifications" element={<DoctorNotification />} />
        <Route path="/doctor/dashboard/appointment/prescription/:id" element={<Prescription />} />




          {/* hospital */}
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
