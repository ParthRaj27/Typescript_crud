import mongoose from "mongoose";
// Connect to MongoDB


const connectDB = async (MONGO_URI:any) => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
