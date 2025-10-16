import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


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





export { getUserProfile };
