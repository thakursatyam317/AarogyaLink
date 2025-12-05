import Appointment from "../models/appointment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import imagekit from "../configs/imagekit.js";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

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



export const createprescription = async (req, res) => {
  try {
    const { doctor_id, patient_id, prescription_details, diagnosis, medicine, checkups, notes } = req.body;
    
    const folder = path.join(process.cwd(), 'prescriptionsPDFs');
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    const fileName = `prescreption_${patient_id}_${Date.now()}.pdf`;
    const filePath = path.join(folder, fileName);
    console.log("File Path:", filePath);

    const doc = new PDFDocument({size: 'A4'});
    const writeStream = doc.pipe(fs.createWriteStream(filePath));
    doc.pipe(writeStream);

    doc.fontSize(20).text('Prescription', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Doctor ID: ${doctor_id}`);
    doc.text(`Patient ID: ${patient_id}`);
    doc.moveDown();

    doc.fontSize(16).text('Prescription Details:', { underline: true });
    doc.fontSize(12).text(`Diagnosis: ${diagnosis}`);
    doc.moveDown();
    doc.fontSize(12).text(`Medicine: ${medicine}`);
    doc.moveDown();
    doc.fontSize(12).text(`Checkups: ${checkups}`);
    doc.moveDown();
    doc.fontSize(12).text(`Notes: ${notes}`);
    doc.moveDown();

    doc.end();
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    console.log("PDF generated at:", filePath);

    const pdfBuffer = fs.readFileSync(filePath);

    // DEBUG BEFORE UPLOAD
    console.log("📤 Uploading to ImageKit...");
    console.log("📤 Buffer length:", pdfBuffer.length);
    console.log("📤 Upload path:", "prescriptions/" + fileName);

    // ------------------ IMAGEKIT UPLOAD --------------------
    const upload = await imagekit.upload({
      file: pdfBuffer,
      fileName: fileName,
      folder: "prescriptions" 
    });

    console.log("✅ ImageKit Upload Success:", upload.url);

    fs.unlinkSync(filePath);

    return res.json({
      success: true,
      pdfUrl: upload.url
    });

  } catch (error) {
    console.log("Prescription Creation Error:", error);
    console.log("🔥 RAW ERROR:", err);

    if (err?.response) {
      console.log("🔥 RESPONSE ERROR:", err.response);
    }

    if (err?.error) {
      console.log("🔥 IMAGEKIT ERROR:", err.error);
    }

    if (err?.message) {
      console.log("🔥 ERROR MESSAGE:", err.message);
    }

    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.message));
  }
};