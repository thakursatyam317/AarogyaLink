import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinary from "../configs/cloudinary.js";

//the user
const getUserProfile = async (req, res, next) => {
  try {
    const userID = req.user?.id || req.user?._id;
    console.log("req.user _id:", req.user?._id);
    console.log("req.user id:", req.user?.id);

    if (!userID) {
      throw new ApiError(400, "User id is required");
    }

    const user = await User.findById(userID).select("-password");
    console.log(user);

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, "User profile fetched successfully", user));
    next();
  } catch (error) {
    next(
      new ApiError(
        500,
        "Server error getting user profile",
        false,
        error.message
      )
    );
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { userName, email, phoneNumber, dob, gender } = req.body;
    const photo = req.file;

    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    if (!userName || !email || !phoneNumber) {
      return res.status(400).json({
        message: "Please fill required fields: userName, email, phoneNumber",
      });
    }

    let profilePicUrl = req.user.profilePic;

    if (photo) {
      // convert file to data URI
      const base64Image = photo.buffer.toString("base64");
      const dataUri = `data:${photo.mimetype};base64,${base64Image}`;

      try {
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "aarogyalinkTwo",
          width: 300,
          height: 300,
          crop: "fill",
        });
        console.log("result :== ",result);
        if (!result?.secure_url) {
          return res.status(500).json({ message: "Failed to upload image" });
        }

        profilePicUrl = result.secure_url;
      } catch (cloudErr) {
        console.error("❌ Cloudinary Upload Error:", cloudErr);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        userName,
        email,
        phoneNumber,
        dob,
        gender,
        profilePic: profilePicUrl,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "User updated successfully",
      updatedUser,
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error updating profile" });
  }
};

export { getUserProfile, updateUserProfile };
