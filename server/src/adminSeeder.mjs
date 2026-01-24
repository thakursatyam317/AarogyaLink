import express from 'express';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import ApiError from './utils/ApiError';
import ApiResponse from './utils/ApiResponse.js';

dotenv.config();


const createAdmin = async (req, res) =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({ email: 'admin@2005' });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            throw new ApiError(400, 'Admin user already exists.');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin2005', salt);
        const adminUser = new User({
            name: 'Admin',
            email: 'admin@2005',
            password: hashedPassword,
            role: 'admin',
        });

        await adminUser.save();
        
        console.log('Admin user created successfully.');

    } catch (error) {
        console.error('Error creating admin user:', error);
        throw new ApiError(500, 'Error creating admin user');
    }
    finally{
        await mongoose.disconnect();
        console.log('Disconnected from database.');
    }
}

createAdmin()