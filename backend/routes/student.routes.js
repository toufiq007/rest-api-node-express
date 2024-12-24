import express from "express"
import { studentController } from "../controllers/student.controller.js"


const router = express.Router()

router.post('/api/create-student',studentController.registerStudent)
