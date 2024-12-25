import { StudentModel } from "../models/student.models.js";

const registerStudent = async (req, res) => {
  try {
    const { name, age, phone, email, address } = req.body;
    console.log(req.file);
    // const photoPath = req.file.path
    // convert to our photo to base64 string format and then save to db
    const photoBase64 = req.file ? req.file.buffer.toString("base64") : null;
    const newStudent = await StudentModel.create({
      name,
      age,
      phone,
      email,
      address,
      //   photo:photoPath
      photo: photoBase64,
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
  registerStudent,
};
