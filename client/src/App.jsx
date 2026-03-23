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
import HospitalDashboard from "./pages/dashboard/admin/Dashboard";
import Appointments from "./pages/Appoinment";
import DoctorNotification from "./pages/dashboard/doctor/Notifiation";
import Prescription from "./pages/dashboard/doctor/Prescription";
import EMR from "./pages/dashboard/admin/EMR";
import ForgotPassword from "./components/ForgetPassword";
import Chatting from "./pages/dashboard/admin/Chatting";

import DoctorRoute from "./components/DoctorRoute";
import Unauthorized from "./components/Unauthorized";
import Preception from "./pages/Preception";
import ChatBot from "./components/ChatBot";
import ChatIcon from "./components/ChatIcon";
function App() {
  return (
    <BrowserRouter>
    <ChatIcon />
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <Routes>
        <Route path="/unauthorized" element={<Unauthorized />} />

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
         <Route path="/login/forgetpassword" element={<ForgotPassword />} />
         <Route path="/user/preception" element={<Preception />} />

        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={<DoctorRoute><Dashboard /></DoctorRoute>} />
        <Route path="/doctor/dashboard/details" element={<DoctorRoute><DoctorDetails /></DoctorRoute>} />
        <Route path="/doctor/dashboard/appointment" element={<DoctorRoute><Appointment /></DoctorRoute>} />
        <Route
          path="/doctor/dashboard/notifications"
          element={<DoctorRoute><DoctorNotification /></DoctorRoute>} />
        
        <Route
          path="/doctor/dashboard/appointment/prescription/:patientID"
          element={<Prescription />}
        />

        {/* Admin Routes */}
        <Route path="/dashboard/emr" element={<EMR />} />

        {/* Hospital Routes */}
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
        <Route path="/dashboard/emr/chatting" element={<Chatting />} />

        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
