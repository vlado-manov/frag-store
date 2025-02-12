import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetProductQuery,
} from "../../slices/productSlice";
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa6";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
import Message from "../../components/ux/Message";
import Loader from "../../components/ux/Loader";
import Reviews from "../../components/Reviews";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import {
  useAddToWishlistMutation,
  useGetWishListProductsQuery,
  useRemoveFromWishlistMutation,
} from "../../slices/wishlistApiSlice";
import {
  addToLocalWishlist,
  removeFromLocalWishlist,
} from "../../slices/wishlistSlice";
import { toast } from "react-toastify";
import useDropDown from "../../hooks/useDropDown";
import CustomButton from "../../components/ui/CustomButton";

const ProductView = () => {
  const { id: productId } = useParams();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => !!state.auth.userInfo);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [_, setIsDropdownOpen] = useDropDown();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const {
    data: product,
    refetch,
    error,
    isLoading,
  } = useGetProductQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const selectedVariant = product?.variants?.[selectedVariantIndex];

  const reviewsRef = useRef(null);
  const handleVariantChange = (index) => {
    setSelectedVariantIndex(index);
    setQuantity(1);
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity > 0 && newQuantity <= selectedVariant.countInStock) {
      setQuantity(newQuantity);
    }
  };

  const scrollToReviews = () => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const images = [
    "https://www.parfimo.bg/data/cache/thumb_min500_max1000-min500_max1000-12/products/56279/1530460699/creed-aventus-parfyumna-voda-dla-mezczyzn-75-ml-238781.jpg",
    "https://essenceforhim.com/cdn/shop/files/Products_2_Creed_Aventus.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const { data: wishlistItems } = useGetWishListProductsQuery();

  useEffect(() => {
    const isProductInWishlist = wishlistItems?.products?.some(
      (item) =>
        item.productId === product?._id &&
        item.variant.size === selectedVariant.size
    );

    setIsInWishlist(isProductInWishlist);
  }, [wishlistItems, selectedVariant, product?._id]);

  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToWishlist] = useAddToWishlistMutation();

  const addToWishlistHandler = async () => {
    const productToAdd = {
      productId,
      variant: selectedVariant,
    };
    const localProductAdd = {
      productId,
      name: product.name,
      rating: product.rating,
      brand: product.brand,
      gender: product.gender,
      variant: {
        size: selectedVariant.size,
        price: selectedVariant.price,
        discountPrice: selectedVariant.discountPrice,
        countInStock: selectedVariant.countInStock,
        images: selectedVariant.images,
      },
    };
    try {
      if (isLoggedIn) {
        await addToWishlist(productToAdd).unwrap();
      }
      dispatch(addToLocalWishlist(localProductAdd));
      setIsInWishlist(true);
      toast.success("Product added to wishlist");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const removeFromWishlistHandler = async () => {
    try {
      if (isLoggedIn) {
        await removeFromWishlist({
          productId,
          size: selectedVariant.size,
        }).unwrap();
      }
      dispatch(
        removeFromLocalWishlist({
          productId,
          variant: { size: selectedVariant.size },
        })
      );
      setIsInWishlist(false);
      toast.success("Product removed from wishlist");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const addToCartHandler = () => {
    const itemToAdd = {
      _id: product._id,
      name: product.name,
      brand: product.brand,
      variant: {
        size: selectedVariant.size,
        price: selectedVariant.price,
        discountPrice: selectedVariant.discountPrice,
        countInStock: selectedVariant.countInStock,
        images: selectedVariant.images,
      },
      quantity,
    };
    dispatch(addToCart(itemToAdd));
    setIsDropdownOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="product-page relative">
          <div
            className={`absolute top-0 left-0 w-1/2 h-full ${
              product.gender === "female"
                ? "bg-rose-200"
                : product.gender === "male"
                ? "bg-sky-200"
                : "bg-indigo-200"
            }`}
          ></div>
          <div
            className={`absolute top-0 right-0 w-1/2 h-full ${
              product.gender === "female"
                ? "bg-rose-500"
                : product.gender === "male"
                ? "bg-sky-500"
                : "bg-indigo-500"
            }`}
          ></div>
          <div className="relative z-10 p-0 pb-4 md:p-4">
            <div className="flex items-center justify-center">
              <div className="bg-white shadow-lg rounded-none md:rounded-lg max-w-max md:max-w-5xl flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 p-6">
                  <div className="md:hidden">
                    <nav className="text-sm text-gray-600 mb-4 flex items-center justify-center">
                      <ul className="flex items-center flex-wrap gap-1">
                        <li>
                          <Link
                            to="/"
                            className="text-gray-500 hover:underline"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <span className="text-gray-400">/</span>
                        </li>
                        <li>
                          <Link
                            to="/products"
                            className="text-gray-500 hover:underline"
                          >
                            Fragrances
                          </Link>
                        </li>
                        <li>
                          <span className="text-gray-400">/</span>
                        </li>
                        <li>
                          <Link
                            to={`/products/categories/${product.category}`}
                            className="text-gray-500 hover:underline"
                          >
                            {product.category.charAt(0).toUpperCase() +
                              product.category.slice(1)}
                          </Link>
                        </li>
                        <span className="text-gray-400">/</span>
                        <li>
                          <Link
                            to={`/products/brands/${product.brand_slug}`}
                            className="text-gray-500 hover:underline"
                          >
                            {product.brand}
                          </Link>
                        </li>
                        <li>
                          <span className="text-gray-400">/</span>
                        </li>
                        <li className="text-gray-500 font-semibold">
                          {product.name}
                        </li>
                      </ul>
                    </nav>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      {product.name} - {selectedVariant?.size}ml
                    </h1>
                    <div className="text-center mb-4">
                      <h5 className="text-l font-semibold text-gray-500">
                        {product.brand}
                      </h5>
                      <div
                        className="flex justify-center items-center"
                        onClick={scrollToReviews}
                      >
                        <Rating
                          name="read-only"
                          value={product.rating}
                          size="small"
                          sx={{ marginTop: 1 }}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <hr className="mt-4 border-gray-300" />
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={images[currentIndex]}
                      alt={`Slide ${currentIndex + 1}`}
                      className="w-full h-auto object-cover h-full"
                    />
                    <button
                      onClick={handlePrev}
                      className="absolute left-1 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-700"
                    >
                      <FaChevronLeft size={40} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-700"
                    >
                      <FaChevronRight size={40} />
                    </button>
                    <div className="flex justify-center gap-2 absolute left-1/2 -translate-x-1/2 bottom-6">
                      {images.map((_, index) => (
                        <span
                          key={index}
                          onClick={() => handleDotClick(index)}
                          className={`w-3 h-3 rounded-full cursor-pointer ${
                            index === currentIndex
                              ? "bg-gray-900"
                              : "bg-gray-400"
                          } hover:bg-gray-600`}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-full md:w-1/2 p-8 ${
                    product.gender === "female"
                      ? "bg-rose-100"
                      : product.gender === "male"
                      ? "bg-sky-100"
                      : "bg-indigo-100"
                  }`}
                >
                  <div className="hidden md:block">
                    <nav className="text-sm text-gray-600 mb-4 flex items-center justify-center">
                      <ul className="flex items-center flex-wrap gap-1">
                        <li>
                          <Link
                            to="/"
                            className="text-gray-500 hover:underline"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <span className="text-gray-400">/</span>
                        </li>
                        <li>
                          <Link
                            to="/products"
                            className="text-gray-500 hover:underline"
                          >
                            Fragrances
                          </Link>
                        </li>
                        <li>
                          <span className="text-gray-400">/</span>
                        </li>
                        <li>
                          <Link
                            to={`/products/categories/${product.category}`}
                            className="text-gray-500 hover:underline"
                          >
                            {product.category.charAt(0).toUpperCase() +
                              product.category.slice(1)}
                          </Link>
                        </li>
                        <span className="text-gray-400">/</span>
                        <li>
                          <Link
                            to={`/products/brands/${product.brand_slug}`}
                            className="text-gray-500 hover:underline"
                          >
                            {product.brand}
                          </Link>
                        </li>
                        <li>
                          <span className="text-gray-400">/</span>
                        </li>
                        <li className="text-gray-500 font-semibold">
                          {product.name}
                        </li>
                      </ul>
                    </nav>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      {product.name} - {selectedVariant?.size}ml
                    </h1>
                    <div className="text-center mb-4">
                      <h5 className="text-l font-semibold text-gray-500">
                        {product.brand}
                      </h5>
                      <div
                        className="flex justify-center items-center"
                        onClick={scrollToReviews}
                      >
                        <Rating
                          name="read-only"
                          value={product.rating}
                          size="small"
                          sx={{ marginTop: 1 }}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <hr className="mt-4 border-gray-300" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <div className="text-2xl font-bold text-gray-800 mb-4">
                    ${selectedVariant?.price?.toFixed(2)}
                  </div>
                  <div className="mb-6">
                    <h3 className="text-sm font-roboto text-gray-800 mb-2">
                      Select size
                    </h3>

                    <div className="flex gap-4">
                      {product?.variants?.map((variant, index) => (
                        <div key={variant.size} className="flex items-center">
                          <input
                            type="radio"
                            id={`size-${variant.size}`}
                            name="size"
                            value={variant.size}
                            checked={selectedVariantIndex === index}
                            onChange={() => handleVariantChange(index)}
                            className="form-radio h-4 w-4 border-gray-900 checked:border-gray-900 checked:bg-gray-900"
                          />
                          <label
                            htmlFor={`size-${variant.size}`}
                            className="ml-1 font-roboto text-gray-800"
                          >
                            {variant.size}ml
                          </label>
                        </div>
                      ))}
                    </div>
                    {selectedVariant.countInStock > 0 && (
                      <h6 className="text-xs mt-1 text-gray-500">
                        {selectedVariant &&
                        selectedVariant.countInStock !== undefined
                          ? selectedVariant.countInStock < 5
                            ? "Currently less than 5 in stock"
                            : "Currently there are 5 or more in stock"
                          : "No stock information available"}
                      </h6>
                    )}
                  </div>

                  {selectedVariant.countInStock === 0 ? (
                    <Message severity="error" sx={{ marginBottom: 2 }}>
                      This fragrance is currently out of stock
                    </Message>
                  ) : (
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-800 mb-2">
                        Quantity
                      </h3>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          disabled={
                            quantity === 1 || selectedVariant.countInStock === 0
                          }
                          className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center hover:bg-gray-800"
                        >
                          -
                        </button>
                        <span className="text-lg">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          disabled={
                            quantity === selectedVariant.countInStock ||
                            selectedVariant.countInStock === 0
                          }
                          className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <CustomButton
                      disabled={selectedVariant.countInStock === 0}
                      onClick={addToCartHandler}
                      tw="w-full py-3"
                    >
                      Add to cart
                    </CustomButton>
                    <button
                      className=" bg-rose-500 py-2 px-5 rounded hover:bg-rose-400  transition-transform duration-100 ease-in-out transform active:scale-110"
                      onClick={
                        isInWishlist
                          ? () => removeFromWishlistHandler()
                          : () => addToWishlistHandler()
                      }
                    >
                      {isInWishlist ? (
                        <FaHeart className="text-white" size={24} />
                      ) : (
                        <FaRegHeart className="text-white" size={24} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 pt-4 pb-8" ref={reviewsRef}>
            <div className="flex items-center justify-center">
              <div className="bg-white shadow-lg rounded-none lg:rounded-lg max-w-5xl flex w-full">
                <Reviews
                  reviews={product.reviews}
                  productId={productId}
                  userInfo={userInfo}
                  createReview={createReview}
                  loadingProductReview={loadingProductReview}
                  refetch={refetch}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductView;
