import express from "express";
import {
  addToWishlist,
  createProduct,
  createReview,
  deleteProduct,
  getProductById,
  getProducts,
  getWishlistProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, admin, createProduct).get(getProducts);
router
  .route("/wishlist")
  .post(protect, addToWishlist)
  .get(protect, getWishlistProducts);
router
  .route("/:id")
  .delete(protect, admin, deleteProduct)
  .get(getProductById)
  .put(protect, admin, updateProduct);
router.route("/:id/reviews").post(protect, createReview);

export default router;
