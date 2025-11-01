import mongoose from "mongoose";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 6 });

const userDetailsSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
  profilePic: {
    type: String,
  },
});

const doctorSchema = new mongoose.Schema(
  {
    doctorID: {
      type: String,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userDetails: {
      type: userDetailsSchema,
      default: {},
    },
    hospitalID: {
      type: String,
      
    },
    specialization: {
      type: String,
    },
    experience: {
      type: String,
      default: "0",
    },
    consultationFee: {
      type: String,
      default: "0",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    startingTiming: {
      type: String,
    },
    endingTiming: {
      type: String,
    },
  },
  { timestamps: true }
);


doctorSchema.pre("save", function (next) {
  if (!this.doctorID) {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomCode = uid.rnd().toUpperCase();
    this.doctorID = `DOC-${dateStr}-${randomCode}`;
  }
  next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
