import React from 'react'
import { NavLink } from 'react-router-dom'

const Chat = () => {

  const linkStyle =
    "text-white text-lg flex items-center h-12 w-full px-6 hover:bg-gray-700 transition";

  const activeStyle = "bg-gray-900";

  return (
    <div className='flex bg-gray-100 min-h-screen'>

      {/* Sidebar */}
      <div className='w-64 bg-gray-800 fixed h-full shadow-lg'>
        <div className='mt-10 px-6'>
          <h1 className='text-white text-2xl font-bold'>
            🏥 Hospital Panel
          </h1>

          <p className='text-gray-400 mt-2 text-sm'>
            Welcome Satyam
          </p>
        </div>

        <div className='mt-10 flex flex-col'>

          <NavLink to="/hospital/dashboard"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }>
            📊 Dashboard
          </NavLink>

          <NavLink to="/hospital/today"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }>
            📅 Today Appointment
          </NavLink>

          <NavLink to="/hospital/doctors"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }>
            👨‍⚕️ Doctors
          </NavLink>

          <NavLink to="/hospital/patients"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }>
            🧑 Patients
          </NavLink>

          <NavLink to="/hospital/emr"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }>
            📁 EMR
          </NavLink>

          <NavLink to="/hospital/ehr"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }>
            🗂 EHR
          </NavLink>

          <NavLink to="/hospital/chat"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }>
            💬 Chat
          </NavLink>

          <NavLink to="/hospital/details"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }>
            ⚙️ Details
          </NavLink>

        </div>
      </div>

      {/* Main Content */}
      <div className='ml-64 flex-1 p-10'>

        <h1 className='text-3xl font-bold'>
          Dashboard Overview
        </h1>

        {/* 🔥 Cards */}
        <div className='grid grid-cols-4 gap-6 mt-8'>

          <div className='bg-white p-6 rounded-xl shadow hover:shadow-md transition'>
            <p className='text-gray-500'>Total Doctors</p>
            <h2 className='text-2xl font-bold mt-2'>12</h2>
          </div>

          <div className='bg-white p-6 rounded-xl shadow hover:shadow-md transition'>
            <p className='text-gray-500'>Today Appointments</p>
            <h2 className='text-2xl font-bold mt-2'>8</h2>
          </div>

          <div className='bg-white p-6 rounded-xl shadow hover:shadow-md transition'>
            <p className='text-gray-500'>Total Patients</p>
            <h2 className='text-2xl font-bold mt-2'>45</h2>
          </div>

          <div className='bg-white p-6 rounded-xl shadow hover:shadow-md transition'>
            <p className='text-gray-500'>Revenue</p>
            <h2 className='text-2xl font-bold mt-2'>₹12,000</h2>
          </div>

        </div>

        {/* 🔥 Appointments Section */}
        <div className='mt-10 bg-white p-6 rounded-xl shadow'>
          <h2 className='text-xl font-semibold mb-4'>
            Today Appointments
          </h2>

          <div className='text-gray-500'>
            No appointments yet
          </div>
        </div>

      </div>

    </div>
  )
}

export default Chat