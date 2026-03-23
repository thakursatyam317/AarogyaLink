import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import  connectDB from './src/configs/db.js'
import authRoute from './src/routes/auth.route.js'
import userRoute from './src/routes/user.route.js'
import doctorAuth from './src/routes/doctor.route.js'
import appointmentRoute from './src/routes/appointment.route.js';
import prescriptionRoute from './src/routes/prescription.route.js';
import emr from '../server/src/routes/EMR.route.js';
import doctorDashboardRoute from './src/routes/doctorDashboard.route.js';
import chatBot from './src/routes/chatBot.route.js';

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true })); 

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoute);
app.use('/api/user', userRoute);
app.use('/api/doctor',doctorAuth);
app.use('/api/appointments', appointmentRoute);
app.use('/api/prescription', prescriptionRoute);
app.use('/api/emr', emr);
app.use('/api/doctordashboard', doctorDashboardRoute); // Serve admin dashboard static files
app.use('/api/chatbot', chatBot); // Endpoint for chatbot

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});