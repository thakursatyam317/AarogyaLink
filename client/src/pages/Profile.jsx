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
      });

      if (authUser.profilePic) {
        setPreview(authUser.profilePic);
      }
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
            address: res.data.data.address || {
              houseNumber: "",
              street: "",
              city: "",
              state: "",
              pincode: "",
              country: "",
            },
          }));

          if (res.data.data.profilePic) {
            setPreview(res.data.data.profilePic);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) {
          console.log("Token expired or missing");
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
    reader.onloadend = () => {
      setPreview(reader.result);
    };
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
      formData.append("address", JSON.stringify(userData.address));

      if (photoFile) {
        formData.append("profilePic", photoFile);
      }

      const res = await authAxios.put("/user/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.updatedUser) {
        setUserData(res.data.updatedUser);
        setPreview(res.data.updatedUser.profilePic || "");
        setPhotoFile(null);
        setIsEditing(false);
        await fetchProfile();
        toast.success("✅ Profile updated successfully", {
          duration: 1500,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("❌ Error updating profile");
    }
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="h-[700px] grid rounded-2xl justify-center ms-15 mt-24 shadow-[0_0_25px_rgba(59,130,246,0.25)] w-[1400px]">
          <div className="flex justify-between relative">
            <h1 className="text-5xl font-semibold absolute mt-14 ms-16">Profile</h1>
            <div className="ms-[35%] mt-14">
              <label htmlFor="" className="text-xl">User ID :- </label>
              <span className="text-xl hover:text-blue-600 hover:shadow-blue-500">
                {userData.userID}
              </span>
            </div>

            <div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className=" ms-[95%] mt-10 h-11 w-40  rounded-xl bg-blue-500 hover:bg-amber-500 hover:text-white text-2xl"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className=" ms-[95%] mt-10 h-11 w-40  rounded-xl bg-green-500 hover:bg-amber-500 hover:text-white text-2xl"
                >
                  Save
                </button>
              )}
            </div>
          </div>

          <div className="flex">
            <div className="h-[300px] w-[300px] border rounded-full mt-30 -ms-10 object-fill relative">
              <img
                src={preview || userData?.profilePic || ""}
                alt=""
                className="h-[298px] w-[300px] border rounded-full object-fill"
              />
              <div className="h-10 w-10 rounded-full border-2 ms-64 -mt-22 flex justify-center bg-blue-50 hover:bg-amber-50 absolute z-20">
                {isEditing && (
                  <>
                    <FaCamera className=" group-hover:text-white text-xl text-blue-500 hover:text-amber-500 mt-1.5 ms-1.2" />
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute h-full w-full opacity-0 cursor-pointer"
                      onChange={handlePhotoChange}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="flex ms-20">
              <div className="mx-10">
                <h1 className="mt-9 text-2xl">Personal Detail :</h1>
                <div className="grid my-5 w-80">
                  <label htmlFor="" className="my-1">User Name :-</label>
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

              <div className="mt-10 ">
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
                        address: { ...prev.address, houseNumber: e.target.value },
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
    </>
  );
};

export default Profile;
