import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetProductQuery,
} from "../../slices/productSlice";
import { FaRegHeart } from "react-icons/fa6";
import { Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Message from "../../components/ui/Message";
import Loader from "../../components/ui/Loader";

const labels = {
  0: "Useless",
  1: "Poor",
  2: "Could be better",
  3: "Good",
  4: "Verry good",
  5: "Excellent",
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
          <div className="relative z-10 min-h-screen p-4">
            <div className="flex items-center justify-center">
              <div className="bg-white shadow-lg rounded-lg max-w-6xl flex">
                <div className="relative w-1/2 p-6">
                  <img
                    src="https://img.freepik.com/premium-photo/isolated-perfume-bottle-white-background_875825-38234.jpg"
                    alt="Chanel Chance Perfume"
                    className="w-full h-auto object-cover h-full"
                  />
                  <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                    ❮
                  </button>
                  <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                    ❯
                  </button>
                  <div className="flex justify-center gap-2 mt-4">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                  </div>
                </div>

                <div
                  className={`w-1/2 p-8 ${
                    product.gender === "female"
                      ? "bg-rose-50"
                      : product.gender === "male"
                      ? "bg-sky-50"
                      : "bg-indigo-50"
                  }`}
                >
                  <nav className="text-sm text-gray-600 mb-4 flex items-center justify-center">
                    <ul className="flex items-center space-x-2">
                      <li>
                        <Link to="/" className="text-blue-500 hover:underline">
                          Home
                        </Link>
                      </li>
                      <li>
                        <span className="text-gray-400">/</span>
                      </li>
                      <li>
                        <Link
                          to="/products"
                          className="text-blue-500 hover:underline"
                        >
                          Products
                        </Link>
                      </li>
                      <li>
                        <span className="text-gray-400">/</span>
                      </li>
                      <li>
                        <Link
                          to={`/products/${product.category}`}
                          className="text-blue-500 hover:underline"
                        >
                          {product.category}
                        </Link>
                      </li>
                      <li>
                        <span className="text-gray-400">/</span>
                      </li>
                      <li className="text-gray-800 font-semibold">
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
                    <div className="flex justify-center items-center">
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

                  <div className="flex gap-4">
                    <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
                      ADD TO CART
                    </button>
                    <button className=" bg-white py-3 px-5 rounded hover:bg-gray-50 transition">
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 py-12">
            <div className="flex items-center justify-center">
              <div className="bg-white shadow-lg rounded-lg max-w-4xl flex w-full">
                <div className="relative w-full p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Reviews
                  </h2>
                  <div id="reviews" className="space-y-4">
                    {product.reviews?.map((review, key) => (
                      <div key={key} className="bg-gray-100 p-4 rounded-md">
                        <Rating
                          name="read-only"
                          value={review.rating}
                          size="small"
                          readOnly
                        />
                        <p className="text-gray-800">"{review.comment}"</p>
                        <p className="text-sm text-gray-500">- {review.name}</p>
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
                          className="w-full p-2 border rounded-md"
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
                      <Message severity="info" variant="standard">
                        Please <Link to="/login">sign in</Link> to leave a
                        review
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
