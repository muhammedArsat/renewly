import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: 6,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    profile: {
      type: String,
      default: null,
    },
    phoneNo: {
      type: String,
      required: [true, "User phone number is required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

//{name:'Jhon Deo', email:'jhondeo@gmail.com',password:'password'}
