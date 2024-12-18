import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId:{
      type:String,
      required:true,
    },
    refreshToken: {
      type:String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserRefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
