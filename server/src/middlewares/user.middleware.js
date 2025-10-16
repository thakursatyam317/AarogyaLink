import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

export const userProtection = async (req, res, next)=>{
    try {
        const token = req.cookies.token;
        console.log("Token",token)
        if (!token) {
            throw new ApiError(401, "not authorized");
        }

        const decode = jwt.verify(token,  process.env.JWT_SECRET);
         console.log("Decode the token : ", decode); // token decode and give the user_id and iat and exp
    if (!decode) {
      throw new ApiError(401, "not authorized, token failed");
    }
    
    const user = await User.findById(decode?.id );
    console.log("User :- ",user);
    if (!user) {
      throw new ApiError(404, "not authorized, user not found");
    }

    req.user = user;

    next();

    } catch (error) {
        throw new ApiError(
      400,
      "not authorized token failed",
      false,
      error.message
    );
    }
}