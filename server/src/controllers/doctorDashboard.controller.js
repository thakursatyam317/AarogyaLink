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
                    doctor_id: doctor._id 
                } 
            },
            {
                $group: {
                    _id: "$status",
                    count: {
                         $sum: 1
                        }
                }
            },

        ]);

        console.log("Doctor Appointments Aggregation Result:", doctorAppointments);

        return res.
        status(200).
        json(
            new ApiResponse(200, "Doctor dashboard fetched successfully", {
            doctor: doctor,
            appointmentsSummary: doctorAppointments
        }));


        
    } catch (error) {
        console.error("Error fetching doctor dashboard:", error);
        throw new ApiError(500, "Server Error");
    }
}
