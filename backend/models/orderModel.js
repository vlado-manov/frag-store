import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        size: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
    shippingAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String, required: false },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    customerNotes: { type: String, default: null },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["stripe", "paypal"],
    },
    paymentResult: {
      stripe: {
        paymentIntentId: { type: String },
        status: { type: String },
        receiptUrl: { type: String },
      },
      paypal: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
      },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    discountApplied: {
      type: Number,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    promoCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PromoCode",
      default: null,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    cancellationReason: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
