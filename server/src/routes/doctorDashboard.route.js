import express from 'express';
import { userProtection }  from '../middlewares/user.middleware.js';
import { getDoctorDashboard, notificationsCount, todayTotalAppointments } from '../controllers/doctorDashboard.controller.js';  

const router = express.Router();

router.get('/doctordashboard',  getDoctorDashboard);

router.get('/notifications', userProtection, notificationsCount);
router.get('/todayappointments', userProtection, todayTotalAppointments);

export default router;