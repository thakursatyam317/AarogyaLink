import express from 'express';
import { userProtection }  from '../middlewares/user.middleware.js';
import { getDoctorDashboard, notificationsCount } from '../controllers/doctorDashboard.controller.js';  

const router = express.Router();

router.get('/doctordashboard',  getDoctorDashboard);

router.get('/notifications', userProtection, notificationsCount);

export default router;