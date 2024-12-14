import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  getCategoryProducts,
  updateCategory,
} from "../controllers/categoryController";
const router = express.Router();
router.route("/").post(createCategory).get(getCategories);
router.route("/:name").get(getCategoryProducts);
router
  .route("/:id")
  .delete(deleteCategory)
  .get(getCategory)
  .put(updateCategory);

export default router;
