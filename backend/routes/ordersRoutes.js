import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrders,
  updatePaymentMethod,
} from "../controllers/ordersController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getOrderById } from "../controllers/ordersController.js";
const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myOrders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/payment-method").post(updatePaymentMethod);

export default router;
