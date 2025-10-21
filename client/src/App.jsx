import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/profile"
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/dashboard/doctor/Dashboard"
import Doctors from "./pages/Doctors"


function App() {
  

  return (
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/doctorlist" element={<Doctors/>}/>

        <Route path="/doctor/dashboard" element={<Dashboard/>}/>


      </Routes>
    </BrowserRouter>
   
  )
}

export default App
