import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import genAuthToken from "../configs/jwt.js";
import { sendVerificationCode } from "../middlewares/email.js";

const userRegister = async (req, res) => {
  try {
    const { userName, email, phoneNumber, password } = req.body;
    if (!userName || !email || !phoneNumber || !password) {
      throw new ApiError(400, "All fields are required");
    }
    console.log("email : ", email);
    const existingUser = await User.findOne({ email });
    console.log("existingUser : ", existingUser);
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
    const varificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newUser = await User.create({
      userName,
      email,
      phoneNumber,
      password: hashPassword,
      profilePic: profilePic,
      isVarified: false,
      varificationCode: varificationCode,
    });
    await newUser.save();
    sendVerificationCode(newUser.userName, newUser.email, varificationCode);
    // console.log(newUser.userID);

    console.log(newUser);
    // console.log(newUser.userID);
    if (!newUser) {
      throw new ApiError(500, "Unable to create user");
    }
    console.log(newUser.userID);
    console.log(newUser);
    res
      .status(200)
      .json(new ApiResponse(200, "User register sucessfully", newUser));
  } catch (error) {
    console.error("Registration error:", error);
    throw new ApiError(500, "Server error", false, error.message);
  }
};

export const verificationOfEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (otp != user.varificationCode) {
      throw new ApiError(409, "Please enter correct OTP");
    }

    if (!user) {
      throw new ApiError(409, "User is not  registered");
    }
    if (user.isVarified == true) {
      throw new ApiError(400, "You are Varified");
    }

    user.isVarified = true;
    await user.save();
    res
      .status(200)
      .json(new ApiResponse(200, "User register sucessfully", user));
  } catch (error) {
    console.error("Registration error:", error);
    throw new ApiError(500, "Server error", false, error.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email :", email);
    console.log("password :", password);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    console.log("user :", user);

    if (!user) {
      return res.status(404).json({ message: "User is not registered" });
    }

    if (user.isVarified === false) {
      // <- use your correct field name
      return res.status(400).json({ message: "Your email is not verified" });
    }


    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = genAuthToken(user._id, res);
    console.log("User ID :", user._id);
    console.log("Generated Token :", token);

    return res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const userLogout = async (req, res, next) => {
  try {
    console.log("I am goes to Logout");
    res.cookie("token", "", { expires: new Date(0) });
    res.status(200).json(new ApiResponse(200, "User logout sucessfully", null));
  } catch (error) {
    throw new ApiError(500, "Server error", false, error.message);
  }
};

const userForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email : ", typeof email);
    console.log("req.body : ", req.body);

    const user = await User.findOne({ email: email.toLowerCase() });
    console.log("user : ", user);
    if (!user) {
      throw new ApiError(404, "Email is not found");
    }
    console.log("email : ", typeof email);

    const varificationCode = Math.floor(
      100000 + Math.random() * 90000
    ).toString();
    console.log("varificationCode : ", varificationCode);

    user.varificationCode = varificationCode;
    await user.save();

    console.log(
      "varificationCode : ",
      varificationCode,
      " ",
      user.varificationCode
    );
    sendVerificationCode(user.userName, user.email, user.varificationCode);

    res.status(200).json(new ApiResponse(201, "Your OTP is send", user));
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          error.message || "Server error",
          null,
          false
        )
      );
  }
}

const userForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "Email is not found");
    }
    console.log("email : ", email);

    if (user.varificationCode != otp || user.varificationCode !== otp) {
      throw new ApiError(400, "Enter correct OTP", false);
    }
    res.status(200).json(201, "OTP is varified");
  } catch (error) {
    throw new ApiError(500, "Server error", false, error.message);
  }
};

const useChangePassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "Email is not found");
    }
    console.log("email : ", email);
    if (user.varificationCode != otp || user.varificationCode !== otp) {
      throw new ApiError(400, "Enter correct OTP", false);
    }
    console.log();
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    if (!hashPassword) {
      throw new ApiError(500, "Unable to hash the password");
    }
    console.log("hashPassword : ", hashPassword);

    user.password = hashPassword;
    await user.save();

    res.status(200).json(201, "Password is chnage");
  } catch (error) {
    throw new ApiError(500, "Server error", false, error.message);
  }
}

export {
  userRegister,
  userLogin,
  userLogout,
  userForgotPassword,
  userForgotPasswordOTP,
  useChangePassword,
  }
