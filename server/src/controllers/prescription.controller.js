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
          patient_id: user._id,
        },
      },
    ]);
    console.log("Found appointment for prescription:", appointment);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Prescription data fetched successfully",
          appointment
        )
      );
  } catch (error) {
    console.error("❌ Get Prescription Data Error:", error);
    new ApiError(500, "Server error while fetching prescription data");
  }
};

export const createPrescription = async (req, res) => {
  try {
    const doctor_id = req.user?._id || req.user?.id;
    console.log("Logged-in doctorId:", doctor_id);
    const { diagnosis, medicines, checkups, patientDetail, doctorDetail } =
      req.body;
    console.log("Received prescription data:", req.body);

    const folder = path.join(process.cwd(), "prescription");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    const appoinrment = await Appointment.findOne({
      "patientDetail.email": patientDetail.email,
    });
    console.log("Patient : ", appoinrment);
    const tempfileName = appoinrment.patientDetail.fullName
      .toLowerCase()
      .replace(/\s+/g, "_");

    // const arr = tempfileName.split(" ");

    const fileName = `prescription_${tempfileName}.pdf`;
    const filePath = path.join(folder, fileName);

    console.log("File path of the file: ", filePath);

    const doc = new PDFDocument({ size: "A4" });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(20).text("AAROGYA LINK HOSPITAL", { align: "center" });
    doc.moveDown();

    doc
      .fontSize(12)
      .text(
        "45, Bhel Nagar, Bhopal, | +91 9754584581 | aarogyalink1@gmail.com",
        { align: "center" }
      );
    doc.moveDown();

    doc.fontSize(16).text("PRESCRIPTION REPORT", { align: "center" });
    doc.moveDown();

    doc.fontSize(13).text(" PATIENT DETAILS", { underline: true });
    doc.fontSize(11);
    doc.text(`Name: ${patientDetail.fullName}`);
    doc.text(`Email;: ${patientDetail.email}`);
    doc.text(`Phone: ${patientDetail.phoneNumber}`);
    doc.text(`Age: ${patientDetail.age}`);
    doc.text(`Patient ID: ${patientDetail._id}`);
    doc.text(`Gender: ${patientDetail.gender}`);
    doc.moveDown();

    doc.fontSize(13).text("DOCTOR DETAILS", { underline: true });
    doc.fontSize(11);
    doc.text(`Name: ${doctorDetail.fullName}`);
    doc.text(`Email;: ${doctorDetail.email}`);
    doc.text(`Phone: ${doctorDetail.phoneNumber}`);
    doc.text(`Age: ${doctorDetail.age}`);
    doc.text(`Patient ID: ${doctorDetail._id}`);
    doc.text(`Gender: ${doctorDetail.gender}`);
    doc.moveDown();

    doc.fontSize(13).text("DIAGNOSIS: ", { underline: true });
    doc.fontSize(11);
    for (let key of Object.keys(diagnosis)) {
      console.log(key, diagnosis[key]);
      doc.text(`Diagnosis : ${key} `);
    }
    doc.moveDown();

    doc.fontSize(13).text("MEDICINES: ", { underline: true });
    doc.fontSize(11);
    for (let key of Object.keys(medicines)) {
      console.log(key, medicines[key]);
      doc.text(`Diagnosis : ${key} `);
    }
    doc.moveDown();

    doc.fontSize(13).text("CHECKUPS: ", { underline: true });
    doc.fontSize(11);
    for (let key of Object.keys(checkups)) {
      console.log(key, checkups[key]);
      doc.text(`Diagnosis : ${key} `);
    }

    doc.end();

    await new Promise((resolve) => writeStream.on("finish", resolve));
    console.log(" PDF Finished Writing!");

    console.log("PDF exists:", fs.existsSync(filePath));
    console.log("PDF size:", fs.statSync(filePath).size, "bytes");

    const fileBuffer = fs.readFileSync(filePath);

    const uploadResponse = await Imagekit.upload({
      file: fileBuffer,
      fileName,
      folder: "/prescriptions",
    });

    fs.unlinkSync(filePath);

    res.status(201).json({
      success: true,
      message: "Prescription uploaded successfully",
      pdfUrl: uploadResponse.url,
      fileId: uploadResponse.fileId,
    });
  } catch (error) {
    console.error("❌ Create Prescription Error:", error);
    new ApiError(500, "Server error while creating prescription");
  }
};
