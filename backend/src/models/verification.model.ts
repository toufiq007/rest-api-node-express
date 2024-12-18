import mongoose from "mongoose";

export interface VerificationModel extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: "email_verification" | "password_reset";
  expiresAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationModel>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, required: true, default: Date.now() },
  expiresAt: { type: Date, required: true },
});

export const VerificationCodeModel = mongoose.model<VerificationModel>(
  "VerificationCode",
  verificationCodeSchema
);
