import express, { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Category from "../models/categoryModel";

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, image } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Category name is required");
  }

  const category = new Category({
    name,
    description,
    image,
  });

  const createdCategory = await category.save();
  if (createdCategory) {
    return res.status(201).json(createdCategory);
  } else {
    res.status(400);
    throw new Error("Failed to create category");
  }
});

export { createCategory };
