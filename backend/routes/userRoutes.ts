import express, { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserByAdmin,
} from "../controllers/userController";
const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(getUserProfile).put(updateUser);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUserByAdmin);

export default router;
