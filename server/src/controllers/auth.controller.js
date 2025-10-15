import User from "../models/auth.model.js";
import bcrypt from 'bcrypt';
import ApiError from "../utils/ApiError.js";
import ApiResponse from '../utils/ApiResponse.js';


const userRegister = async (req, res)=>{
    try {
        const {userName, email, phoneNumber, password} = req.body;
        if(!userName || !email || !phoneNumber || !password){
            throw new ApiError(400, 'filled the required Field');
        }
        const existUser = await User.findOne({email});
        if(existUser){
            throw new ApiError(400, "User is already exist");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword =await bcrypt.hash(password, salt);
        const profilePic = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;

        const newUser = User.create(
            {
                userName,
                email,
                phoneNumber,
                password : hashPassword,
                profilePic : profilePic
            }
        );
         if(!newUser){
            throw new ApiError(500, 'Unable to create user');
        }
        console.log('after new user');

        res.status(200).json(
            new ApiResponse(200,'User register sucessfully', newUser)
        )
    } catch (error) {
        throw new ApiError(500, "Server Error",false, error.message);
    }
}









export {
userRegister
};