import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'


const Dashboard = () => {
    const navigate = useNavigate();


    const handleClick = ()=>{
        navigate("/dashboard")
    }


  return (
    <>
        <div>
            <div className='flex'>
                <div className='w-[20%] h-screen bg-gray-600 fixed '>
                    <div className='mt-20'>
                        <h1 className='text-white text-2xl font-bold ms-3'>Welcome Satyam Thakur</h1>

                         <div className='grid'>
                            <NavLink className='text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12' onClick={handleClick} >Today Appointment</NavLink>
                         <NavLink className='text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12'  >Appointments</NavLink>
                         <NavLink className='text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12'  >Today Appointment</NavLink>
                         <NavLink className='text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12'  >Today Appointment</NavLink>
                         <NavLink to='/doctor/dashboard/details' className='text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12'  >Details</NavLink>
                         </div>
                        
                    </div>
                </div>
                <div className='ms-[20%] w-[80%]'>
                    <div className='mt-20'>
                        <h1 className='text-3xl ms-10 font-bold'>Doctor Dashboard</h1>
                        <div>
                            <h1>Today Appointment</h1>
                            <div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    
    </>
  )
}

export default Dashboard