import express from "express";


import { getDoctorAppointmentDetails } from "../controllers/appointment.controller.js";
import { userProtection } from "../middlewares/user.middleware.js";


const router = express.Router();





router.post("/:id", userProtection, getDoctorAppointmentDetails);


export default router;