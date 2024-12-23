import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member",
    },
    "2faEnable" : {
      type:Boolean,
      default:false
    },
    "2faSecret" : {
      type:String,
      default:null
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
