import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: false },
  age: { type: Number, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  photo: {type:String}
});

export const StudentModel = mongoose.model("student", studentSchema );
