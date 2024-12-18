import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDb from "./db/db.config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { catchError } from "./utils/catchError";
dotenv.config();

// connected our database
connectDb();

const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.get(
  "/",
  catchError(async (req: Request, res: Response) => {
    res.status(200).json({ message: "successfull" });
    return;
  })
);

// error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`development server is running on ${port}`);
});
