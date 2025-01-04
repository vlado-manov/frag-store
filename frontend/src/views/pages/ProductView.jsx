import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetProductQuery,
} from "../../slices/productSlice";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";
import { Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Message from "../../components/ui/Message";
import Loader from "../../components/ui/Loader";
import { formatDistanceToNow, parseISO, format } from "date-fns";

const labels = {
  0: "Useless",
  1: "Poor",
  2: "Could be better",
  3: "Good",
  4: "Verry good",
  5: "Excellent",
};

const formatDate = (dateString) => {
  const now = new Date();
  const postedDate = parseISO(dateString);

  const distance = formatDistanceToNow(postedDate, { addSuffix: true });

  if (now - postedDate <= 2 * 24 * 60 * 60 * 1000) {
    return distance;
  } else {
    return format(postedDate, "MM/dd/yyyy HH:mm");
  }
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ProductView = () => {
  const { id: productId } = useParams();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(-1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    refetch,
    error,
    isLoading,
  } = useGetProductQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const selectedVariant = product?.variants?.[selectedVariantIndex];

  const { userInfo } = useSelector((state) => state.auth);
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

  const addReview = async (e) => {
    e.preventDefault();
    console.log("UserInfo id:", userInfo);
    console.log("UserInfo id:", userInfo.name);
    console.log("UserInfo id:", userInfo._id);
    console.log("comment is:", comment);
    console.log("rating is:", rating);
    console.log("product id is:", productId);
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("You review have been submitted successfully");
      setRating(5);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
                            to={`/products/${product.category}`}
                            className="text-gray-500 hover:underline"
                          >
                            {product.category.charAt(0).toUpperCase() +
                              product.category.slice(1)}
                          </Link>
                        </li>
                        <span className="text-gray-400">/</span>
                        <li>
                          <Link
                            to={`/products/${product.brand}`}
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
                      {product.name} - {selectedVariant?.size}
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
                      ? "bg-rose-50"
                      : product.gender === "male"
                      ? "bg-sky-50"
                      : "bg-indigo-50"
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
                            to={`/products/${product.category}`}
                            className="text-gray-500 hover:underline"
                          >
                            {product.category.charAt(0).toUpperCase() +
                              product.category.slice(1)}
                          </Link>
                        </li>
                        <span className="text-gray-400">/</span>
                        <li>
                          <Link
                            to={`/products/${product.brand}`}
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
                      {product.name} - {selectedVariant?.size}
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
                    <h3 className="text-sm font-bold text-gray-800 mb-2">
                      SELECT SIZE
                    </h3>
                    <div className="flex gap-2">
                      {product.variants.map((variant, index) => (
                        <button
                          key={variant.size}
                          onClick={() => handleVariantChange(index)}
                          className={`px-4 py-2 border rounded-md ${
                            selectedVariant?.size === variant.size
                              ? "bg-black text-white"
                              : "bg-white text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          {variant.size}
                        </button>
                      ))}
                    </div>
                    <h6 className="text-xs mt-1 text-gray-500">
                      {selectedVariant &&
                      selectedVariant.countInStock !== undefined
                        ? selectedVariant.countInStock === 0
                          ? "Currently not in stock"
                          : selectedVariant.countInStock < 5
                          ? "Currently less than 5 in stock"
                          : "Currently there are 5 or more in stock"
                        : "No stock information available"}
                    </h6>
                  </div>

                  {/* Quantity Selection */}
                  {selectedVariant.countInStock === 0 ? (
                    <Message
                      severity="error"
                      // variant="outlined"
                      sx={{ marginBottom: 2 }}
                    >
                      This fragrance is currently out of stock
                    </Message>
                  ) : (
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-800 mb-2">
                        QUANTITY
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
                    <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
                      ADD TO CART
                    </button>
                    <button className=" bg-rose-500 py-3 px-5 rounded hover:bg-rose-400 transition">
                      <FaRegHeart className="text-white" />
                      {/* <FaHeart className="text-white" /> */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 pt-4 pb-8" ref={reviewsRef}>
            <div className="flex items-center justify-center">
              <div className="bg-white shadow-lg rounded-none lg:rounded-lg max-w-5xl flex w-full">
                <div className="relative w-full p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Reviews
                  </h2>
                  <div id="reviews" className="space-y-4">
                    {product.reviews?.map((review, key) => (
                      <div key={key} className="bg-gray-100 p-6 rounded-md">
                        <p className="text-md text-black font-bold mb-3">
                          {review.name} said:
                        </p>
                        <hr className="mb-3" />
                        <Rating
                          name="read-only"
                          value={review.rating}
                          size="small"
                          readOnly
                        />
                        <p className="text-gray-800">"{review.comment}"</p>
                        <p className="text-sm text-gray-500">
                          - {formatDate(review.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-gray-800">
                      Add a Review
                    </h3>
                    {loadingProductReview && <Loader />}
                    {userInfo ? (
                      <form className="space-y-4" onSubmit={addReview}>
                        <Box
                          sx={{
                            marginTop: 2,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            name="hover-feedback"
                            value={rating}
                            size="large"
                            defaultValue={5}
                            getLabelText={getLabelText}
                            onChange={(e, newValue) => {
                              setRating(newValue || 0);
                            }}
                            onChangeActive={(e, newHover) => {
                              setHover(newHover);
                            }}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                          {rating !== null && (
                            <Box sx={{ ml: 2 }}>
                              {labels[hover !== -1 ? hover : rating]}
                            </Box>
                          )}
                        </Box>
                        <textarea
                          className="w-full p-4 border rounded-md"
                          placeholder="Write your review here..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button
                          type="submit"
                          disabled={loadingProductReview}
                          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
                        >
                          Submit Review
                        </button>
                      </form>
                    ) : (
                      <Message
                        severity="info"
                        variant="standard"
                        sx={{ margin: 2 }}
                      >
                        Please{" "}
                        <Link to="/login" className="underline">
                          sign in
                        </Link>{" "}
                        to leave a review
                      </Message>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductView;
