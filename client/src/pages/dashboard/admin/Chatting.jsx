import React from "react";
import { Link, NavLink } from "react-router-dom";

const Chatting = () => {
  // Example — replace with real data from API/state/props
  // const item = {
  //   prescriptionpdf: "https://example.com/prescription.pdf"
  // };

  return (
    <>
      <div className="w-full">
        <div>
          <div className="w-full md:w-[20%] h-auto md:h-screen bg-gray-800 md:fixed text-white">
            <div className="mt-20 ms-5">
              <h1 className="text-xl md:text-2xl font-bold text-white"></h1>

              <div className="grid mt-6 md:mt-10 space-y-3 md:space-y-4">
                <NavLink
                  to="/doctor/dashboard"
                  className="hover:bg-gray-700 p-3 rounded-xl text-lg"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/doctor/dashboard/appointment"
                  className="hover:bg-gray-700 p-3 rounded-xl text-lg"
                >
                  Appointments
                </NavLink>

                <NavLink className="hover:bg-gray-700 p-3 rounded-xl text-lg">
                  Today Appointment
                </NavLink>

                <NavLink
                  to="/doctor/dashboard/details"
                  className="hover:bg-gray-700 p-3 rounded-xl text-lg"
                >
                  Details
                </NavLink>
              </div>
            </div>
          </div>

          <div className="w-[90%]  ms-[10%] bg-gray-100 min-h-screen mt-6 ">
            <div className="w-[100%]">
              <div className="border bg-gray-500 p-4 w-[100%] rounded-lg fixed-top">
                <div className=" ms-[15%]">
                  <h1 className="text-3xl font-bold mb-6">Chatting</h1>
                </div>

                <div className="flex justify-between w-100% mb-6">
                  <div className="flex items-center space-x-4 ms-[20%]">
                    <img src="" alt="" />
                    <h1 className="text-3xl text-black font-bold hover:text-amber-500">
                      Username
                    </h1>

                    {/* 👇 Prescription PDF link */}
                    {/* {item.prescriptionpdf && (
                      <p className="mt-3">
                        <strong>Prescription report:</strong>{" "}
                        <a
                          href={item.prescriptionpdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline"
                        >
                          View Prescription
                        </a>
                      </p>
                    )} */}
                  </div>
                </div>
              </div>

              <div className="h-screen flex flex-col">
                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Chat messages */}
                </div>

                {/* Input bar */}
                <div className="border-t p-3 bg-white flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border rounded-lg px-3 py-2"
                    placeholder="Type a message..."
                  />

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
