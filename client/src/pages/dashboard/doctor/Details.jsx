import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaCamera } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  const doctorPic = `https://placehold.co/600x400?text=S`;

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
                  className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
                  onClick={handleClick}
                >
                  Today Appointment
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
            <div className="mt-20 w-84">
              <h1 className="text-3xl ms-10 font-bold">Doctor Dashboard</h1>
              <div className="flex justify-between items-center -mb-2 w-full mt-5">
                <div className="flex justify-center w-96 ">
                  <div>
                    <span className="text-2xl font-semibold flex  mx-30 text-gray-600 hover:text-blue-500">
                      Doctor ID :
                    </span>
                  </div>
                  <span className="text-2xl font-semibold text-gray-600 hover:text-blue-500">
                    Hospital ID :
                  </span>
                </div>

                <div className="ms-[600px]">
                  <button className="h-11 w-40 rounded-xl bg-blue-500 hover:bg-amber-500 hover:text-white text-xl font-semibold transition">
                    Edit
                  </button>
                </div>
              </div>
              <div>
                <div className="flex">
                  <div className="grid w-84">
                    <div className="h-[300px] w-[300px] border rounded-full mt-20 ms-10 object-fill relative">
                      <img
                        src={doctorPic}
                        alt=""
                        className="h-[298px] w-[300px] border rounded-full object-fill"
                      />
                      <div className="h-10 w-10 rounded-full border-2 ms-64 -mt-22 flex justify-center bg-blue-50 hover:bg-amber-50 absolute z-20">
                        <FaCamera className=" group-hover:text-white text-xl text-blue-500 hover:text-amber-500 mt-1.5 ms-1.2" />
                        {/* {isEditing && (
                                      <>
                                        <FaCamera className=" group-hover:text-white text-xl text-blue-500 hover:text-amber-500 mt-1.5 ms-1.2" />
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="absolute h-full w-full opacity-0 cursor-pointer"
                                          onChange={handlePhotoChange}
                                        />
                                      </>
                        )} */}
                      </div>
                    </div>
                    <div className="ms-11 ">
                      <div className="grid   my-5">
                        <label htmlFor="">User Name :-</label>
                        <input
                          type="text"
                          name="userName"
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div className="grid my-5">
                        <label htmlFor="">Email :-</label>
                        <input
                          type="email"
                          name="email"
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div className="grid my-5">
                        <label htmlFor="">Phone Number :-</label>
                        <input
                          type="text"
                          name="phoneNumber"
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-16 ">
                    <div className="ms-20 w-84 mt-5">
                      <div className="grid my-5">
                        <label htmlFor="">Date of Birth :-</label>
                        <input
                          type="date"
                          name="dob"
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div className="grid my-5">
                        <label htmlFor="">Gender :-</label>
                        <input
                          type="text"
                          name="gender"
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div className="w-full mb-6">
                        <label>Select Holidays :- </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 ">
                          {[
                            "Sunday",
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                          ].map((day) => (
                            <label
                              key={day}
                              className="flex items-center gap-2 border border-gray-300 rounded-2xl p-3 cursor-pointer hover:bg-gray-50 transition "
                            >
                              <input
                                type="checkbox"
                                name="holidays"
                                value={day}
                                className="accent-amber-500 w-4 h-4 "
                              />
                              <span className="text-gray-700 font-medium ">
                                {day}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="w-full mb-4">
                        <label>Doctor Timing :- </label>
                        <div className="flex flex-col md:flex-row gap-3">
                          <input
                            type="time"
                            name="startTime"
                            className="border border-gray-300 rounded-2xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                          <span className="text-gray-500 flex items-center justify-center">
                            to
                          </span>
                          <input
                            type="time"
                            name="endTime"
                            className="border border-gray-300 rounded-2xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="ms-20 mt-5 w-84">
                      <div className="grid my-5">
                        <label htmlFor="">Specialization :-</label>
                        <input
                          type="text"
                          name="specialization"
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div className="grid my-5">
                        <label htmlFor="">Experience :-</label>
                        <input
                          type="text"
                          name="experience"
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>

                      <div className="grid my-5">
                        <label htmlFor="">Consultation Fee :-</label>
                        <input
                          type="text"
                          name="consultationFee"
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div className="w-full mb-4">
                        <label htmlFor="description">Description :-</label>
                        <textarea
                          id="description"
                          name="description"
                          className="w-full p-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent  transition duration-200"
                        ></textarea>
                      </div>
                    </div>
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
