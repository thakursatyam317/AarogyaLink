import cloudinary from "../configs/cloudinary.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";



export const createDoctor = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    console.log("Logged-in userId:", userId);

    
    const newDoctor = await Doctor.create({
      
      userID: userId,
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
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const doctorDetails = await Doctor.aggregate([
      // Match doctor by user ID
      {
        $match: {
         user: new mongoose.Types.ObjectId(userId)
        },
      },
      // Join with User collection
      {
        $lookup: {
          from: "users", // Collection name in MongoDB
          localField: "userID",
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

    const photo = req.file;
    const userId = req.user?._id || req.user?.id;
    console.log("Logged-in userId:", userId);
    console.log("Uploaded photo:", photo);
    if (!userId) {
      throw new ApiError(401, "Unauthorized User");
    }

    if (!userName || !email || !phoneNumber) {
      throw new ApiError(400, "Please fill all required fields");
    }

    // ✅ Find doctor linked to logged-in user
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    let profilePicUrl = doctor.profilePic;

    // ✅ If new photo uploaded → upload to Cloudinary
    if (photo) {
      const base64Image = photo.buffer.toString("base64");
      const dataUri = `data:${photo.mimetype};base64,${base64Image}`;

      try {
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "aarogyalinkTwo",
          width: 300,
          height: 300,
          crop: "fill",
        });
        if (!result?.secure_url) {
          throw new ApiError(500, "Failed to upload image");
        }

        profilePicUrl = result.secure_url;
      } catch (cloudErr) {
        console.error("❌ Cloudinary Upload Error:", cloudErr);
        throw new ApiError(500, "Image upload failed");
      }
    }

    // ✅ Update doctor details
    const updatedDoctorProfile = await Doctor.findByIdAndUpdate(
      doctor._id,
      {
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
        profilePic: profilePicUrl,
      },
      { new: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(true, "Doctor profile updated successfully", updatedDoctorProfile));

  } catch (error) {
    console.error("❌ Update Doctor Profile Error:", error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(new ApiResponse(false, error.message));
    }
    return res.status(500).json(new ApiResponse(false, "Server error while updating profile"));
  }
};
