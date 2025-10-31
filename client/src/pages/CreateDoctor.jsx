import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import authAxios from "../utils/authAxios";
import toast, { Toaster } from "react-hot-toast";

const CreateDoctor = () => {
  const navigate = useNavigate();
  const { authUser, fetchProfile } = useAuth();
  const [userData, setUserData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      setUserData({
        userName: authUser.userName || "",
        email: authUser.email || "",
        phoneNumber: authUser.phoneNumber || "",
        dob: authUser.dob || "",
        gender: authUser.gander||authUser.gender || "",
      });
    }
    
    console.log(authUser.gender )
    setAuthLoading(false);
  }, [authUser]);




  const handleSave = async ()=>{
    try {
      const formData = new FormData();
      formData.append("userName", userData.userName);
      formData.append("email", userData.email);
      formData.append("phoneNumber", userData.phoneNumber);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);



      const response = await authAxios.post("/doctor/createdoctor", formData);
      if (response.status === 201) {
        toast.success("Doctor registered successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Error for Register the Doctor", error);
      <Toaster position="top-center" reverseOrder={false} />


    }
  }

  return (
      
    
    <>
      <div className="flex justify-center">
         <Toaster position="top-center" reverseOrder={false} />
        <div className=" grid justify-center   mt-48 h-[550px] w-[40%] shadow-[0_0_25px_rgba(59,130,246,0.25)] border border-blue-100 rounded-2xl bg-white p-6">
          <div>
            <h1 className="text-3xl font-bold">Doctor Registration</h1>
          </div>
          <div className="">
            <div>
              <div className="grid">
                <label htmlFor="userName">User Name :-</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={userData?.userName || ""}
                  disabled={true}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div className="grid">
                <label htmlFor="email">Email :- </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData?.email || ""}
                 disabled={true}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div className="grid">
                <label htmlFor="phoneNumber">Phone Number :- </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userData?.phoneNumber || ""}
                  disabled={true}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div className="grid">
                <label htmlFor="dob">Date of Birth :- </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={userData?.dob || ""}
                  disabled={true}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div className="grid">
                <label htmlFor="gender">Gender :- </label>
                <input
                  type="text"
                  
                  name="gender"
                  value={userData?.gender || ""}
                  disabled={true}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div>
                <button
                  type="sumbit"
                  onClick={handleSave}
                  className="h-12 w-80 mx-auto bg-blue-500 rounded-xl font-medium text-2xl mt-6 hover:bg-amber-500 hover:text-white"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDoctor;
