import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/db.config.js";
import studentRoutes from "./routes/student.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const app = express();

// database connection
connectDb();

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))

// router setup
app.use("/api", studentRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
