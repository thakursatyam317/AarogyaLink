import mongoose from "mongoose";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 6 });

const doctorSchema = new mongoose.Schema(
  {
    doctorID: {
      type: String,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hospitalID: {
      type: String,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      default: 0, // years of experience
    },
    consultationFee: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

doctorSchema.pre("save",(next)=>{
    if(!this.doctorID){
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const randomCode = uid.rnd().toUpperCase();
        this.doctorID = `DOC-${dateStr}-${randomCode}`;
    }
    next();
})

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
