import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    variant: {
      size: { type: Number, required: true },
      price: { type: Number, required: true },
      discountPrice: { type: Number },
      countInStock: { type: Number, required: true },
      images: { type: [String], required: false },
    },
  },
  { timestamps: true }
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [wishlistProductSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
