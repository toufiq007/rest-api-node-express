import mongoose from "mongoose";

const invalidTokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  exprirationTime:{
    type:String,
    required:true
  }
});

export const UserInvalidToken = mongoose.model(
  "InvalidUserToken",
  invalidTokenSchema
);
