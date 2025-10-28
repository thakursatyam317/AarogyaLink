import cloudinary from "../configs/cloudinary.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


// ✅ Get Doctor Details by ID
export const getDoctorDetails = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const doctor = await Doctor.findById(doctorId)
      .populate("hospitalId", "hospitalName hospitalCode location")
      .select("-password");

    if (!doctor) {
      return res
        .status(404)
        .json(new ApiResponse(false, "Doctor not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(true, "Doctor details fetched successfully", doctor));
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Server error while fetching doctor details"));
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
