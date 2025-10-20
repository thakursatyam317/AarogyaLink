import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import { userProtection } from '../middlewares/user.middleware.js';
import multer from 'multer'

const upload = multer();




const router = express.Router();

router.get('/profile', userProtection, getUserProfile);
router.put("/profile/update", userProtection, upload.single("profilePic"), updateUserProfile);

export default router;