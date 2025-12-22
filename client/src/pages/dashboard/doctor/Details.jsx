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
      console.log("res.data.updatedUser ", res.data.data);

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

        <div className="flex flex-col md:flex-row">
          {/* 🔹 Sidebar */}
          <div className="w-full md:w-[20%] md:h-screen bg-gray-600 md:fixed">
            <div className="mt-20 px-4">
              <h1 className="text-white text-xl md:text-2xl font-bold">
                Welcome {authUser?.userName || "Doctor"}
              </h1>

              <div className="grid mt-6">
                <NavLink
                  className="text-white text-lg md:text-xl hover:text-gray-300 h-12 w-full md:w-60 hover:bg-gray-700 rounded-2xl mt-4 px-4 flex items-center"
                  to="/doctor/dashboard"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  className="text-white text-lg md:text-xl hover:text-gray-300 h-12 w-full md:w-60 hover:bg-gray-700 rounded-2xl mt-4 px-4 flex items-center"
                  to="/doctor/dashboard/appointment"
                >
                  Appointments
                </NavLink>

                <NavLink className="text-white text-lg md:text-xl hover:text-gray-300 h-12 w-full md:w-60 hover:bg-gray-700 rounded-2xl mt-4 px-4 flex items-center">
                  Today Appointment
                </NavLink>

                <NavLink
                  to="/doctor/dashboard/details"
                  className="text-white text-lg md:text-xl hover:text-gray-300 h-12 w-full md:w-60 hover:bg-gray-700 rounded-2xl mt-4 px-4 flex items-center"
                >
                  Details
                </NavLink>
              </div>
            </div>
          </div>

          {/* 🔹 Main Content */}
          <div className="w-full md:ms-[20%] md:w-[80%] px-4">
            <div className="mt-24">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Doctor Dashboard
              </h1>

              {/* Doctor + Hospital ID */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <span className="text-lg md:text-2xl font-semibold text-gray-600">
                  Doctor ID : {userData?.doctorID || ""}
                </span>
                <span className="text-lg md:text-2xl font-semibold text-gray-600">
                  Hospital ID : {userData?.hospitalID || ""}
                </span>
              </div>

              {/* Edit / Save Button */}
              <div className="flex justify-end mb-6">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="h-11 w-36 rounded-xl bg-blue-500 hover:bg-amber-500 hover:text-white text-lg"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="h-11 w-36 rounded-xl bg-green-500 hover:bg-amber-500 hover:text-white text-lg"
                  >
                    Save
                  </button>
                )}
              </div>

              {/* Profile + Details */}
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Profile */}
                <div className="flex flex-col items-center">
                  <div className="h-[250px] w-[250px] border rounded-full relative">
                    <img
                      src={preview || doctorPic}
                      alt="Doctor Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                    <label className="h-10 w-10 rounded-full border absolute bottom-4 right-4 flex justify-center items-center bg-blue-50">
                      <FaCamera className="text-blue-500" />
                    </label>
                  </div>
                </div>

                {/* Details (UNCHANGED CONTENT INSIDE) */}
                <div className="mt-15">
                  <div className="flex flex-col lg:flex-row gap-10">
                    {/* LEFT COLUMN — SAME CONTENT */}
                    <div className="grid w-full lg:w-84">
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
                      <div className="ms-11">
                        <div className="grid my-5">
                          <label>User Name :-</label>
                          <input
                            type="text"
                            name="userName"
                            value={userData?.userName || ""}
                            disabled={true}
                            className="h-9 border border-gray-300 rounded-lg p-2 w-full"
                          />
                        </div>

                        <div className="grid my-5">
                          <label>Email :-</label>
                          <input
                            type="email"
                            name="email"
                            value={userData?.email || ""}
                            disabled={true}
                            className="h-9 border border-gray-300 rounded-lg p-2 w-full"
                          />
                        </div>

                        <div className="grid my-5">
                          <label>Phone Number :-</label>
                          <input
                            type="text"
                            name="phoneNumber"
                            value={userData?.phoneNumber || ""}
                            disabled={true}
                            className="h-9 border border-gray-300 rounded-lg p-2 w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN — SAME CONTENT */}
                    <div className="flex flex-col lg:flex-row gap-10 w-full">
                      {/* ADDITIONAL DETAILS */}
                      <div className="w-full lg:w-84 mt-5">
                        <div className="grid my-5">
                          <label>Date of Birth :-</label>
                          <input
                            type="date"
                            name="dob"
                            value={userData?.dob || ""}
                            disabled={true}
                            className="h-9 border border-gray-300 rounded-lg p-2 w-full"
                          />
                        </div>

                        <div className="grid my-5">
                          <label>Gender :-</label>
                          <input
                            type="text"
                            name="gender"
                            value={userData?.gender || ""}
                            disabled={true}
                            className="h-9 border border-gray-300 rounded-lg p-2 w-full"
                          />
                        </div>

                        {/* HOLIDAYS */}
                        <div className="w-full mb-6">
                          <label>Select Holidays :- </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                className="flex items-center gap-2 border rounded-2xl p-3"
                              >
                                <input
                                  type="checkbox"
                                  value={day}
                                  checked={
                                    userData?.holidays
                                      ?.split(",")
                                      .includes(day) || false
                                  }
                                  disabled={!isEditing}
                                  className="accent-amber-500"
                                />
                                <span>{day}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* TIMINGS */}
                        <div className="flex flex-col md:flex-row gap-3">
                          <input
                            type="time"
                            name="startTime"
                            value={userData?.startTime || ""}
                            disabled={!isEditing}
                            className="border rounded-2xl p-2 w-full"
                          />
                          <input
                            type="time"
                            name="endTime"
                            value={userData?.endTime || ""}
                            disabled={!isEditing}
                            className="border rounded-2xl p-2 w-full"
                          />
                        </div>
                      </div>

                      {/* RIGHT MOST COLUMN */}
                      <div className="w-full lg:w-84 mt-5">
                        <div className="grid my-5">
                          <label>Specialization :-</label>
                          <input
                            type="text"
                            name="specialization"
                            value={userData?.specialization || ""}
                            disabled={!isEditing}
                            className="h-9 border rounded-lg p-2 w-full"
                          />
                        </div>

                        <div className="grid my-5">
                          <label>Experience :-</label>
                          <input
                            type="text"
                            name="experience"
                            value={userData?.experience || ""}
                            disabled={!isEditing}
                            className="h-9 border rounded-lg p-2 w-full"
                          />
                        </div>

                        <div className="grid my-5">
                          <label>Consultation Fee :-</label>
                          <input
                            type="text"
                            name="consultationFee"
                            value={userData?.consultationFee || ""}
                            disabled={!isEditing}
                            className="h-9 border rounded-lg p-2 w-full"
                          />
                        </div>

                        <textarea
                          name="description"
                          value={userData?.description || ""}
                          disabled={!isEditing}
                          className="w-full p-3 border rounded-2xl"
                        />
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
