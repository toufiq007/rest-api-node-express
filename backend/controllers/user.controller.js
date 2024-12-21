import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRefreshToken } from "../models/user.refresh.model.js";
import { UserInvalidToken } from "../models/user.invalidToken.js";
import {authenticator} from "otplib"
import qrCode from "qrcode"

// get all user
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json({ message: "successfull", data: allUsers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const register = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    // check all fields must be present
    if (!userName || !email || !password) {
      return res.status(422).json({
        error: "All fields are required like (email,password,userName)",
      });
    }
    // check if the email is present in the database or not
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(409).json({ error: `email is already taken` });
    }
    // create user and save to the database
    // password must be hashed before save to the db
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check every fields are present or not
    if (!email || !password) {
      return res
        .status(422)
        .json({ message: "fields (email,password) are required" });
    }
    // check this email in the database is present or not
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(401).json({ error: "email or password is invalid" });
    }
    // compare password
    const isPasswordMatch = await bcrypt.compare(password, findUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "email or password is invalid" });
    }

    // all validation is ok and now generate json-web-token
    // send access token to the user
    const accessToken = jwt.sign(
      { userId: findUser._id },
      process.env.ACCESS_TOKEN_SECRETS,
      { subject: "accessApi", expiresIn: "1m" }
    );
    // send refresh token to the user
    const refreshToken = jwt.sign(
      { userId: findUser._id },
      process.env.REFRESH_TOKEN_SECRETS,
      { subject: "refreshApi", expiresIn: "5d" }
    );

    // also save this refreshToken to the db with the userId to the user
    await UserRefreshToken.create({ userId: findUser._id, refreshToken });

    return res.status(200).json({
      message: "user logged in successfully",
      id: findUser._id,
      userName: findUser?.userName,
      email: findUser?.email,
      role: findUser?.role,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// this is the protected route
// if the user send verified accesstoken then this route can be accessbile otherwise got unauthorized error
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(500).json({ error: "invalid access token" });
    }
    return res.status(200).json({
      success: true,
      id: findUser._id,
      email: findUser.email,
      userName: findUser.userName,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// if the user is admin then this controller will be executed
const getAdminUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ _id: req.user.id }).select(
      "-password"
    );
    return res.status(200).json({
      message: "admin user",
      data: {
        id: findUser._id,
        name: findUser.userName,
        email: findUser.email,
        role: findUser.role,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
// if the user is admin or moderator this controller will be executed
const getAdminOrModerator = async (req, res) => {
  try {
    const findUser = await User.findOne({ _id: req.user.id }).select(
      "-password"
    );
    return res.status(200).json({
      message: "moderator user",
      data: {
        id: findUser._id,
        name: findUser.userName,
        email: findUser.email,
        role: findUser.role,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return res
    .status(200)
    .json({ message: "Only admin and moderator can be access this routes" });
};

// routs for refreshToken
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not found" });
    }
    // verify the old refresh token
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRETS
    );

    // check the refresh token is present in the db or not
    const userRefreshToken = await UserRefreshToken.findOne({
      refreshToken,
      userId: decodedRefreshToken.userId,
    });

    if (!userRefreshToken) {
      return res
        .status(401)
        .json({ message: "refresh token is invalid or expired" });
    }
    // remove the previous refresh token
    await userRefreshToken.deleteOne({
      _id: userRefreshToken._id,
    });
    console.log(userRefreshToken);

    // after verification then generate a newAccessToken and newRefreshToken and send back this to the response
    const accessToken = jwt.sign(
      { userId: decodedRefreshToken.userId },
      process.env.ACCESS_TOKEN_SECRETS,
      { subject: "accessToken", expiresIn: "1m" }
    );
    const newRefreshToken = jwt.sign(
      { userId: decodedRefreshToken.userId },
      process.env.REFRESH_TOKEN_SECRETS,
      { subject: "refreshToken", expiresIn: "5d" }
    );

    // save the newGenerate new refresh token to the db
    await UserRefreshToken.create({
      userId: decodedRefreshToken.userId,
      refreshToken: newRefreshToken,
    });
    return res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    // if the error comes from jwt.verify then it should be the error
    if (
      err instanceof jwt.JsonWebTokenError ||
      err instanceof jwt.TokenExpiredError
    ) {
      return res
        .status(401)
        .json({ message: "refresh token is invalid or expired" });
    }
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// routes for 2FA
const twoFactorAuthentication = async (req,res)=>{
  try{
    // find logged in user
    const user = await User.find({_id: req.user.id})

  }catch(err){
    console.log(err)
    return res.status(500).json({error:err.message})
  }
}

// logout routes
const logout = async (req, res) => {
  try {
    console.log(req.accessToken)
    // remove every refresh token from the refreshToken collection
    await UserRefreshToken.deleteMany({ userId: req.user.id });

    // and also save this refresh token to the invalidToken collection
    await UserInvalidToken.create({
      userId: req.user.id,
      accessToken: req.accessToken.value,
      exprirationTime: req.accessToken.expirationTime,
    });

    // return response to the client
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

export const userController = {
  getAllUsers,
  register,
  login,
  getUserProfile,
  getAdminUser,
  getAdminOrModerator,
  refreshToken,
  logout,
  twoFactorAuthentication
};
