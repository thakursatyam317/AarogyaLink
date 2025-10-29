import React from "react";

const CreateDoctor = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className=" grid justify-center   mt-48 h-[550px] w-[40%] shadow-[0_0_25px_rgba(59,130,246,0.25)] border border-blue-100 rounded-2xl bg-white p-6">
          <div>
            <h1 className="text-3xl font-bold">Doctor Registration</h1>
          </div>
          <div className="">
            <form>
              <div className="grid">
                <label htmlFor="userName">User Name :-</label>
                <input type="text" id="userName" name="userName" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"/>
              </div>
              <div className="grid">
                <label htmlFor="email">Email :- </label>
                <input type="email" id="email" name="fullName"  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"/>
              </div>
              <div className="grid">
                <label htmlFor="phoneNumber">Phone Number :- </label>
                <input type="text" id="phoneNumber" name="phoneNumber" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"/>
              </div>
              <div className="grid">
                <label htmlFor="dob">Date of Birth :- </label>
                <input type="date" id="dob" name="dob" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"/>
              </div>
              <div className="grid">
                <label htmlFor="gander">Gander :- </label>
                <input type="text" id="gander" name="gander"  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"/>
              </div>
              <div>
                 <button
                    type="sumbit"
                    className="h-12 w-80 mx-auto bg-blue-500 rounded-xl font-medium text-2xl mt-6 hover:bg-amber-500 hover:text-white"
                  >
                    Register
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDoctor;
