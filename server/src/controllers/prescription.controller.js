import Appointment from "../models/appointment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getThePrescriptionData = async (req, res) => {
  try {
    const doctor_id = req.doctor._id;
    const patient_id = req.params.id; // 👈 GET FROM URL PARAM

    console.log("Doctor ID:", doctor_id);
    console.log("Patient ID:", patient_id);

    if (!doctor_id) throw new ApiError(401, "Unauthorized doctor");
    if (!patient_id) throw new ApiError(400, "Patient ID is required");

    const doctor = await Doctor.findById(doctor_id);
    if (!doctor) throw new ApiError(404, "Doctor not found");

    const user = await User.findById(patient_id);
    if (!user) throw new ApiError(404, "Patient not found");

    const appointmentData = await Appointment.aggregate([
      {
        $match: {
          doctor_id: new mongoose.Types.ObjectId(doctor_id),
          patient_id: new mongoose.Types.ObjectId(patient_id),
          status: "accepted",
        },
      },
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
       
        "Appointment & Prescription Data fetched successfully",
         appointmentData[0] || {},
      )
    );
  } catch (error) {
    console.log("Prescription Fetch Error:", error);

    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.message));
  }
};
