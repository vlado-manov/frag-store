import express from "express";
import {
  createProduct,
  createReview,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController";
const router = express.Router();
router.route("/").post(createProduct).get(getProducts);
router
  .route("/:id")
  .delete(deleteProduct)
  .get(getProductById)
  .put(updateProduct);
router.route("/:id/reviews").post(createReview);

export default router;
