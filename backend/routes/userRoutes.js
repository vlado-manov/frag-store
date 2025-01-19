import express from "express";
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
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  loginLimiter,
  registerLimiter,
} from "../middleware/rateLimitMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(registerLimiter, registerUser)
  .get(protect, admin, getUsers);
router.route("/login").post(loginLimiter, authUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUser);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserByAdmin);

export default router;
