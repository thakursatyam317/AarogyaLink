import User from "../models/user.model.js";
// import Prescription from "../models/prescription.model.js";
import Doctor from "../models/doctor.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Appointment from "../models/appointment.model.js";
import Imagekit from "../configs/imagekit.js";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import mongoose from "mongoose";


export const getThePrescriptionData = async (req, res) => {
    try {
        const doctor_id = req.user?._id || req.user?.id;
        console.log("Logged-in doctorId:", doctor_id);
        const user_id = req.params.id;
        console.log("User ID from params:", user_id);

        const user = await User.findById(user_id);
        console.log("Found user for prescription:", user);

        const doctor = await Doctor.findOne({ user_id: doctor_id });
        console.log("Found doctor for prescription:", doctor);
        if (!doctor) {
            throw new ApiError(404, "Doctor not found");
        }
        const appointment = await Appointment.aggregate([
            {
                $match: {
                    doctor_id: doctor._id,
                    patient_id: user._id
                }
            },
           
        ]);
        console.log("Found appointment for prescription:", appointment);

        return res
            .status(200)
            .json(
                new ApiResponse(200, "Prescription data fetched successfully", appointment)
            );

    } catch (error) {
     console.error("❌ Get Prescription Data Error:", error);
     new ApiError(500, "Server error while fetching prescription data");   
    }
}

export const createPrescription = async (req, res) => {
    try {
        const doctor_id = req.user?._id || req.user?.id;
        console.log("Logged-in doctorId:", doctor_id);
        const { patient_id, diagnosis, checkups } = req.body;
        console.log("Received prescription data:", req.body);
        
        


    } catch (error) {
        console.error("❌ Create Prescription Error:", error);
        new ApiError(500, "Server error while creating prescription");
    }
}