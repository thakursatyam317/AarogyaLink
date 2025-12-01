import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema({
  amount: {
    type : Number,
  },
  currency: {
    type : String,
  },
  receipt: {
    type : String,
  },
  status: {
    type : String,
  },
  date: {
    type : Date,
  },
  paymentID  : {
    type : String,
  },

});

const patientDetailsSchema = new mongoose.Schema({
  fullName : {
    type : String,
  },
  email: {
    type : String,
  },
  phoneNumber: {
    type : String,
  },
  gender: {
    type : String,
  },
  profilePic : {
    type : String,
  },
  userID : {
    type : String,
  },

  age: {
    type : String,
  },
});

const doctorDetailsSchema = new mongoose.Schema({
  fullName : {
    type : String,  
  },
  email: {
    type : String,
  },
  specialization: {
    type : String,
  },
  doctorID : {
    type : String,
  },
  age: {
    type : Number,
  },
  gender: {
    type : String,
  },
  phoneNumber: {
    type : String,
  },
  profilePic : {
    type : String,
  },
});

const appointmentSchema = new mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Doctor ID = STRING like “DOC-20251105-QATMBZ”
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    patientDetail : {
      type : patientDetailsSchema,
      default: {},
    },
    doctorDetail : {
      type : doctorDetailsSchema,
      default: {},
    },

    // STORE doctor snapshot if needed (optional)
    doctor: {
      type: Object,
      default: {},
    },

    // STORE patient snapshot if needed (optional)
    patient: {
      type: Object,
      default: {},
    },

    appointmentDate: {
      type: String,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentDetails: {
      type: paymentDetailsSchema,
      default: {},
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
