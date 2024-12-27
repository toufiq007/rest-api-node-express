import { StudentModel } from "../models/student.models.js";

const registerStudent = async (req, res) => {
  try {
    const { name, age, phone, email, address } = req.body;
    const photoPath = req.file ? `${req.file.filename}` : null;

    // only send the file name to the mongodb and upload files to our server
    const newStudent = await StudentModel.create({
      name,
      age,
      phone,
      email,
      address,
      photo: photoPath,
    });
    console.log(newStudent);
    return res
      .status(201)
      .json({ message: "student created successfully", data: newStudent });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const allUsers = await StudentModel.find();
    return res.status(200).json({ message: "success", data: allUsers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export const studentController = {
  registerStudent,
  getAllStudents
};
