import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getWishlistProducts,
  addToWishlist,
  syncWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
const router = express.Router();

router
  .route("/")
  .delete(protect, removeFromWishlist)
  .post(protect, addToWishlist)
  .get(protect, getWishlistProducts);
router.route("/sync").post(protect, syncWishlist);

export default router;
