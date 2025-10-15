import { NavLink } from "react-router-dom"
import React  from 'react'

const Navbar = () => {

    const userImage = "https://placehold.co/600x400?text=S";

  return (
    <>
        <nav className="flex justify-between bg-blue-500 h-16 fixed top-0 left-0 w-full z-50">
            <div className="mt-4 ms-32 ">
                <h1 className="text-3xl font-bold text-amber-800 text-shadow-black">Aarogya <span className="text-amber-600">Link</span></h1>
            </div>
            <div className="mt-5 flex gap-8 text-white ">
                <NavLink to='/' className={({isActive})=>(isActive?"text-amber-500 font-semibold text-[18px]" : "text-white text-[18px]")}>Home</NavLink>
                 <NavLink to='/doctorlist' className={({isActive})=>(isActive?"text-amber-500 font-semibold text-[18px]" : "text-white text-[18px]")}>Doctors</NavLink>
                <NavLink to='/contact' className={({isActive})=>(isActive?"text-amber-500 font-semibold text-[18px]" : "text-white text-[18px]")}>Contact</NavLink>
                <NavLink to='/about' className={({isActive})=>(isActive?"text-amber-500 font-semibold text-[18px]" : "text-white text-[18px]")}>About</NavLink>
            </div>
            <div className="mt-5 mr-32 flex gap-8 text-white ">
                <NavLink to='/login' className={({isActive})=>(isActive?"text-amber-500 text-[18px] font-semibold" : "text-white text-[18px]")}>Login</NavLink>
                <NavLink to='/register' className={({isActive})=>(isActive?"text-amber-500 text-[18px] font-semibold" : "text-white text-[18px]")}>Register</NavLink>
                <div className="h-14 w-14 rounded-4xl -mt-1.5">
                    <img src={userImage} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer"/>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar