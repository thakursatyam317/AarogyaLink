import express from 'express';
import User from './models/user.model.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import ApiError from './utils/ApiError.js';


// ({ path: "../../.env" }
dotenv.config({path: '../.env'});

 const createAdmin = async () => {
    try {
        console.log("Script started...");

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const existingAdmin = await User.findOne({ email: 'thakursatyam317@gmail.com' });

        if (existingAdmin) {
            console.log('Admin already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash('admin2005', 10);

        const adminUser = new User({
            userName: 'Admin',
            email: 'thakursatyam317@gmail.com',
            password: hashedPassword,
            role: 'admin',
            phoneNumber: '1234567890',
        });

        await adminUser.save();

        console.log("✅ Admin created");

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected");
    }
};

createAdmin();