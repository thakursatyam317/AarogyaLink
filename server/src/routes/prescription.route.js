import express from 'express';
import { getThePrescriptionData } from '../controllers/prescription.controller.js';
import { userProtection } from '../middlewares/user.middleware.js';
import { doctorProtection } from '../middlewares/doctor.middleware.js';
const router = express.Router();
router.get('/getprescription/:id', userProtection,doctorProtection, getThePrescriptionData);

export default router;