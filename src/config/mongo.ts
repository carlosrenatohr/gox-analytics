import mongoose from "mongoose";
import dotenv from "dotenv";

// -- Load environment variables --
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env file");
}

// -- Connect to MongoDB --
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB at ${mongoose.connection.host}:${mongoose.connection.port}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
