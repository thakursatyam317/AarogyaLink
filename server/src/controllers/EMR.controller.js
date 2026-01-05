import Preception  from "../models/prescreption.model.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { userLogin } from "./auth.controller.js";




export const getDoctorPatientData =  async (req, res)=>{
    try {
        const user_id  = req.user.id;// doctor id
        if(!user_id){
            throw new ApiError(400, "Doctor id is not there");
        }
         console.log("Doctor id : ",user_id)
        const doctor = await Doctor.findOne({
            user_id : user_id
        })
         if(!doctor){
            throw new ApiError(400, "Doctor isnot found");
        }

        console.log("doctor is :", doctor);
   

        const prescreption = await Preception.aggregate([
            {
                $match : {
                    "doctorDetail.doctorID": doctor.doctorID
                }

            }
        ]);
        console.log("Prescreption : ",prescreption)

        return res.
        
        json(new ApiResponse(200, "the Emr is completely fetch", prescreption));
        

    } catch (error) {
        console.log("Doctor emr fecth problem");
        throw new ApiError(200, "Doctor emr is fetch problem", false, error);
        
    }

}