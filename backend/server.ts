import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();
import connectDB from "./config/db";
connectDB();
const port = process.env.PORT || 5000;
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("API is running!");
});

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
