import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      enum: ["Male", "Female", "Other"],
     
    },
    bloodGroup: {
      type: String,
    },
    role: {
      enum: ["user", "doctor", "admin"],
      
    },
    phoneNumber: {
      type: String,
      required: true
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addressSchema",
    },
  },
  { timestamps: true }
);

const addressSchema = new mongoose.Schema({
  houseNumber: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
    default: "India",
  },
  addressType: {
    type: String,
    enum: ["Home", "Work", "Other"],
    
  },
});

const User = mongoose.model("User", authSchema);
export default User;
