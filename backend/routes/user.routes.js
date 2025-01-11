import { Router } from "express";
import { userController } from "../controller/user.controller.js";

const router = Router()

// api requests
router.post('/create-user',userController.createUser)

export default router