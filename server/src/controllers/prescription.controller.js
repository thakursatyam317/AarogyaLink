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

    // ---------------- PDF GENERATOR (SYSTEMIC VERSION) ----------------

    // ---------------- PDF GENERATOR (FINAL UI PERFECTED VERSION) ----------------

const doc = new PDFDocument({ size: "A4", margin: 50 });
const writeStream = fs.createWriteStream(filePath);
doc.pipe(writeStream);

// -------------------------------------------------------------
// HEADER SECTION
// -------------------------------------------------------------
doc.fontSize(22).text("AAROGYA LINK HOSPITAL", { align: "center", bold: true });
doc.moveDown(0.5);

doc.fontSize(12).text(
  "45, Bhel Nagar, Bhopal | +91 9754584581 | aarogyalink1@gmail.com",
  { align: "center" }
);
doc.moveDown(1.5);

doc.fontSize(16).text("PRESCRIPTION REPORT", { align: "center" });
doc.moveDown(1.2);

// Blue horizontal line
function separator(y) {
  doc.strokeColor("#4aa3df").moveTo(50, y).lineTo(550, y).stroke();
}

// -------------------------------------------------------------
// TWO-COLUMN SECTION MAKER (PERFECTED UI)
// -------------------------------------------------------------
function printTwoColumnSection(title, data, startY) {
  let y = startY;

  separator(y - 5);

  doc.fontSize(14).text(title, 50, y, { underline: true });
  y += 30;

  const leftX = 50;
  const rightX = 300;

  const entries = Object.entries(data);

  doc.fontSize(12);

  // LEFT 3 fields
  for (let i = 0; i < 3; i++) {
    if (!entries[i]) break;
    const [label, value] = entries[i];
    doc.text(`${label}: ${value}`, leftX, y);
    y += 20;
  }

  // Reset y for right column alignment
  let rightY = startY + 30;

  // RIGHT 3 fields
  for (let i = 3; i < entries.length; i++) {
    const [label, value] = entries[i];
    doc.text(`${label}: ${value}`, rightX, rightY);
    rightY += 20;
  }

  return Math.max(y, rightY) + 10;
}

// -------------------------------------------------------------
// DOCTOR DETAILS
// -------------------------------------------------------------
let y = 150;

y = printTwoColumnSection(
  "DOCTOR DETAILS",
  {
    Name: doctorDetail.fullName,
    Email: doctorDetail.email,
    Phone: doctorDetail.phoneNumber,
    Age: doctorDetail.age,
    "Doctor ID": doctorDetail._id,
    Gender: doctorDetail.gender,
  },
  y
);

// -------------------------------------------------------------
// PATIENT DETAILS
// -------------------------------------------------------------
y = printTwoColumnSection(
  "PATIENT DETAILS",
  {
    Name: patientDetail.fullName,
    Email: patientDetail.email,
    Phone: patientDetail.phoneNumber,
    Age: patientDetail.age,
    "Patient ID": patientDetail._id,
    Gender: patientDetail.gender,
  },
  y
);

// -------------------------------------------------------------
// DYNAMIC SECTION MAKER (DIAGNOSIS, MEDICINES, CHECKUPS)
// -------------------------------------------------------------
function addDynamicSection(title, items) {
  separator(y);
  y += 15;

  doc.fontSize(14).text(title, 50, y, { underline: true });
  y += 25;

  doc.fontSize(12);

  // CASE 1: items is ARRAY OF OBJECTS (diagnosis / medicines)
  if (Array.isArray(items) && typeof items[0] === "object") {
    items.forEach((obj, index) => {
      doc.fontSize(12).text(`• Item ${index + 1}`, 60, y);
      y += 18;

      for (let key in obj) {
        doc.fontSize(11).text(`   ${key}: ${obj[key]}`, 80, y);
        y += 16;
      }

      y += 10;
    });
  }

  // CASE 2: items is ARRAY OF STRINGS (checkups)
  else if (Array.isArray(items) && typeof items[0] === "string") {
    items.forEach((text) => {
      doc.text(`• ${text}`, 70, y);
      y += 18;
    });
  }

  // CASE 3: items is OBJECT with key-value pairs (fallback)
  else if (typeof items === "object") {
    for (let key of Object.keys(items)) {
      doc.text(`${key}: ${items[key]}`, 70, y);
      y += 18;
    }
  }

  y += 20;

  // Auto new page
  if (y > 750) {
    doc.addPage();
    y = 50;
  }
}


// -------------------------------------------------------------
// SECTIONS
// -------------------------------------------------------------
addDynamicSection("DIAGNOSIS", diagnosis);
addDynamicSection("MEDICINES", medicines);
addDynamicSection("CHECKUPS", checkups);

separator(y);

// -------------------------------------------------------------
// END PDF
// -------------------------------------------------------------
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
