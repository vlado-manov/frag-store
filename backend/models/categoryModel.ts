import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
  description?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema: Schema<ICategory> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
