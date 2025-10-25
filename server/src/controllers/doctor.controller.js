import cloudinary from "../configs/cloudinary.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const updateDoctorProfile = async () => {
  try {
    const {
      userName,
      email,
      phoneNumber,
      dob,
      gender,
      timingStartToEnd,
      hospitalID,
      doctorID,
      specialization,
      experience,
      consultationFee,
      description,
    } = req.body;

    console.log("Doctor ID :- ", doctorID);
    const photo = req.file;
    const userId = req.user?._id || req.user?.id;
    console.log("req.user?._id :- ", req.user?._id);
    console.log("req.user?.id :- ", req.user?.id);

    if (!userId) {
      throw new ApiError(401, "Unauthorized User");
    }

    if (!userName || !email || !phoneNumber) {
      throw new ApiError(400, "Please filled all the required Field");
    }

    let profilePicUrl = req.user.profilePic;
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
          return res.status(500).json({ message: "Failed to upload image" });
        }

        profilePicUrl = result.secure_url;
      } catch (cloudErr) {
        console.error("❌ Cloudinary Upload Error:", cloudErr);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    const doctor = await Doctor.find({ email });
    const doctor_id = doctor?._id;

    const updatedDoctorProfile = await Doctor.findByIdAndUpdate(
      doctor_id,
      {
        userName,
        email,
        phoneNumber,
        dob,
        gender,
        timingStartToEnd,
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
    console.log("updatedDoctorProfile :- ", updatedDoctorProfile);

    return res.status(200).json({
      message: "User updated successfully",
      updatedDoctorProfile,
    });
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Server Error for Updating Profile");
  }
};


export {updateDoctorProfile}
