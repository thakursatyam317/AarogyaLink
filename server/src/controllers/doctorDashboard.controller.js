import User from "../models/user.model.js";
import Appointment from "../models/appointment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Doctor from "../models/doctor.model.js";

export const getDoctorDashboard = async (req, res) => {
  try {
    // const {user_id} = req.user;
    const user_id = "6968fc9fa5059dd0fd0aeb50";
    const user = await User.findById(user_id);

    console.log("Doctor ID:", user_id);
    console.log("User Data:", user);

    const doctor = await Doctor.findOne({ user_id: user_id });
    console.log("Doctor Data:", doctor);

    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }
    const appointment = await Appointment.find({ doctor_id: doctor._id });
    console.log("Appointments Data:", appointment);

    const doctorAppointments = await Appointment.aggregate([
      {
        $match: {
          doctor_id: doctor._id,
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // console.log("Doctor Appointments Aggregation Result:", doctorAppointments);
    console.log("Doctor Appointments Summary:", doctorAppointments);
    console.log("Doctor Dashboard Data:", {
      doctor: doctor,
      appointmentsSummary: doctorAppointments,
    });
    return res.status(200).json(
      new ApiResponse(200, "Doctor dashboard fetched successfully", {
        doctor: doctor,
        appointmentsSummary: doctorAppointments,
      }),
    );
  } catch (error) {
    console.error("Error fetching doctor dashboard:", error);
    throw new ApiError(500, "Server Error");
  }
};

export const notificationsCount = async (req, res) => {
  try {
    const user_id = req.user?._id || req.user?.id;
    console.log("User ID for Notifications Count:", user_id);
    const doctor = await Doctor.findOne({ user_id: user_id });
    console.log("Doctor ID for Notifications Count:", doctor._id);
    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }
    // const notifications = await Appointment.find({ doctor_id: doctor._id, status: "pending" });
    const notifications = await Appointment.aggregate([
      {
        $match: {
          doctor_id: doctor._id,
          status: "Scheduled",
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    console.log("Notifications Count:", notifications);
    return res.status(200).json(
      new ApiResponse(200, "Notifications count fetched successfully", {
        count: notifications,
      }),
    );
  } catch (error) {
    console.error("Error fetching notifications count:", error);
    throw new ApiError(500, "Server Error");
  }
};

export const todayTotalAppointments = async (req, res) => {
  try {
    const user_id = req.user?._id || req.user?.id;
    console.log("User ID for Notifications Count:", user_id);
    const doctor = await Doctor.findOne({ user_id: user_id });

    console.log("Doctor ID for Notifications Count:", doctor._id);

    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }
    // const notifications = await Appointment.find({ doctor_id: doctor._id, status: "pending" });
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const todayAppointments = await Appointment.aggregate([
      {
        $match: {
          doctor_id: doctor._id,
          status: "Scheduled",
          appointmentDate: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: "todayAppointments",
          count: { $sum: 1 },
        },
      },
    ]);
    console.log("Today's Appointments Count:", todayAppointments);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Today's appointments count fetched successfully",
          {todayAppointments: todayAppointments},
        ),
      );
  } catch (error) {
    console.error("Error fetching notifications count:", error);
    throw new ApiError(500, "Server Error");
  }
};
