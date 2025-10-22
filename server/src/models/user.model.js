import mongoose from "mongoose";
import ShortUniqueId from "short-unique-id";


const uid = new ShortUniqueId({ length: 6 });

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
  landmark: {
    type: String,
  },
  country: {
    type: String,
    default: "India",
  },
 
});

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userID: {
      type: String,
      unique: true
    },
    hospitalID :{
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default : "Male"
    },
    bloodGroup: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      default: "user",
    },
    address: { 
      type: addressSchema,
       default: {}
       },

    
  },
  { timestamps: true }
);


userSchema.pre("save", function (next) {
  
  if (!this.userID) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, ""); // e.g. 20251016
    const randomCode = uid.rnd().toUpperCase(); // e.g. X8P3QZ

    console.log(currentDate)
    this.userID = `USER-${formattedDate}-${randomCode}`;
    console.log("UserID : ",this.userID)
  }

  next();
});



const Address = mongoose.model("Address", addressSchema);
const User = mongoose.model("User", userSchema);

export default User;
