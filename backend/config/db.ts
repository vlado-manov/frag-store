import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async (): Promise<void> => {
  console.log("Function is running");
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
