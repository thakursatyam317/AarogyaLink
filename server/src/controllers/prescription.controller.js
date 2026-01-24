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
import Preception from "../models/prescreption.model.js";

export const getThePrescriptionData = async (req, res) => {
  try {
    const doctor_id = req.user?._id || req.user?.id;
    console.log("Logged-in doctorId:", doctor_id);
    const patientID = req.params.id.replace(":", "");
    console.log("User ID from params:", patientID);
    


    const user = await User.findOne({ userID: patientID });
    if (!user) {
     throw new ApiError(404, "Patient not found");
    }
    console.log("Found user for prescription:", user);

    const doctor = await Doctor.findOne({ user_id: doctor_id });
    console.log("Found doctor for prescription:", doctor);
    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }
    console.log("Doctor _id", doctor._id)
    console.log("Doctor _id", user._id)
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

    // -------------------------------------------------------------
    // Create Folder
    // -------------------------------------------------------------
    const folder = path.join(process.cwd(), "prescription");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    const appointment = await Appointment.findOne({
      "patientDetail.email": patientDetail.email,
    });

    console.log("Patient : ", appointment);

    const tempfileName = appointment.patientDetail.userName
      .toLowerCase()
      .replace(/\s+/g, "_");

    const fileName = `prescription_${tempfileName}.pdf`;
    const filePath = path.join(folder, fileName);

    console.log("File path of the file: ", filePath);

    // -------------------------------------------------------------
    // PDF START
    // -------------------------------------------------------------
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // -------------------------------------------------------------
    // HEADER
    // -------------------------------------------------------------
    doc.fontSize(22).text("AAROGYA LINK HOSPITAL", { align: "center" });
    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .text(
        "45, Bhel Nagar, Bhopal | +91 9754584581 | aarogyalink1@gmail.com",
        { align: "center" }
      );
    doc.moveDown(1.5);

    doc.fontSize(16).text("PRESCRIPTION REPORT", { align: "center" });
    doc.moveDown(1.2);

    // Separator line
    function separator(y) {
      doc.strokeColor("#4aa3df").moveTo(50, y).lineTo(550, y).stroke();
    }

    // -------------------------------------------------------------
    // TWO COLUMN SECTION
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

      for (let i = 0; i < 3; i++) {
        if (!entries[i]) break;
        const [label, value] = entries[i];
        doc.text(`${label}: ${value}`, leftX, y);
        y += 20;
      }

      let rightY = startY + 30;

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
        Name: doctorDetail.userName,
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
        Name: patientDetail.userName,
        Email: patientDetail.email,
        Phone: patientDetail.phoneNumber,
        Age: patientDetail.age,
        "Patient ID": patientDetail._id,
        Gender: patientDetail.gender,
      },
      y
    );

    // -------------------------------------------------------------
    // TABLE RENDER FUNCTION
    // -------------------------------------------------------------
    function drawTable(
      doc,
      headers,
      rows,
      startX = 50,
      startY = 50,
      rowHeight = 25
    ) {
      let y = startY;

      doc.rect(startX, y, 500, rowHeight).fill("#E8E8E8").stroke();
      doc.fillColor("black");

      headers.forEach((header, i) => {
        doc.fontSize(12).text(header, startX + i * 150 + 5, y + 8);
      });

      y += rowHeight;

      rows.forEach((row) => {
        doc.rect(startX, y, 500, rowHeight).stroke();

        row.forEach((cell, i) => {
          doc.fontSize(11).text(String(cell), startX + i * 150 + 5, y + 8);
        });

        y += rowHeight;

        if (y > 750) {
          doc.addPage();
          y = 50;
        }
      });

      return y + 20;
    }

    // -------------------------------------------------------------
    // DIAGNOSIS TABLE
    // -------------------------------------------------------------
    separator(y);
    doc.fontSize(14).text("DIAGNOSIS", 50, y, { underline: true });
    y += 30;

    const diagnosisRows = diagnosis.map((item) => [
      item.name || "",
      item.icd || "",
      item.namaste || "",
    ]);

    const diagnosisHeaders = ["Name", "ICD Code", "NAMASTE"];

    y = drawTable(doc, diagnosisHeaders, diagnosisRows, 50, y);

    // -------------------------------------------------------------
    // MEDICINES TABLE
    // -------------------------------------------------------------
    separator(y);
    doc.fontSize(14).text("MEDICINES", 50, y, { underline: true });
    y += 30;

    const medicineRows = medicines.map((item) => [
      item.name || "",
      item.meal || "",
      item.dosage || "",
    ]);

    const medicineHeaders = ["Medicine", "Meal", "Dosage"];

    y = drawTable(doc, medicineHeaders, medicineRows, 50, y);

    // -------------------------------------------------------------
    // CHECKUPS SECTION
    // -------------------------------------------------------------
    separator(y);
    y += 15;

    doc.fontSize(14).text("CHECKUPS", 50, y, { underline: true });
    y += 25;

    checkups.forEach((text) => {
      doc.fontSize(12).text(`• ${text}`, 70, y);
      y += 18;
    });

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

    const prescreption = await Preception.create({
      prescriptionpdf: uploadResponse.url,

      patientDetail: {
        userName: patientDetail.userName,
        email: patientDetail.email,
        user_id: patientDetail.user_id,
        userID: patientDetail.userID,

        phoneNumber: patientDetail.phoneNumber,
      },
      doctorDetail: {
        userName: doctorDetail.userName,
        email: doctorDetail.email,
        specialization: doctorDetail.specialization,
        doctor_id: doctorDetail.doctor_id,
        doctorID: doctorDetail.doctorID,
        phoneNumber: doctorDetail.phoneNumber,
      },
    });

    prescreption.save();

    res.status(201).json({
      success: true,
      message: "Prescription uploaded successfully",
      pdfUrl: uploadResponse.url,
      fileId: uploadResponse.fileId,
    });
  } catch (error) {
    console.error("❌ Create Prescription Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error while creating prescription",
      });
  }
};
