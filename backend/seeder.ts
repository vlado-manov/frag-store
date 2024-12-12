import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./testData/users.js";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();

const importData = async (): Promise<void> => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;
    console.log("Data Imported!");

    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);

    process.exit(1);
  }
};

const destroyData = async (): Promise<void> => {
  try {
    await User.deleteMany();
    console.log("Data Destroyed!");

    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);

    process.exit(1);
  }
};

process.argv[2] === "-d" ? destroyData() : importData();
