import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (res: Response, userId: string): void => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const token = jwt.sign(
    { userId: userId.toString() },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
