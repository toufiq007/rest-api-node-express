import express from "express"
import { studentController } from "../controllers/student.controller.js"


const router = express.Router()

router.post('/create-student',studentController.registerStudent)
 
export default router