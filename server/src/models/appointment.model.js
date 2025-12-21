import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  currency: {
    type: String,
  },
  receipt: {
    type: String,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
  },
  paymentID: {
    type: String,
  },
  razorpay_payment_id: {
    type: String,
  },
});

const patientDetailsSchema = new mongoose.Schema({
  userName: {
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
    type: String, // this is not save in db
  },

  dob: {
    type: String, // this is not safe in db
  },
});

const doctorDetailsSchema = new mongoose.Schema({
  userName: {
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
  dob: {
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
    patientDetail: {
      type: patientDetailsSchema,
      default: {},
    },
    doctorDetail: {
      type: doctorDetailsSchema,
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
