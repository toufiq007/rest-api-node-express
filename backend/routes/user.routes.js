import express from "express";
import { userController } from "../controllers/user.controller.js";
import { isAuthenticatedUser } from "../middlewares/isAuthenticatedUser.js";
import { isAuthorized } from "../middlewares/isAuthorized.js";

const router = express.Router();

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);
router.post('/auth/refresh-token',userController.refreshToken) // this is the route for refresh the token
router.get("/user", isAuthenticatedUser, userController.getAllUsers);
router.get("/user/profile", isAuthenticatedUser, userController.getUserProfile);
// this route only accessbile if the user is admin user
router.get(
  "/user/admin",
  isAuthenticatedUser,
  isAuthorized(["admin"]),
  userController.getAdminUser
);
// this route only accessbile if the user is admin or moderator user
router.get(
  "/user/admin/moderator",
  isAuthenticatedUser,
  isAuthorized(["admin", "moderator"]),
  userController.getAdminOrModerator
);

export default router;
