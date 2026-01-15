import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import razorpayInstance from "../configs/razorpay.js";
import mongoose from "mongoose";

//User or Patient book the appoinrment to doctor and payment done by razorpay
export const getDoctorAppointment = async (req, res) => {
  try {
    const doctorID = req.params.id; // comes from URL
    const { appointmentDate, appointmentTime, amount } = req.body;
    const userId = req.user.id; // JWT user


    console.log("Doctor ID:", doctorID);
    console.log("User ID:", userId);
    console.log("Appointment Date:", appointmentDate);
    console.log("Appointment Time:", appointmentTime);
    console.log("Amount:", amount);

    if (!doctorID) throw new ApiError(400, "Doctor ID is required");
    if (!userId) throw new ApiError(400, "User ID is required");

    if (!appointmentDate || !appointmentTime || !amount) {
      throw new ApiError(400, "Appointment date, time & amount are required");
    }

    const doctor = await Doctor.findOne({ doctorID: doctorID });
    console.log("doctor", doctor);
    const doctor_id = doctor._id;
    console.log("doctor_id", doctor_id);

    if (!doctor) throw new ApiError(404, "Doctor not found");

    const user = await User.findById(userId);
    console.log("user", user);
    if (!user) throw new ApiError(404, "User not found");

    console.log("Creating appointment...");
    const appointment = await Appointment.create({
      doctor_id: doctor_id,
      patient_id: userId,
      patientDetail: {
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        profilePic: user.profilePic,
        dob: user.dob,
        userID : user.userID
      },
      doctorDetail: {
        userName: doctor.userDetails.userName,
        email: doctor.userDetails.email,
        phoneNumber: doctor.userDetails.phoneNumber,
        specialization: doctor.specialization,
        profilePic: doctor.userDetails.profilePic,
        dob: doctor.userDetails.dob,
        gender: doctor.userDetails.gender,
        doctorID : doctor.doctorID
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
      razorpay_payment_id: "",
      date: new Date(order.created_at * 1000),
    };
    await appointment.save();

    // ----------------------------
    // Response
    // ----------------------------
    return res.status(200).json(
      new ApiResponse(
        200,
        "Appointment created & Razorpay order generated successfully",
         {
          appointment,
          order,
        }
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

export const razarpayIdUpdate = async (req, res) => {
  try {
    console.log("Updating Razorpay ID...");
    const { razorpay_payment_id } = req.body;
    console.log("razaray id :", razorpay_payment_id);

    const { doctorEmail, userEmail } = req.body;
    console.log("Patient _id", userEmail);
    console.log("doctor_id ", doctorEmail);

    const appointment = await Appointment.findOne({
      "doctorDetail.email": doctorEmail,
      "patientDetail.email": userEmail,
    });
    console.log("appointment found", appointment);
    if (!appointment) {
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Appointment not found"));
    }
    // console.log("Appointment, Payment is complete", appointment);

    appointment.paymentDetails.razorpay_payment_id = razorpay_payment_id;
    appointment.paymentDetails.status = "paid";
    appointment.paymentStatus = "paid";
    await appointment.save();
    console.log("Appointment, Payment is complete", appointment);
    console.log("Razorpay ID saved successfully");

    return res
      .status(200)
      .json(new ApiResponse(200, "key is added", appointment));
  } catch (error) {
    console.log("The razorpay id is not updated");
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(false, null, "Server Error"));
  }
};

export const getAllAppointmentsForDoctor = async (req, res) => {
  try {
    const user_id = req.doctor.user_id; // from JWT
    console.log("Doctor User ID from Token:", user_id);

    console.log("Doctor ID:", user_id);

    if (!user_id) {
      throw new ApiError(400, "user ID is required");
    }
    const doctor = await Doctor.findOne({
      user_id: user_id,
    });
    console.log("Doctor Found:", doctor);
    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }
    const appointments = await Appointment.find({ doctor_id: doctor._id });
    console.log("doctor._id", doctor._id);
    const withoutAccepted = await Appointment.aggregate([
      {
        $match: {
          doctor_id: new mongoose.Types.ObjectId(doctor._id),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          appointments: { $push: "$$ROOT" },
        },
      },
      {
        $match: { _id: { $ne: "accepted" } },
      },
    ]);

    // const pasientDetail =  await User.findById(appointments.patient_id);
    // const doctorDetail =  await Doctor.findById(appointments.doctor_id);

    console.log("Appointments:", appointments);
    console.log("withoutAccepted:", withoutAccepted);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Appointments fetched successfully",
          withoutAccepted
        )
      );
  } catch (error) {
    console.error("❌ Get All Appointments Error:", error);
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(false, null, "Server Error"));
  }
};

export const isAcceptedOrRejected = async (req, res) => {
  try {
    const { date, time, status } = req.body;
    const appointmentId = req.params.id;

    console.log("Appointment ID:", appointmentId);

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new ApiError(404, "Appointment not found");
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        appointmentDate: date ?? appointment.appointmentDate,
        appointmentTime: time ?? appointment.appointmentTime,
        status: status ?? appointment.status,
      },
      { new: true }
    );

    console.log("Updated Appointment:", updatedAppointment);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedAppointment,
          "Appointment updated successfully"
        )
      );
  } catch (error) {
    console.error("❌ Accept/Reject Appointment Error:", error);

    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(500, null, error.message || "Server Error"));
  }
};

export const getAllAcceptedAppointmentsForDoctor = async (req, res) => {
  try {
    const user_id = req.user?.id || req.user._id; // from JWT
    // const user_id = req.doctor.user_id;
    console.log("Doctor ID:", user_id);

    if (!user_id) {
      throw new ApiError(400, "Doctor ID is required");
    }
    const doctor = await Doctor.findOne({ user_id: user_id });
    const appointments = await Appointment.aggregate([
      {
        $match: {
          doctor_id: doctor._id,
          status: "accepted",
        },
      },
    ]);

    console.log("Accepted Appointments:", appointments);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Accepted Appointments fetched successfully",
          appointments
        )
      );
  } catch (error) {
    console.error("❌ Get All Accepted Appointments Error:", error);
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(false, null, "Server Error"));
  }
};

// in this file error and solve tommorow or sunday
