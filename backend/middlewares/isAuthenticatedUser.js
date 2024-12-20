import jwt from "jsonwebtoken";
import { UserInvalidToken } from "../models/user.invalidToken";

// this is the middlewares to check if the user send verified accessToken or not
export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const acceesToken = req.headers.authorization;
    if (!acceesToken) {
      return res.status(401).json({ error: "token not found" });
    }
    if (await UserInvalidToken.findOne({acceesToken})) {
      return res.status(401).json({ error: "Token is invalid", code: "AccessTokenInvalid" });
    }
    const decodedToken = jwt.verify(
      acceesToken,
      process.env.ACCESS_TOKEN_SECRETS
    );
    // set also access token to the token
    req.accessToken = {value:acceesToken,expirationTime:decodedToken.exp}
    // set userId so that in controller user can be found from db by this id
    req.user = { id: decodedToken.userId };

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ error: "Token is expired", code: "AccessTokenExpired" });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ error: "Token is invalid", code: "AccessTokenInvalid" });
    } else {
      return res.status(500).json({ error: err.message });
    }
  }
};
