import mongoose from "mongoose";
import { comparePassword, hashPassword } from "../utils/hashPassword";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (val: string) => Promise<Boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

// hash our password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hashPassword(this.password, 10);
  next();
});

//
userSchema.methods.comparePassword = async function (value: string) {
  return comparePassword(value, this.password);
};

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
