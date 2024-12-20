import mongoose, { Document, Schema, SchemaDefinitionProperty } from "mongoose";

interface IReview {
  user: SchemaDefinitionProperty<string>;
  name: string;
  rating: number;
  comment: string;
  // createdAt?: Date;
}

interface IVariant {
  size?: string;
  price?: number;
  discountPrice?: number;
  countInStock?: number;
  images?: string[];
  video?: string;
  onSale?: boolean;
}

interface IProduct extends Document {
  name: string;
  description: string;
  brand: string;
  category: "designer" | "niche" | "arabic";
  gender: "male" | "female" | "unisex";
  rating?: number;
  numReviews?: number;
  reviews?: IReview[];
  variants: IVariant[];
  // createdAt?: Date;
  // updatedAt?: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const variantSchema = new Schema<IVariant>(
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

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
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

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
