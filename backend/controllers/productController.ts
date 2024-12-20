import express, { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";

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

const createReview = asyncHandler(async (req: Request, res: Response) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
};
