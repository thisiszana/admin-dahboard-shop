import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) retuen;

  mongoose.set("strictQuery", false);

  await mongoose.connectDB();
  console.log("Connect DB!");
};
