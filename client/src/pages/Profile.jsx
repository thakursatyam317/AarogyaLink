import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import authAxios from "../utils/authAxios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../contexts/authContext";

const Profile = () => {
  const { authUser, fetchProfile } = useAuth();
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState("");

  useEffect(() => {
    if (authUser) {
      setUserData({
        userName: authUser.userName || "",
        email: authUser.email || "",
        phoneNumber: authUser.phoneNumber || "",
        dob: authUser.dob?.slice(0, 10) || "",
        gender: authUser.gender || "",
        bloodGroup: authUser.bloodGroup || "",
        address: authUser.address || {
          houseNumber: "",
          street: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
        },
        profilePic: authUser.profilePic || "",
        userID: authUser._id || authUser.userID || "",
        hospitalID: authUser.hospitalID || "",
      });

      if (authUser.profilePic) setPreview(authUser.profilePic);
    }
    setAuthLoading(false);
  }, [authUser]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await authAxios.get("/user/profile");
        if (res.data?.data) {
          setUserData((prev) => ({
            ...prev,
            ...res.data.data,
            address: res.data.data.address || prev.address,
          }));
          if (res.data.data.profilePic) {
            setPreview(res.data.data.profilePic);
          }
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", userData.userName);
      formData.append("email", userData.email);
      formData.append("phoneNumber", userData.phoneNumber);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("bloodGroup", userData.bloodGroup);
      formData.append(
        "hospitalID",
        userData.hospitalID || selectedHospital || ""
      );
      formData.append("address", JSON.stringify(userData.address));

      if (photoFile) formData.append("profilePic", photoFile);

      const res = await authAxios.put("/user/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.updatedUser) {
        setUserData(res.data.updatedUser);
        setPreview(res.data.updatedUser.profilePic || "");
        setPhotoFile(null);
        setIsEditing(false);
        await fetchProfile();
        toast.success("Profile updated successfully");
      }
    } catch {
      toast.error("Error updating profile");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="px-4">
        <div className="min-h-6/12 mb-8 md:h-[700px] grid rounded-2xl justify-center md:ms-15 mt-24 shadow-[0_0_25px_rgba(59,130,246,0.25)] w-full md:w-[1400px] bg-white p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between relative">
            <h1 className="text-3xl md:text-5xl font-semibold md:absolute mt-6 md:mt-14 md:ms-3 text-center">
              Profile
            </h1>

            <div className="md:ms-[35%] mt-6 md:mt-8 grid text-center md:text-left">
              <div>
                <label className="text-lg md:text-xl">Hospital ID :- </label>
                {userData.hospitalID ? (
                  <span className="text-lg md:text-xl">
                    {userData.hospitalID}
                  </span>
                ) : (
                  <select
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                    className="border rounded-md p-2 text-base md:text-lg"
                  >
                    <option value="">---Select Hospital---</option>
                    <option value="Hos-AarogyaLink-0112">
                      Hos-AarogyaLink-0112
                    </option>
                    <option value="Hos-AarogyaLink-0113">
                      Hos-AarogyaLink-0113
                    </option>
                    <option value="Hos-AarogyaLink-0114">
                      Hos-AarogyaLink-0114
                    </option>
                  </select>
                )}
              </div>

              <div>
                <label className="text-lg md:text-xl">User ID :- </label>
                <span className="text-lg md:text-xl">{userData.userID}</span>
              </div>
            </div>

            <div className="flex justify-center md:block">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="md:ms-[15%] mt-6 md:mt-10 h-11 w-40 rounded-xl bg-blue-500 hover:bg-amber-500 text-white text-xl"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="md:ms-[15%] mt-6 md:mt-10 h-11 w-40 rounded-xl bg-green-500 hover:bg-amber-500 text-white text-xl"
                >
                  Save
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-6 gap-10">
            <div className="flex justify-center">
              <div className="h-[220px] w-[220px] md:h-[300px] md:w-[300px] border rounded-full relative">
                <img
                  src={preview || userData?.profilePic || ""}
                  className="h-full w-full rounded-full object-cover"
                />
                {isEditing && (
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full">
                    <FaCamera className="text-blue-500" />
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handlePhotoChange}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:ms-20 -gap-25">
              {/* PERSONAL & ADDRESS SECTIONS REMAIN EXACTLY SAME */}
              <div className="flex ms-20">
                <div className="mx-10">
                  <h1 className="-mt-9 text-2xl">Personal Detail :</h1>

                  <div className="grid my-5 w-80">
                    <label htmlFor="" className="my-1">
                      User Name :-
                    </label>
                    <input
                      type="text"
                      name="userName"
                      value={userData?.userName || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="grid my-5">
                    <label htmlFor="">Email :- </label>
                    <input
                      type="text"
                      name="email"
                      value={userData?.email || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="grid my-5">
                    <label htmlFor="">Phone Number :-</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={userData?.phoneNumber || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="grid my-5">
                    <label htmlFor="">Date of Birth :-</label>
                    <input
                      type="date"
                      name="dob"
                      value={userData?.dob || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="grid my-5">
                    <label htmlFor="">Gender :-</label>
                    <input
                      type="text"
                      name="gender"
                      value={userData?.gender || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="grid my-5">
                    <label htmlFor="">Blood Group :-</label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={userData?.bloodGroup || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                </div>

                <div className="-mt-10">
                  <h1 className="text-2xl">Address :</h1>

                  <div className="grid my-5 w-80">
                    <label htmlFor="">House Number :-</label>
                    <input
                      type="text"
                      name="houseNumber"
                      value={userData?.address?.houseNumber || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            houseNumber: e.target.value,
                          },
                        }))
                      }
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="grid my-5">
                    <label htmlFor="">Street :-</label>
                    <input
                      type="text"
                      name="street"
                      value={userData?.address?.street || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, street: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="grid my-5">
                    <label htmlFor="">City :-</label>
                    <input
                      type="text"
                      name="city"
                      value={userData?.address?.city || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, city: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="grid my-5">
                    <label htmlFor="">State :-</label>
                    <input
                      type="text"
                      name="state"
                      value={userData?.address?.state || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, state: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="grid my-5">
                    <label htmlFor="">Pin code :-</label>
                    <input
                      type="text"
                      name="pincode"
                      value={userData?.address?.pincode || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, pincode: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="grid my-5">
                    <label htmlFor="">Country :-</label>
                    <input
                      type="text"
                      name="country"
                      value={userData?.address?.country || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, country: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="h-9 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
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

export default Profile;
