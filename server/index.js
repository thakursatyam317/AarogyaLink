import express from 'express';
import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
import  connectDB from './src/configs/db.js'



dotenv.config();
const app = express();

app.use(express.json());
// app.use(cookieParser());


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});