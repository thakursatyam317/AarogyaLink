import express from "express";


import { getDoctorAppointment, getAllAppointmentsForDoctor } from "../controllers/appointment.controller.js";
import { userProtection } from "../middlewares/user.middleware.js";


const router = express.Router();





router.post("/:id", userProtection, getDoctorAppointment);
router.get("/allappointments", userProtection, getAllAppointmentsForDoctor);







export default router;