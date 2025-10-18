import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import genAuthToken from '../configs/jwt.js'


const userRegister = async (req, res) => {
  try {
    const { userName, email, phoneNumber, password } = req.body;
    if (!userName || !email || !phoneNumber || !password) {
      throw new ApiError(400, "All fields are required");
    }
    console.log("email : ", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User is already  registered");
    }

    console.log(existingUser);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    if (!hashPassword) {
      throw new ApiError(500, "Unable to hash the password");
    }
    console.log("hashPassword : ", hashPassword);
    const profilePic = `https://api.dicebear.com/5.x/initials/svg?seed=${userName
      .charAt(0)
      .toUpperCase()}`;
    console.log("profile pic : ", profilePic);

    const newUser = await User.create({
      userName,
      email,
      phoneNumber,
      password: hashPassword,
      profilePic: profilePic,
    });
    // console.log(newUser.userID);
   
    console.log(newUser)
    // console.log(newUser.userID);
    if (!newUser) {
      throw new ApiError(500, "Unable to create user");
    }
    console.log(newUser.userID);
    console.log(newUser)
    res
      .status(200)
      .json(new ApiResponse(200, "User register sucessfully", newUser));
  } catch (error) {
     console.error("Registration error:", error);
    throw new ApiError(500, "Server error", false, error.message);
  }
};

const userLogin = async (req,res) =>{
    try {
        const {email, password} = req.body;
         console.log(email);
        if(!email || !password ){
            throw new ApiError(400, 'All fields are required');
        }
        console.log(email);
      
        
        const user = await User.findOne({email} );

        if(!user){
            throw new ApiError(404, 'User is not registered');
        }
        console.log('after existing user');
        const ispasswordMatch = await bcrypt.compare(password, user.password);
        if(!ispasswordMatch){
            throw new ApiError(400, 'Invalid credentials');
        }
        const token = genAuthToken(user._id, res);
        console.log(token);
        console.log('after password match');
        res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
    } catch (error) {
        throw new ApiError(500, 'Server error', false, error.message);
    }
}


const userLogout = async (req, res, next) =>{
    try {
      console.log("I am goes to Logout")
        res.cookie('token', '', {expires : new Date(0)});
        res.status(200).json(
            new ApiResponse(200, 'User logout sucessfully', null)
        )
        
        console.log("I am goes to Logout2")
    } catch (error) {
        throw new ApiError(500, 'Server error', false, error.message);
    }
}

export { userRegister, userLogin, userLogout};
