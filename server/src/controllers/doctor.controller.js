import cloudinary from "../configs/cloudinary.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createDoctor = async (req, res) => {
  try {
    const user_id = req.user?._id || req.user?.id;
    console.log("Logged-in userId:", user_id);

    const newDoctor = await Doctor.create({
      user_id: user_id,
    });

    return res
      .status(201)
      .json(new ApiResponse(true, "Doctor created successfully", newDoctor));
  } catch (error) {
    console.error("❌ Create Doctor Error:", error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(false, error.message));
    }
    return res
      .status(500)
      .json(new ApiResponse(false, "Server error while creating doctor"));
  }
};

// ✅ Get Doctor Details by ID
export const getDoctorDetails = async (req, res) => {
  try {
    const user_id = req.user?._id || req.user?.id;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const doctor = await Doctor.findOne({ user_id: user_id });
    console.log("Found doctor:", doctor);
    //it is not working
    const doctorDetails = await Doctor.aggregate([
      // Match doctor by user ID
      {
        $match: {
          _id: new mongoose.Types.ObjectId(doctor._id),
        },
      },
      // Join with User collection
      {
        $lookup: {
          from: "users", // Collection name in MongoDB
          localField: "user_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      // Join with Hospital collection
      {
        $lookup: {
          from: "hospitals",
          localField: "hospitalID",
          foreignField: "_id",
          as: "hospitalDetails",
        },
      },
      {
        $unwind: {
          path: "$hospitalDetails",
          preserveNullAndEmptyArrays: true, // If doctor not yet assigned hospital
        },
      },
      // Optional: remove sensitive fields
      {
        $project: {
          "userDetails.password": 0,
          "userDetails.__v": 0,
          "hospitalDetails.__v": 0,
          __v: 0,
        },
      },
    ]);
    console.log("Aggregated doctor details:", doctorDetails);

    if (!doctorDetails.length) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found for this user ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor details fetched successfully",
      data: doctorDetails[0],
    });
  } catch (error) {
    console.error("Error fetching doctor details by user ID:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching doctor details",
    });
  }
};

// ✅ Update Doctor Profile
export const updateDoctorProfile = async (req, res) => {
  try {
    const {
      userName,
      email,
      phoneNumber,
      dob,
      gender,
      startingTiming,
      endingTiming,
      hospitalID,
      doctorID,
      specialization,
      experience,
      consultationFee,
      description,
    } = req.body;
    console.log("Request body:", req.body);

    const user_id = req.user?._id || req.user?.id;
    console.log("Logged-in userId:", user_id);

    if (!user_id) {
      throw new ApiError(401, "Unauthorized User");
    }

    if (!userName || !email || !phoneNumber) {
      throw new ApiError(400, "Please fill all required fields");
    }

    const doctor = await Doctor.findOne({ user_id: user_id });
    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    const user = await User.findById(user_id);
    console.log("Found user:", user);

    // Update Doctor details
    const updatedDoctorProfile = await Doctor.findOneAndUpdate(
      { user_id: user_id },
      {
        userDetails: {
          userName,
          email,
          phoneNumber,
          dob,
          gender,
          profilePic: user.profilePic,
          userID: user.userID,
        },
        startingTiming,
        endingTiming,
        hospitalID,
        specialization,
        experience,
        consultationFee,
        description,
        
      },
      { new: true }
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Doctor profile updated successfully",
          updatedDoctorProfile
        )
      );
  } catch (error) {
    console.error("❌ Update Doctor Profile Error:", error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(false, error.message));
    }
    return res
      .status(500)
      .json(new ApiResponse(false, "Server error while updating profile"));
  }
};
