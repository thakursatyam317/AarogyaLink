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

//  Get Doctor Details by ID
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
    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }
    //it is not working

    res
      .status(200)
      .json(new ApiResponse(true, "Doctor profile Get sucessfully", doctor));
  } catch (error) {
    console.error("Error fetching doctor details by user ID:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching doctor details",
    });
  }
};

// Update Doctor Profile
export const updateDoctorProfile = async (req, res) => {
  try {
    const {
      userName,
      email,
      phoneNumber,
      dob,
      gender,
      startTime,
      endTime,
      hospitalID,
      holidays,
      specialization,
      experience,
      consultationFee,
      description,
    } = req.body;
    console.log("Request body:", req.body);

    const user_id = req.user?._id || req.user?.id;
    console.log("Logged-in userId:", user_id);
    console.log("Holidays:", typeof holidays, holidays);
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
        startTime,
        endTime,
        holidays,
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

export const getDoctorList = async (req, res) => {
  try {
    const user_id = req.user?._id || req.user?.id;

    const user = await User.findById(user_id);
    console.log("Found user:-- ", user);

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    //there was use a pipeline for 2-3 days after
    const doctors = await Doctor.find();

    // const doctors = await Doctor.aggregate([
    //   {

    //   }
    // ]);
    console.log("Found doctors:", doctors);

    res
      .status(200)
      .json(new ApiResponse(200, "Doctor list fetched successfully", doctors));
  } catch (error) {
    console.error("Error fetching doctor list:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching doctor list",
    });
  }
};

export const getDoctorDetailsByID = async (req, res) => {
  try {
    const doctorID = req.params.id ;
    console.log("Fetching details for Doctor ID:", doctorID);
    console.log(doctorID);
    console.log(req.params.appointments);
    console.log("Soemething");
    
    if (!doctorID) {
      throw new ApiError(400, "Doctor ID is required");
    }

    const doctor = await Doctor.findOne({ doctorID: doctorID }).select(
      "-password"
    );
    console.log(doctor);
    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Doctor details fetched successfully", doctor)
      );
  } catch (error) {
    console.error("Error fetching doctor details by ID:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Server error while fetching doctor details by ID")
      );
  }
};

export const getDoctorAppointmentDetails = async (req, res) => {
  try {
    const doctorID = req.params.id;
    console.log("Fetching appointment details for Doctor ID:", doctorID);

    if (!doctorID) {
      throw new ApiError(400, "Doctor ID is required");
    }
    const doctor = await Doctor.findOne({ doctorID: doctorID });
    console.log(doctor);

    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Doctor appointment details fetched successfully",
          doctor
        )
      );
  } catch (error) {
    console.error("Error fetching doctor appointment details:", error);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Server error while fetching doctor appointment details"
        )
      );
  }
};


//for today night is completing this function
export const getPatientsAppointedToDoctor = async (req, res) => {
  try {
    const doctor_id = req.user?._id || req.user?.id;
    console.log("Fetching patients for Doctor ID:", doctor_id);
    if (!doctor_id) {
      throw new ApiError(400, "Doctor ID is required");
    }
    const doctor = await Doctor.findOne({ user_id: doctor_id });
    console.log(doctor);

    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Patients appointed to doctor fetched successfully",
          doctor.appointments
        )
      );

  } catch (error) {
    console.error("Error fetching patients appointed to doctor:", error);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Server error while fetching patients appointed to doctor"
        )
      );
  }
};
