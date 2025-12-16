import mongoose from "mongoose";
import User from "./user.model.js";

const patientDetailsSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  gender: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  userID: {
    type: String,
  },
  user_id:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  age: {
    type: String,
  },
});

const doctorDetailsSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  specialization: {
    type: String,
  },
  doctorID: {
    type: String,
  },
  user_id:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profilePic: {
    type: String,
  },
});

const prescriptionSchema = new mongoose.Schema(
  {
    patientDetail: {
      type: patientDetailsSchema,
      default: {},
    },
    doctorDetail: {
      type: doctorDetailsSchema,
      default: {},
    },

    prescriptionpdf : {
        type : String
    },


  },
  {
    timestamps: true,
  }
);


const Preception = mongoose.model("Preception", prescriptionSchema);

export default Preception;
