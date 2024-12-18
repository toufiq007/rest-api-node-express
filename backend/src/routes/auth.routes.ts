
import express from "express"
import { authController } from "../controllers/auth.controller"

const router = express.Router()

router.post('/register',authController.registerHandler)


export default router