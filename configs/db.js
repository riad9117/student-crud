import mongoose from "mongoose";
import config from "./config.js";

const url = config.db.url;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connected...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
