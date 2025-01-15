import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import Wishlist from "../models/wishListModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new product
// @route   POST /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, brand, category, gender, variants } = req.body;

  if (!name || !description || !brand || !category || !gender || !variants) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const normalizedBrand = brand
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  if (!Array.isArray(variants) || variants.length === 0) {
    res.status(400);
    throw new Error("At least one variant is required");
  }

  const validVariants = (variants || [])
    .map((variant) => {
      const { size, price, countInStock, images, onSale, video } = variant;

      if (!size || !price || !countInStock) {
        res.status(400);
        throw new Error("Size, Price and Quantity are required fields.");
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
    brand_slug: normalizedBrand,
    category,
    gender,
    rating: 0,
    numReviews: 0,
    reviews: [],
    variants: validVariants,
  });

  const createdProduct = await product.save();

  if (createdProduct) {
    return res.status(200).json(createdProduct);
  } else {
    res.status(400);
    throw new Error("Failed to create a product");
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  res.send("Update product");
});

// @desc    Delete product
// @route   DEL /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted!" });
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

// @desc    Create new review
// @route   PUT /api/products/:id/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const user = req.user;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("User already reviewed this product");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: user._id,
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
});

// @desc    Add to wishlist
// @route   POST /api/products/wishlist
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId, variant } = req.body;
  const userId = req.user._id;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let wishlist = await Wishlist.findOne({ user: userId });
  const wishlistProduct = {
    productId: product._id,
    name: product.name,
    rating: product.rating,
    brand: product.brand,
    variant: {
      size: variant.size,
      price: variant.price,
      discountPrice: variant.discountPrice,
      countInStock: variant.countInStock,
      images: variant.images,
    },
  };
  if (!wishlist) {
    wishlist = new Wishlist({
      user: userId,
      products: [wishlistProduct],
    });
    await wishlist.save();
    return res.status(201).json(wishlist);
  }
  const alreadyInWishlist = wishlist.products.some(
    (item) =>
      item.productId.toString() === productId &&
      item.variant.size === variant.size
  );

  if (alreadyInWishlist) {
    res.status(400);
    throw new Error("Product with this variant is already in wishlist");
  }

  wishlist.products.push(wishlistProduct);

  await wishlist.save();
  res.status(200).json(wishlist);
});

// @desc    Get wishlist
// @route   GET /api/products/wishlist
// @access  Private
const getWishlistProducts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const wishlist = await Wishlist.findOne({ user: userId });
  res.status(200).json(wishlist);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
  addToWishlist,
  getWishlistProducts,
};
