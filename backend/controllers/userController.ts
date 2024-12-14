import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import { Request, Response } from "express";

const authUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("Auth User");
});

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("Register User");
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("Logout User");
});

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.send("Get User Profile");
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (user) {
    return res.json(user);
  }
  res.status(404).json({ message: "User not found!" });
});

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({});
  res.json(users);
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("Update User");
});

const updateUserByAdmin = asyncHandler(async (req: Request, res: Response) => {
  res.send("Update User by Admin");
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("Delete User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserById,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
};
