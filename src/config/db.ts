import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

function getMongoUri(): string {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  return uri;
}

async function connectToDB() {
  try {
    await mongoose.connect(getMongoUri());
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

export { connectToDB };
