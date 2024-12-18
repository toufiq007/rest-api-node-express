import { User } from "../models/user.models.js";

export const isAuthorized = (roles = []) => {
  return async function (req, res, next) {
    try {
      const findUser = await User.findOne({ _id: req.user.id });
      // check if the user is not present or user roles is not present in the roles array then user should be unauthorized user
      if (!findUser || !roles.includes(findUser.role)) {
        return res.status(403).json({ error: "Unauthorized user" });
      }
      next();
    } catch (err) {
      console.log(err);
    }
  };
};
