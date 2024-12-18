import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDb from "./db/db.config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
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

// routs
app.use('/api/auth',authRoutes)

const port = process.env.PORT || 5000;


// error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`development server is running on ${port}`);
});
