import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import authAxios from "../utils/authAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";


const Appointment = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { authUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [doctorData, setDoctorData] = useState({});

  useEffect(() => {
    if (authUser) {
      setUserData({
        userName: authUser.userName || "",
        email: authUser.email || "",
        phoneNumber: authUser.phoneNumber || "",
        gender: authUser.gender || "",
        dob: authUser.dob?.slice(0, 10) || "",
        bloodGroup: authUser.bloodGroup || "",
        profilePic: authUser.profilePic || "",
        userID: authUser._id,
      });
    }
  }, [authUser]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorID = location.search.replace("?", "");
        if (!doctorID) return;

        const response = await authAxios.get(
          `/doctor/appointments/${doctorID}`
        );

        const data = response.data.data;

        setDoctorData({
          name: data?.userDetails?.userName || "",
          email: data?.userDetails?.email || "",
          specialist: data?.specialization || "",
          experience: data?.experience || "",
          fee: data?.consultationFee || "",
          profilePic: data?.userDetails?.profilePic || "",
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctor();
  }, [location.search]);

  const handlePayment = async () => {
    try {
      const amount = doctorData.fee || 50;
      const doctorID = location.search.replace("?", "");

      if (!date || !time) {
        toast.error("Please select appointment date and time");
        return;
      }

      const { data } = await authAxios.post(
        `/appointments/getappointment/${doctorID}`,
        {
          doctorID,
          amount,
          appointmentDate: date,
          appointmentTime: time,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "AarogyaLink",
        description: "Appointment Payment",
        order_id: data.orderId,
        handler: async function (response) {
          toast.success("Payment successful!");
          await authAxios.patch(`/appointments/paymentappointment`, {
            razorpay_payment_id: response.razorpay_payment_id,
            doctorEmail: doctorData.email,
            userEmail: userData.email,
          });
          navigate("/");
        },
        prefill: {
          name: userData.userName,
          email: userData.email,
          contact: userData.phoneNumber,
        },
        theme: { color: "#2563EB" },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      toast.error("Payment failed");
    }
  };



    
  
    const generateSlots = () => {
      const slots = [];
  
      let startTime = new Date();
      startTime.setHours(9, 0, 0); // 9:00 AM
  
      const endTime = new Date();
      endTime.setHours(18, 0, 0); // 6:00 PM
  
      while (startTime < endTime) {
        const slotStart = new Date(startTime);
  
        // 10 min slot
        startTime.setMinutes(startTime.getMinutes() + 10);
        const slotEnd = new Date(startTime);
  
        slots.push({
          type: "slot",
          label: `${formatTime(slotStart)} - ${formatTime(slotEnd)}`,
        });
  
        // 5 min break (logic only)
        startTime.setMinutes(startTime.getMinutes() + 5);
      }
  
      return slots;
    };
  
    const formatTime = (date) =>
      date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  const currentTime = today.toTimeString().slice(0, 5);

  return (
    <div className="min-h-screen flex justify-center p-4 md:p-6 bg-gray-100">
      <Toaster position="top-center" />
      <div className="w-full mt-16 max-w-lg bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Appointment</h1>

        <h2 className="text-xl font-semibold mb-2">Doctor Details</h2>
        <div className="mb-6 p-4 border rounded-lg bg-blue-50 flex flex-col md:flex-row items-center md:items-start">
          <div className="mb-4 md:mb-0 md:mx-6">
            <img
              src={doctorData?.profilePic}
              alt="Doctor"
              className="h-28 w-28 rounded-full border"
            />
          </div>
          <div className="text-center md:text-left">
            <p><strong>Name:</strong> {doctorData?.name}</p>
            <p><strong>Specialist:</strong> {doctorData?.specialist}</p>
            <p><strong>Experience:</strong> {doctorData?.experience} Years</p>
            <p><strong>Fee:</strong> ₹{doctorData?.fee}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">Patient Details</h2>
        <div className="mb-6 p-4 border rounded-lg bg-green-50 flex flex-col md:flex-row items-center md:items-start">
          <div className="mb-4 md:mb-0 md:mx-6">
            <img
              src={userData?.profilePic}
              alt="User"
              className="h-28 w-28 rounded-full border"
            />
          </div>
          <div className="text-center md:text-left">
            <p><strong>Name:</strong> {userData.userName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phoneNumber}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Date of Birth:</strong> {userData.dob}</p>
            <p><strong>Blood Group:</strong> {userData.bloodGroup}</p>
          </div>
        </div>

        <strong>Appointment Date :</strong>
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={date}
          min={todayDate}
          onChange={(e) => setDate(e.target.value)}
        />

        <strong>Appointment Time :</strong>
       
          <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {generateSlots().map((item, index) => {
          const isSelected = selectedSlot === item.label;

          return (
            <div
              key={index}
              onClick={() => setSelectedSlot(item.label)}
              className="rounded font-semibold hover:bg-blue-200 cursor-pointer"
              style={{
                width: "30%",
                padding: "6px",
                textAlign: "center",
                fontSize: "12px",
                border: isSelected
                  ? "2px solid #2563eb"
                  : "1px solid #333",
                background: isSelected ? "#dbeafe" : "transparent",
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
        

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
        >
          Pay ₹{doctorData.fee || 50} & Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
