import express, { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";
import { IReview } from "../models/productModel";

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
});

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, brand, category, gender, variants } = req.body;

  if (!name || !description || !brand || !category || !gender || !variants) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  if (!Array.isArray(variants) || variants.length === 0) {
    res.status(400);
    throw new Error("At least one variant is required");
  }

  const validVariants = (variants || [])
    .map((variant: any) => {
      const { size, price, countInStock, images, onSale, video } = variant;

      if (!size || !price || !countInStock) {
        return null;
      }

      return {
        size,
        price,
        discountPrice: variant.discountPrice || price,
        countInStock,
        images: images || [],
        onSale: onSale || false,
        video: video || null,
      };
    })
    .filter(Boolean);

  if (validVariants.length === 0) {
    res.status(400);
    throw new Error("At least one valid variant is required");
  }

  const product = new Product({
    name,
    description,
    brand,
    category,
    gender,
    rating: 0,
    numReviews: 0,
    reviews: [],
    variants: validVariants,
  });

  const createdProduct = await product.save();

  if (createdProduct) {
    return res.status(201).json(createdProduct);
  } else {
    res.status(400);
    throw new Error("Failed to create a product");
  }
});

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  res.send("Update product");
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted!" });
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

const createReview = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { rating, comment }: { rating: number; comment: string } = req.body;

    const product = await Product.findById(req.params.id);

    if (!req.user || !req.user._id || !req.user.name) {
      res.status(400);
      throw new Error("User information is missing or incomplete");
    }

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review: IReview) => review.user.toString() === req.user?._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("User already reviewed this product");
      }

      const review: IReview = {
        name: req.user?.name,
        rating: Number(rating),
        comment,
        user: req.user._id.toString(),
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;

      await product.save();
      res.status(200).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Review was not added");
    }
  }
);

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
};
