const mongoose = require("mongoose");
const uri = `${process.env.MONGO_URI}`;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = connectDB;
