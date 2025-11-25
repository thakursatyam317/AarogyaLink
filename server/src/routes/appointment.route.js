import express from "express";


import { getDoctorAppointmentDetails,  getDoctorNotifications,
  updateNotification,
  respondNotification  } from "../controllers/appointment.controller.js";
import { userProtection } from "../middlewares/user.middleware.js";


const router = express.Router();





router.post("/:id", userProtection, getDoctorAppointmentDetails);




// GET all notifications for doctor
router.get("/", userProtection, getDoctorNotifications);

// Update DATE & TIME
router.patch("/:id", userProtection, updateNotification);

// Accept / Reject
router.post("/:id/respond", userProtection, respondNotification);



export default router;