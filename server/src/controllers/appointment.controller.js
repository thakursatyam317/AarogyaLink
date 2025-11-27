import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import razorpayInstance from "../configs/razorpay.js";

export const getDoctorAppointment = async (req, res) => {
  try {
    const doctorID = req.params.id; // comes from URL
    const { appointmentDate, appointmentTime, amount } = req.body;
    const userId = req.user.id; // JWT user

    // ----------------------------
    // Validation
    // ----------------------------
    if (!doctorID) throw new ApiError(400, "Doctor ID is required");
    if (!userId) throw new ApiError(400, "User ID is required");

    if (!appointmentDate || !appointmentTime || !amount) {
      throw new ApiError(400, "Appointment date, time & amount are required");
    }

    // ----------------------------
    // Fetch doctor & user
    // ----------------------------
    const doctor = await Doctor.findOne({ doctorID: doctorID });
    console.log("doctor", doctor);
    const doctor_id = doctor._id;
    console.log("doctor_id", doctor_id);

    if (!doctor) throw new ApiError(404, "Doctor not found");

    const user = await User.findById(userId);
    console.log("user", user);
    if (!user) throw new ApiError(404, "User not found");


    // ----------------------------
    // Create Appointment (pending)
    // ----------------------------
    console.log("Creating appointment...");
    const appointment = await Appointment.create({
      doctor_id: doctor_id,
      patient_id: userId,
      patientDetail: {
        fullName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        profilePic: user.profilePic,
        age: user.age,
      },
      doctorDetail: {
        fullName: doctor.userDetails.userName,
        email: doctor.userDetails.email,
        phoneNumber: doctor.userDetails.phoneNumber,
        specialization: doctor.specialization,
        profilePic: doctor.userDetails.profilePic,
        age: doctor.age,
        gender: doctor.gender,
      },
      appointmentDate,
      appointmentTime,
      amount,
      paymentStatus: "pending",
      appointmentStatus: "upcoming",
    });
    console.log(
      "🚀 ~ file: appointment.controller.js:49 ~ getDoctorAppointment ~ appointment:",
      appointment
    );
    console.log("Created Appointment:", appointment);

    // ----------------------------
    // Razorpay Order
    // ----------------------------
    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${appointment._id}`,
    };

    const order = await razorpayInstance.orders.create(options);
    console.log("Razorpay Order:", order);
    appointment.paymentDetails = {
      paymentID: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      date: new Date(order.created_at * 1000),
    };
    await appointment.save();

    // ----------------------------
    // Response
    // ----------------------------
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          appointment,
          order,
        },
        "Appointment created & Razorpay order generated successfully"
      )
    );
  } catch (error) {
    console.error("❌ Get Doctor Appointment Details Error:", error);

    const message = error instanceof ApiError ? error.message : "Server Error";

    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(false, null, message));
  }
};

export const getAllAppointmentsForDoctor = async (req, res) => {
  try {
    const doctor_id = req.user.id; // from JWT

    console.log("Doctor ID:", doctor_id);

    if (!doctor_id) {
      throw new ApiError(400, "Doctor ID is required");
    }
    const doctor = await Doctor.findOne({
      user_id: doctor_id,
    });
    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }
    const appointments = await Appointment.find({ doctor_id: doctor._id });

    // const pasientDetail =  await User.findById(appointments.patient_id);
    // const doctorDetail =  await Doctor.findById(appointments.doctor_id);

    console.log("Appointments:", appointments);
    return res
      .status(200)
      .json(
        new ApiResponse( 200, "Appointments fetched successfully",  appointments )
      );
  } catch (error) {
    console.error("❌ Get All Appointments Error:", error);
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(false, null, "Server Error"));
  }
};

export const acceptAndRejectAppointment = async (req, res) => {
  try {
    const doctor_id = req.user.id;
  } catch (error) {
    console.error("❌ Accept/Reject Appointment Error:", error);
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(false, null, "Server Error"));
  }
};
