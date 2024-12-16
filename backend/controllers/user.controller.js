import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    // check all fields must be present
    if (!userName || !email || !password) {
      return res.status(422).json({
        error: "All fields are required like (email,password,userName)",
      });
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


export const userController = {
    register
}