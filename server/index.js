import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './src/configs/db.js';
import authRoutes from './src/routes/auth.route.js'


dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser());


app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{

    console.log(`Server is running the port : ${PORT}`)
    connectDB();
});