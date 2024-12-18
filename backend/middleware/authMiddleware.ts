import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import User, { IUser } from "../models/userModel";
import { NextFunction, Response, Request } from "express";

interface DecodedToken {
  userId: string;
}
const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = req.cookies.jwt;
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET
        ) as DecodedToken;
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
          res.status(401);
          throw new Error("Not authorized, user not found");
        }
        req.currentUser = user;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
const admin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.currentUser && req.currentUser.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as admin");
    }
  }
);

export { protect, admin };
