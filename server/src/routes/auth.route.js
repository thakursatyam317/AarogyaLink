import express from 'express';
import { userLogin, userLogout, userRegister } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout',userLogout);


export default router;