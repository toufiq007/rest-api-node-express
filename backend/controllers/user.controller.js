import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    const accessToken = jwt.sign(
      { userId: findUser._id },
      process.env.ACCESS_TOKEN_SECRETS,
      { subject: "accessApi", expiresIn: "1d" }
    );
    return res.status(200).json({
      message: "user logged in successfully",
      id: findUser._id,
      userName: findUser?.userName,
      email: findUser?.email,
      role: findUser?.role,
      accessToken,
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

export const userController = {
  getAllUsers,
  register,
  login,
  getUserProfile,
  getAdminUser,
  getAdminOrModerator,
};
