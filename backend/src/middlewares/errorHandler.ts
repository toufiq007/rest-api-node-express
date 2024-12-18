import { ErrorRequestHandler, Response } from "express";
import { z } from "zod";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
  return res.status(400).json({
    message: "Validation error",
    errors,
  });
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);

  if (error instanceof z.ZodError) {
    handleZodError(res, error);
    return;
  }

  res.status(500).send("Internal server error");
  return;
};
