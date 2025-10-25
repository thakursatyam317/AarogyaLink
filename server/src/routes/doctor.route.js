import express from "express";
import { updateDoctorProfile } from "../controllers/doctor.controller.js";
import { userProtection } from "../middlewares/user.middleware.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.put(
  "/profile/update",
  userProtection,
  upload.single("profilePic"),
  updateDoctorProfile
);

export default router;
