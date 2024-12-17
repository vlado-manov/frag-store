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
import { protect, admin } from "../middleware/authMiddleware";
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUser);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserByAdmin);

export default router;
