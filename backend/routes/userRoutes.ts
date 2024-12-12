import express, { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find({});
    res.json(users);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.json(user);
    }
    res.status(404).json({ message: "User not found!" });
  })
);

export default router;
