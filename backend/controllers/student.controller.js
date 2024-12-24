import { StudentModel } from "../models/student.models.js";

const registerStudent = async (req, res) => {
  try {
    const { name, age, phone, email, address } = req.body;
    const newStudent = await StudentModel.create({
      name,
      age,
      phone,
      email,
      address,
    });
    return res
      .status(200)
      .json({ message: "student created successfully", data: newStudent });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};



export const studentController = {
    registerStudent
}