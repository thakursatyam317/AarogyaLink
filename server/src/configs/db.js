import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

const connectDB = async (req, res)=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB is connected at ${conn.connection.host}`);
    } catch (error) {
        throw new ApiError(500,"MongoDB connection Faild");
    }
}
export default connectDB;