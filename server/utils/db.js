import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_CONNECTION);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};
