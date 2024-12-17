import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
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
    return res
      .status(200)
      .json({
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

export const userController = {
  register,
  login,
  getUserProfile,
};
