import express, { Application } from "express";
import dotenv from "dotenv";
import connectDb from "./db/db.config";
import cors from "cors";
import cookieParser from "cookie-parser";
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

app.listen(port, () => {
  console.log(`development server is running on ${port}`);
});
