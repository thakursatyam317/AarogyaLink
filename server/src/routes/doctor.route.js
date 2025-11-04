import express from "express";
import { createDoctor, updateDoctorProfile, getDoctorDetails , getDoctorList} from "../controllers/doctor.controller.js";
import { userProtection } from "../middlewares/user.middleware.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post("/createdoctor", userProtection, createDoctor);

router.get("/details", userProtection, getDoctorDetails);
router.put(
  "/details/update",
  userProtection,
  upload.single("profilePic"),
  updateDoctorProfile
);
router.get("/list", userProtection, getDoctorList);


export default router;
