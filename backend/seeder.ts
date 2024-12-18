import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();

const importData = async (): Promise<void> => {
  try {
    // await User.deleteMany();
    await Product.deleteMany();

    // const createdUsers = await User.insertMany(users);
    const createdProducts = await Product.insertMany(products);

    // const adminUser = createdUsers[0]._id;
    console.log("Data Imported!");

    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);

    process.exit(1);
  }
};

const destroyData = async (): Promise<void> => {
  try {
    // await User.deleteMany();
    await Product.deleteMany();
    console.log("Data Destroyed!");

    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);

    process.exit(1);
  }
};

process.argv[2] === "-d" ? destroyData() : importData();
