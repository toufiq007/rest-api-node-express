import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  //   console.log(`PATH: ${req.path}`, error);
  res.status(500).json({ message: "internal server error" });
};
