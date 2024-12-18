import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/user.routes.js";
import connectDb from "./db/db.config.js";
dotenv.config();

const app = express();

// database connection
connectDb();

// middlewares
app.use(express.json());

// router setup
app.use("/api", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
