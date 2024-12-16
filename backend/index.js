import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// middlewares
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
