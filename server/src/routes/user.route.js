import express from 'express';
import { getUserProfile } from '../controllers/user.controller.js';
import { userProtection } from '../middlewares/user.middleware.js';

const router = express.Router();

router.get('/profile', userProtection, getUserProfile);

export default router;