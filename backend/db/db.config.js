import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('database connected')
  } catch (err) {
    console.log(err);
  }
};
export default connectDb;
