import jwt from "jsonwebtoken";

// this is the middlewares to check if the user send verified accessToken or not
export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const acceesToken = req.headers.authorization;
    if (!acceesToken) {
      return res.status(401).json({ error: "token not found" });
    }
    const decodedToken = jwt.verify(
      acceesToken,
      process.env.ACCESS_TOKEN_SECRETS
    );
    // set userId so that in controller user can be found from db by this id
    req.user = { id: decodedToken.userId };

    next();
  } catch (err) {
    return res.status(401).json({ error: "unauthorized user" });
  }
};
