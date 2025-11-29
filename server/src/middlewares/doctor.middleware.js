import jwt from 'jsonwebtoken';
import Doctor from '../models/doctor.model.js';
import ApiError from '../utils/ApiError.js';


export const doctorProtection = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;   
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
    console.log("Decoded Token:", decoded);
    const user_id = decoded.id;
    console.log("Doctor User ID from Token:", user_id);
    const doctor = await Doctor.findOne({ user_id: user_id });
    if (!doctor) {
      return res.status(401).json({ message: "Not authorized, doctor not found" });
    }
    console.log("Authenticated Doctor:", doctor);
    
    req.doctor = doctor;
    console.log("Doctor attached to request:", req.doctor);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token verification failed" });
  }
};