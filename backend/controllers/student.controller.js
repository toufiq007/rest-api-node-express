import { StudentModel } from "../models/student.models.js";

const registerStudent = async (req, res) => {
  try {
    const { name, age, phone, email, address } = req.body;
    const photoPath = req.file ? `${req.file.path}` : null;

    console.log({name,age,phone,email,address});

    // convert to our photo to base64 string format and then save to db
    // const photoBase64 = req.file ? req.file.buffer.toString("base64") : null;
    const newStudent = await StudentModel.create({
      name,
      age,
      phone,
      email,
      address,
      photo: 'this is the path',
      // photo: photoBase64,
    });
    console.log(newStudent)
    return res
      .status(201)
      .json({ message: "student created successfully", data: newStudent });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

export const studentController = {
  registerStudent,
};
