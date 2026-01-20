import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../../../contexts/authContext";
import authAxios from "../../../utils/authAxios";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const { authUser, fetchProfile } = useAuth();

  const [userData, setUserData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");

  const doctorPic = preview || `https://placehold.co/300x300?text=Doctor`;

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
  }, [authUser]);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const res = await authAxios.get("/doctor/details");
        if (res.data?.data) {
          setUserData((p) => ({ ...p, ...res.data.data }));
          if (res.data.data.profilePic) setPreview(res.data.data.profilePic);
        }
      } catch {}
    };
    fetchDoctorProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const list = userData?.holidays ? userData.holidays.split(",") : [];
      const updated = checked
        ? [...list, value]
        : list.filter((d) => d !== value);

      setUserData((p) => ({ ...p, holidays: updated.join(",") }));
      return;
    }

    setUserData((p) => ({ ...p, [name]: value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([k, v]) => formData.append(k, v ?? ""));
      if (photoFile) formData.append("profilePic", photoFile);

      const res = await authAxios.put("/doctor/details/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);

      if (res.data?.data) {
        setUserData(res.data.data);
        setPreview(res.data.data.profilePic || "");
        setIsEditing(false);
        setPhotoFile(null);
        await fetchProfile();
        toast.success("Doctor details updated");
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-indigo-100 via-white to-white">
      <Toaster />

      {/* Sidebar */}
      <div className="w-full md:w-[20%] h-auto md:h-screen bg-gray-800 md:fixed text-white">
                <div className="mt-20 ms-5">
                  <h1 className="text-xl md:text-2xl font-bold">
                    Welcome {authUser.userName}
                  </h1>
      
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

      {/* MAIN */}
      <main className="w-full md:ms-[20%] md:w-[80%] px-6 mt-20 pb-12">
        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center border ">
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow"
            >
              Save
            </button>
          )}
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-7 mt-3">
          {/* PROFILE CARD */}
          <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg border p-6 flex flex-col items-center transition hover:shadow-xl">
            <div className="h-44 w-44 rounded-full overflow-hidden relative shadow ">
              <img src={doctorPic} className="h-full w-full object-cover" />

              {isEditing && (
                <>
                  <input
                    type="file"
                    id="profilePicInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhoto}
                  />
                  <label
                    htmlFor="profilePicInput"
                    className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer"
                  >
                    <FaCamera className="text-indigo-500" />
                  </label>
                </>
              )}
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-center hover:text-amber-500">
              {userData?.userName}
            </h2>

            <p className="text-gray-500 text-xl">{userData?.email}</p>

            <div className="mt-5 w-full text-sm">
              <div className="flex justify-between text-gray-600 text-xl">
                <span>Doctor ID</span>
                <span className="font-semibold">
                  {userData?.doctorID || "-"}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 mt-4 text-xl">
                <span>Hospital ID</span>
                <span className="font-semibold">
                  {userData?.hospitalID || "-"}
                </span>
              </div>
              <div>
                <div className="flex justify-between text-gray-600 mt-4 text-xl">
                  <span>Phone Number</span>
                  <span className="font-semibold ">
                    {userData?.phoneNumber || "-"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-gray-600 mt-4 text-xl">
                <span>Date of Birth</span>
                <span className="font-semibold">{userData?.dob || "-"}</span>
              </div>
              <div className="flex justify-between text-gray-600 mt-4 text-xl">
                <span>Gender</span>
                <span className="font-semibold">{userData?.gender || "-"}</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-7">
            {/* AVAILABILITY */}
            <div className="bg-white rounded-2xl shadow border p-6">
              <h3 className="text-lg font-semibold mb-4">Availability</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((d) => (
                  <label
                    key={d}
                    className="flex gap-2 items-center text-sm border rounded-xl p-2 hover:shadow cursor-pointer hover:shadow-indigo-200"
                  >
                    <input
                      type="checkbox"
                      value={d}
                      disabled={!isEditing}
                      checked={userData?.holidays?.split(",").includes(d)}
                      onChange={handleChange}
                      className="accent-indigo-600"
                    />
                    {d}
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-4">
                <div>
                  <label htmlFor="">Starting Time</label>
                  <input
                    type="time"
                    name="startTime"
                    disabled={!isEditing}
                    value={userData?.startTime || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-2"
                  />
                </div>

                <div>
                  <label htmlFor="">Ending Time</label>
                  <input
                    type="time"
                    name="endTime"
                    disabled={!isEditing}
                    value={userData?.endTime || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-2"
                  />
                </div>
              </div>
            </div>

            {/* PROFESSIONAL */}
            <div className="bg-white rounded-2xl shadow border p-6">
              <h3 className="text-lg font-semibold mb-4">
                Professional Details
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="">Specialization</label>
                  <input
                    disabled={!isEditing}
                    name="specialization"
                    value={userData?.specialization || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-2"
                    placeholder="Specialization"
                  />
                </div>
                <div>
                  <label htmlFor="">Experience</label>
                  <input
                    disabled={!isEditing}
                    name="experience"
                    value={userData?.experience || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-2"
                    placeholder="Experience"
                  />
                </div>

                <div>
                  <label htmlFor="">Consultation Fee</label>
                  <input
                    disabled={!isEditing}
                    name="consultationFee"
                    value={userData?.consultationFee || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-2"
                    placeholder="Consultation Fee"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Description</label>
                <textarea
                  disabled={!isEditing}
                  name="description"
                  value={userData?.description || ""}
                  onChange={handleChange}
                  placeholder="Write a short description..."
                  className="w-full border rounded-xl p-3 mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
