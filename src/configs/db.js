const mongoose = require("mongoose");
const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017/${process.env.MONGO_DB}?authSource=admin`;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = connectDB;
