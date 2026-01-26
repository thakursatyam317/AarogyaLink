import express from 'express';
import { userProtection }  from '../middlewares/user.middleware.js';
import { getDoctorDashboard } from '../controllers/doctorDashboard.controller.js';  

const router = express.Router();

router.get('/doctordashboard',  getDoctorDashboard);


export default router;