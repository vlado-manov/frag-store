import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getWishlistProducts,
  addToWishlist,
  syncWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
import {
  wishlistLimiter,
  syncWishlistLimiter,
} from "../middleware/rateLimitMiddleware.js";
const router = express.Router();

router
  .route("/")
  .delete(protect, wishlistLimiter, removeFromWishlist)
  .post(protect, wishlistLimiter, addToWishlist)
  .get(protect, getWishlistProducts);
router.route("/sync").post(protect, syncWishlistLimiter, syncWishlist);

export default router;
