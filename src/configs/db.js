const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@blogcluster0.nyf2cbq.mongodb.net/${process.env.DB_NAME}?appName=BlogCluster0`;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = connectDB;