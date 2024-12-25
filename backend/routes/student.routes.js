import express from "express";
import { studentController } from "../controllers/student.controller.js";
import { upload } from "../middlewares/uploadFile.js";

const router = express.Router();

router.post(
  "/create-student",
  upload.single("image"),
  studentController.registerStudent
);

export default router;
