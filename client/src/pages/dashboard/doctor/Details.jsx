import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../../../contexts/authContext";
import authAxios from "../../../utils/authAxios";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { authUser, fetchProfile } = useAuth();
  const [userData, setUserData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState("");

  const doctorPic = preview || `https://placehold.co/600x400?text=S`;

  // Load Auth User Data Initially
  useEffect(() => {
    if (authUser) {
      setUserData({
        userName: authUser.userName || "",
        email: authUser.email || "",
        phoneNumber: authUser.phoneNumber || "",
        dob: authUser.dob?.slice(0, 10) || "",
        gender: authUser.gender || "",
        hospitalID: authUser.hospitalID || "",
        specialization: "",
        experience: "",
        consultationFee: "",
        description: "",
        holidays: "",
        startTime: "",
        endTime: "",
      });
      if (authUser.profilePic) setPreview(authUser.profilePic);
    }
    setAuthLoading(false);
  }, [authUser]);

  // Fetch Doctor Profile From Backend
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const res = await authAxios.get("/doctor/details");
        console.log("Fetched doctor details:", res.data.data);
        if (res.data?.data) {
          setUserData((prev) => ({
            ...prev,
            ...res.data.data,
          }));
          if (res.data.data.profilePic) {
            setPreview(res.data.data.profilePic);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    };
    fetchDoctorProfile();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setUserData((prev) => {
        const currentHolidays = prev.holidays ? prev.holidays.split(",") : [];
        const updatedHolidays = checked
          ? [...currentHolidays, value]
          : currentHolidays.filter((day) => day !== value);
        return { ...prev, holidays: updatedHolidays.join(",") };
      });
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Save Button (Update Doctor Details + Image)
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", userData.userName);
      formData.append("email", userData.email);
      formData.append("phoneNumber", userData.phoneNumber);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append(
        "hospitalID",
        userData.hospitalID || selectedHospital || ""
      );
      formData.append("doctorID", userData._id || "");
      formData.append("specialization", userData.specialization || "");
      formData.append("experience", userData.experience || "");
      formData.append("consultationFee", userData.consultationFee || "");
      formData.append("description", userData.description || "");
      formData.append("holidays", userData.holidays || "");
      formData.append("startTime", userData.startTime || "");
      formData.append("endTime", userData.endTime || "");

      // Attach Image File (if selected)
      if (photoFile) {
        formData.append("profilePic", photoFile);
      }

      // Send Request to Backend
      const res = await authAxios.put("/doctor/details/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("res.data.updatedUser ",res.data.data);

      if (res.data?.data) {
        setUserData(res.data?.data);
        setPreview(res.data?.data.profilePic || "");
        setPhotoFile(null);
        setIsEditing(false);
        console.log(isEditing);
        await fetchProfile();
        toast.success("Doctor Detail updated successfully", {
          duration: 1500,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error updating Doctor Detail:", error);
      toast.error("Error updating Doctor Detail");
    }
  };

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex">
          {/* 🔹 Sidebar */}
          <div className="w-[20%] h-screen bg-gray-600 fixed ">
            <div className="mt-20">
              <h1 className="text-white text-2xl font-bold ms-3">
                Welcome {authUser?.userName || "Doctor"}
              </h1>
              <div className="grid">
                <NavLink
                  className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
                  to='/doctor/dashboard'
                >
                  Dashboard
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
              <div className="flex justify-between items-center w-full -mb-14 mt-1 relative">
                <div className="flex -ms-15 mt-5  w-[100%] absolute z-20">
                  <div className="flex ">
                    <span className="text-2xl font-semibold flex mx-30 text-gray-600 hover:text-blue-500 whitespace-nowrap">
                      Doctor ID : {userData?.doctorID || ""}
                    </span>
                  </div>
                  <div className="-ms-5">
                    <span className="text-2xl font-semibold text-gray-600 hover:text-blue-500 whitespace-nowrap">
                    Hospital ID : {userData?.hospitalID || ""}
                  </span>
                  </div>
                </div>
                <div className="ms-[950px] -mt-7">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="ms-[15%] mt-10 h-11 w-40 rounded-xl bg-blue-500 hover:bg-amber-500 hover:text-white text-2xl"
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="ms-[15%] mt-10 h-11 w-40 rounded-xl bg-green-500 hover:bg-amber-500 hover:text-white text-2xl"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>

              <div className=" mt-15 ">
                <div className="flex">
                  <div className="grid w-84">
                    {/* 🔹 Profile Picture */}
                    <div className="h-[300px] w-[300px] border rounded-full mt-20 ms-10 object-fill relative">
                      <img
                        src={preview || doctorPic}
                        alt="Doctor Profile"
                        className="h-[298px] w-[300px] border rounded-full object-cover"
                      />
                      <input
                        type="file"
                        id="profilePicInput"
                        accept="image/*"
                        className="hidden"
                        disabled={true}
                        
                      />
                      <label
                        htmlFor="profilePicInput"
                        className="h-10 w-10 rounded-full border-2 ms-64 -mt-22 flex justify-center items-center bg-blue-50 hover:bg-amber-50 absolute z-20 cursor-pointer"
                      >
                        <FaCamera className="text-xl text-blue-500 hover:text-amber-500" />
                      </label>
                    </div>

                    {/* 🔹 Basic Info */}
                    <div className="ms-11 ">
                      <div className="grid my-5">
                        <label>User Name :-</label>
                        <input
                          type="text"
                          name="userName"
                          value={userData?.userName || ""}
                          disabled={true}
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div className="grid my-5">
                        <label>Email :-</label>
                        <input
                          type="email"
                          name="email"
                          value={userData?.email || ""}
                          disabled={true}
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div className="grid my-5">
                        <label>Phone Number :-</label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={userData?.phoneNumber || ""}
                          disabled={true}
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 🔹 Additional Details */}
                  <div className="flex mt-16 ">
                    <div className="ms-20 w-84 mt-5">
                      <div className="grid my-5">
                        <label>Date of Birth :-</label>
                        <input
                          type="date"
                          name="dob"
                          value={userData?.dob || ""}
                          disabled={true}
                          onChange={handleChange}
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div className="grid my-5">
                        <label>Gender :-</label>
                        <input
                          type="text"
                          name="gender"
                          value={userData?.gender || ""}
                          disabled={true}
                          onChange={handleChange}
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>

                      {/* 🔹 Holidays */}
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
                              className="flex items-center gap-2 border border-gray-300 rounded-2xl p-3 cursor-pointer hover:bg-gray-50 transition"
                            >
                              <input
                                type="checkbox"
                                name="holidays"
                                value={day}
                                checked={
                                  userData?.holidays
                                    ?.split(",")
                                    .includes(day) || false
                                }
                                disabled={!isEditing}
                                onChange={handleChange}
                                className="accent-amber-500 w-4 h-4"
                              />
                              <span className="text-gray-700 font-medium">
                                {day}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* 🔹 Doctor Timings */}
                      <div className="w-full mb-4">
                        <label>Doctor Timing :- </label>
                        <div className="flex flex-col md:flex-row gap-3">
                          <input
                            type="time"
                            name="startTime"
                            value={userData?.startTime || ""}
                            disabled={!isEditing}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-2xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                          <span className="text-gray-500 flex items-center justify-center">
                            to
                          </span>
                          <input
                            type="time"
                            name="endTime"
                            value={userData?.endTime || ""}
                            disabled={!isEditing}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-2xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 🔹 Right Column */}
                    <div className="ms-20 mt-5 w-84">
                      <div className="grid my-5">
                        <label>Specialization :-</label>
                        <input
                          type="text"
                          name="specialization"
                          value={userData?.specialization || ""}
                          disabled={!isEditing}
                          onChange={handleChange}
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div className="grid my-5">
                        <label>Experience :-</label>
                        <input
                          type="text"
                          name="experience"
                          value={userData?.experience || ""}
                          disabled={!isEditing}
                          onChange={handleChange}
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>

                      <div className="grid my-5">
                        <label>Consultation Fee :-</label>
                        <input
                          type="text"
                          name="consultationFee"
                          value={userData?.consultationFee || ""}
                          disabled={!isEditing}
                          onChange={handleChange}
                          className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>

                      <div className="w-full mb-4">
                        <label htmlFor="description">Description :-</label>
                        <textarea
                          id="description"
                          name="description"
                          value={userData?.description || ""}
                          disabled={!isEditing}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
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
