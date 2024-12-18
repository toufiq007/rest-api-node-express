import { catchError } from "../utils/catchError";
import { z } from "zod";

// registerSchema with zod
const registerScheam = z
  .object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords donot matched",
    path: ["confirmPassword"],
  });

const registerHandler = catchError(async (req, res, next) => {
  const request = registerScheam.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // services
});

export const authController = {
  registerHandler,
};
