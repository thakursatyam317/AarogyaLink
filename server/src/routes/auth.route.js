import express from 'express';
import { userLogin, userLogout, userRegister,  verificationOfEmail, userForgotPassword ,userForgotPasswordOTP, useChangePassword} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', userRegister);


router.patch('/emailverification', verificationOfEmail);
router.patch('/forgotpassword', userForgotPassword);
router.patch('/forgotpasswordotp', userForgotPasswordOTP);
router.patch('/changepassword', useChangePassword);


router.post('/login', userLogin);
router.post('/logout',userLogout);


export default router;