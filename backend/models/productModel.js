import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const variantSchema = new mongoose.Schema(
  {
    size: { type: String, required: false },
    price: { type: Number, required: false },
    discountPrice: { type: Number, required: false },
    countInStock: { type: Number, required: false },
    images: { type: [String], required: false },
    video: { type: String, required: false },
    onSale: { type: Boolean, required: false },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    brand_slug: { type: String, required: true },
    category: {
      type: String,
      enum: ["designer", "niche", "arabic", "tester"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      required: true,
    },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    variants: [variantSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
