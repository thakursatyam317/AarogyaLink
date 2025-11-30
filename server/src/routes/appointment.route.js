import express from "express";


import { getDoctorAppointment, getAllAppointmentsForDoctor, isAcceptedOrRejected , getAllAcceptedAppointmentsForDoctor } from "../controllers/appointment.controller.js";
import { userProtection } from "../middlewares/user.middleware.js";
import { doctorProtection } from "../middlewares/doctor.middleware.js";

const router = express.Router();





router.post("/getappointment/:id", userProtection,doctorProtection, getDoctorAppointment);
router.get("/allappointments", userProtection,doctorProtection, getAllAppointmentsForDoctor);

router.put("/update-status/:id", userProtection, isAcceptedOrRejected);
router.get("/acceptedappointments", userProtection, getAllAcceptedAppointmentsForDoctor);







export default router;