import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updatePaymentMethod,
} from "../controllers/ordersController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getOrderById } from "../controllers/ordersController.js";
import { cancelOrder } from "../controllers/ordersController.js";
const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myOrders").get(protect, getMyOrders);
router.route("/:id").put(protect, cancelOrder).get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/payment-method").put(protect, updatePaymentMethod);

export default router;
