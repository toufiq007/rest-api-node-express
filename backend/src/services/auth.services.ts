import { UserModel } from "../models/user.model";
import { VerificationCodeModel } from "../models/verification.model";

type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};
const createAccount = async (data: CreateAccountParams) => {
  // verify existing user doesn't exist
  const existingUser = await UserModel.findOne({ email: data.email });
  if (!existingUser) {
    throw new Error("User already exists");
  }
  // create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });
  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: "email_verification",
    expiresAt: 864000,
  });
  // send verification email
  // create session
  
  // sign access token and refresh token
  // return user & tokens
};
