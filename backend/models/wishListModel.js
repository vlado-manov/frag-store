import mongoose from "mongoose";

const wishlistProductSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    brand: { type: String, required: true },
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

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [wishlistProductSchema],
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
