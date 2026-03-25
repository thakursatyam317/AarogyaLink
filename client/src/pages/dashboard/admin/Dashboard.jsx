import React from 'react'
import { NavLink } from 'react-router-dom'

const HospitalDashboard = () => {

  const linkStyle =
    "text-white text-lg hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-xl ms-5 mt-4 flex items-center ps-4 transition";

  const activeStyle = "bg-gray-800";

  return (
    <div className='flex'>
      
      {/* Sidebar */}
      <div className='w-64 h-screen bg-gray-600 fixed'>
        <div className='mt-20'>
          
          <h1 className='text-white text-2xl font-bold ms-5'>
            Welcome Satyam
          </h1>

          <div className='flex flex-col mt-6'>

            <NavLink
              to="/hospital/dashboard"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/hospital/today"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Today Appointment
            </NavLink>

            <NavLink
              to="/hospital/appointments"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Appointment
            </NavLink>

            <NavLink
              to="/hospital/doctors"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Doctors
            </NavLink>

            <NavLink
              to="/hospital/emr"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ""}`
              }
            >
              EMR
            </NavLink>

            <NavLink
              to="/hospital/ehr"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ""}`
              }
            >
              EHR
            </NavLink>

            <NavLink
              to="/hospital/list"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Hospitals
            </NavLink>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='ml-64 w-full'>
        <div className='mt-20 px-10'>
          
          <h1 className='text-3xl font-bold'>
            Hospital Dashboard
          </h1>

          <div className='mt-6'>
            <h2 className='text-xl font-semibold'>
              Today Appointment
            </h2>

            {/* Future dynamic data */}
            <div className='mt-4 p-4 bg-gray-100 rounded-lg'>
              <p>No appointments yet</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default HospitalDashboard;