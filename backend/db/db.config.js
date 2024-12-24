import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "Students" });
    console.log("database connected successfully!");
  } catch (err) {
    console.log("Error connecting to database:", err.message);
    process.exit(1);
  }
};
export default connectDb;

// this is way to connect mongodb in the index.js file our server file
// mongoose.connect(process.env.MONGO_URI);
// mongoose.connection.on("connected", () => {
//   console.log("database connected new way");
//   console.log(`server is running on port ${port}`);
// });
// mongoose.connection.on("error", (err) => {
//   console.log("error occured during connection", err);
// });
