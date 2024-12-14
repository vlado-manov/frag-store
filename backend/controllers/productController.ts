import express, { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";

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

export { createProduct };
