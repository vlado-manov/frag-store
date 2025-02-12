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
// @access  Private  const pageSize = 16;

const getMyOrders = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Order.countDocuments();
  const orders = await Order.find({ user: req.user._id })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({
      createdAt: -1,
    });
  res.status(200).json({ orders, page, pages: Math.ceil(count / pageSize) });
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

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log("ORDER IN BE IS:", order);
  console.log("REQ BODY IN BE IS:", req.body);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (req.body.paymentMethod === "creditCard") {
    order.paymentResult.stripe = {
      paymentIntentId: req.body.paymentIntentId,
      status: req.body.status,
      receiptUrl: req.body.receiptUrl,
    };
  } else if (req.body.paymentMethod === "paypal") {
    order.paymentResult.paypal = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
  } else {
    res.status(400);
    throw new Error("Invalid payment method");
  }

  order.orderStatus = "paid";
  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

export {
  addOrderItems,
  getMyOrders,
  getOrders,
  getOrderById,
  updatePaymentMethod,
  cancelOrder,
  updateOrderToPaid,
};
