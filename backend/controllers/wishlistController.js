import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import Wishlist from "../models/wishListModel.js";

// @desc    Add to wishlist
// @route   POST /api/wishlist
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
    gender: product.gender,
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

// @desc    Remove from wishlist
// @route   DELETE /api/wishlist
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, size } = req.body;
  console.log("size is: ", size);
  console.log("id is: ", productId);
  // console.log("userIID is: ", userId);
  console.log("req body  is: ", req.body);
  if (!productId) {
    res.status(400);
    throw new Error("Product ID is required");
  }

  let wishlist = await Wishlist.findOne({ user: userId });
  // console.log("wishlist is: ", wishlist);

  if (!wishlist) {
    res.status(404);
    throw new Error("Wishlist not found");
  }

  const productIndex = wishlist.products.findIndex(
    (item) =>
      item.productId.toString() === productId && item.variant.size === size
  );
  // console.log("PRODUCT IS:", wishlist.products[5].name);
  // console.log("PRODUCT IS:", wishlist.products[5]);
  // console.log("PRODUCT IS:", wishlist.products[5].variant.size);
  // console.log("PRODUCT VARIANT IS:", item.variant);
  // console.log("PRODUCT SIZE  IS:", item.variant.size);
  if (productIndex === -1) {
    res.status(404);
    throw new Error("Product with this variant not found in wishlist");
  }

  wishlist.products.splice(productIndex, 1);

  if (wishlist.products.length === 0) {
    await Wishlist.deleteOne({ user: userId });
  } else {
    await wishlist.save();
  }

  res.status(200).json({ message: "Product removed from wishlist" });
});

// @desc    Get wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlistProducts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const wishlist = await Wishlist.findOne({ user: userId });
  res.status(200).json(wishlist);
});

// @desc    Sync wishlist
// @route   POST /api/wishlist/sync
// @access  Private
const syncWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { products } = req.body;
  console.log("USERID IS:", userId);
  console.log("prODUCTS IS:", products);
  let wishlist = await Wishlist.findOne({ user: userId });
  console.log("WISHLIST IS:", wishlist);
  console.log("WISHLIST ПРОДУЦТС IS:", wishlist.products);

  if (!wishlist) {
    wishlist = new Wishlist({
      user: userId,
      products: products,
    });
  } else {
    wishlist.products = [
      // ...wishlist.products,
      ...products.filter(
        (newProduct) =>
          !wishlist.products.some(
            (existingProduct) =>
              existingProduct.productId.toString() === newProduct.productId &&
              existingProduct.variant.size === newProduct.variant.size
          )
      ),
    ];
  }

  await wishlist.save();
  res.status(200).json(wishlist);
});

export { addToWishlist, getWishlistProducts, syncWishlist, removeFromWishlist };
