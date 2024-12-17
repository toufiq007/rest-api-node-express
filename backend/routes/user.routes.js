import express from "express";
import { userController } from "../controllers/user.controller.js";
import { isAuthenticatedUser } from "../middlewares/isAuthenticatedUser.js";

const router = express.Router();

router.post("/auth/register", userController.register);
router.post('/auth/login',userController.login)
router.get('/user/profile',isAuthenticatedUser,userController.getUserProfile)


export default router