const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { updateFullTreeInDB } = require("../services/fs");
const FileSystem = require("../models/FileSystem.model");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const refreshDB = async () => {
  await FileSystem.collection.drop(); console.log('FileSystem.collection.drop()');
  const tree = await updateFullTreeInDB();
  console.log('TREE', tree);
};

module.exports = {connectDB, refreshDB};
