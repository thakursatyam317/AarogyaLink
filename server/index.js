import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import  connectDB from './src/configs/db.js'
import authRoute from './src/routes/auth.route.js'
import userRoute from './src/routes/user.route.js'
import cors from 'cors';


dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true })); 

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));

console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API key:", process.env.CLOUDINARY_API_KEY);
console.log("API secret:", process.env.CLOUDINARY_API_SECRET);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoute);
app.use('/api/user', userRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});