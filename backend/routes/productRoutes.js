import express from "express";
import {
  createProduct,
  createReview,
  deleteProduct,
  getBrandProducts,
  getBrands,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, admin, createProduct).get(getProducts);
router.route("/brands").get(getBrands);
router.route("/brands/:brand").get(getBrandProducts);
router
  .route("/:id")
  .delete(protect, admin, deleteProduct)
  .get(getProductById)
  .put(protect, admin, updateProduct);
router.route("/:id/reviews").post(protect, createReview);

export default router;
