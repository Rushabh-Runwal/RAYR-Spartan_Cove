import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// const mongoUri = process.env.MONGO_URI;
const mongoUri =
  "mongodb+srv://yashashwin98:Test$1234@spartancove.r3sth.mongodb.net/?retryWrites=true&w=majority&appName=SpartanCove";
// console.log("mongoUri", mongoUri);
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // process code 1 code means exit with failure, 0 means success
  }
};
