import express from "express";
import {getDoctorPatientData} from "../controllers/EMR.controller.js"
import { userProtection } from "../middlewares/user.middleware.js";

const router = express();


router.get('/doctor/emr',  userProtection, getDoctorPatientData);

export default router;