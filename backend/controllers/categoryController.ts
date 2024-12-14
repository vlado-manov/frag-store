import express, { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Category from "../models/categoryModel";

const getCategories = asyncHandler(async (req: Request, res: Response) => {
  res.send("Get categories");
});

const getCategory = asyncHandler(async (req: Request, res: Response) => {
  res.send("Get category");
});

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

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  res.send("Update category");
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  res.send("Delete category");
});

const getCategoryProducts = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("Get category products");
  }
);

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
};
