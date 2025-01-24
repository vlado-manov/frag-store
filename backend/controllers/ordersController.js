import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    discountApplied,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else if (!itemsPrice || shippingPrice == null || !totalPrice) {
    res.status(400);
    throw new Error("Missing order price details");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      discountApplied,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get my orders
// @route   GET /api/orders/myOrders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// @desc    Update payment method for an order
// @route   PUT /api/orders/:id/payment-method
// @access  Private
const updatePaymentMethod = asyncHandler(async (req, res) => {
  const { paymentMethod } = req.body;
  const order = await Order.findById(req.params.id);
  if (order) {
    order.paymentMethod = paymentMethod;
    await order.save();
    res.status(200).json({ message: "Payment method updated successfully" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Cancel order
// @route   PUT /api/orders/:id
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.orderStatus = "cancelled";
    await order.save();
    res.status(200).json({ message: "Order was successfully cancelled!" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get list of orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrders,
  getOrderById,
  updatePaymentMethod,
  cancelOrder,
};
