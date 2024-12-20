import React, { useState } from "react";
import { Product } from "../../types/productTypes";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../slices/productSlice";
import { FaRegHeart } from "react-icons/fa6";

const ProductView: React.FC = () => {
  const { id: productId } = useParams<{ id: string | undefined }>();
  const { data: product, error, isLoading } = useGetProductQuery(productId);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);

  const selectedVariant = product?.variants[selectedVariantIndex];

  const handleVariantChange = (index: number) => {
    setSelectedVariantIndex(index);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-page relative">
      <div
        className={`absolute top-0 left-0 w-1/2 h-full ${
          product.gender === "female"
            ? "bg-rose-50"
            : product.gender === "male"
            ? "bg-sky-50"
            : "bg-indigo-50"
        }`}
      ></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white"></div>
      <div className="relative z-10 min-h-screen p-4">
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
              <Link to="/products" className="text-blue-500 hover:underline">
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
            <li className="text-gray-800 font-semibold">{product.name}</li>
          </ul>
        </nav>
        <div className="flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg max-w-4xl flex">
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

            {/* Details Section */}
            <div
              className={`w-1/2 p-8 ${
                product.gender === "female"
                  ? "bg-rose-50"
                  : product.gender === "male"
                  ? "bg-sky-50"
                  : "bg-indigo-50"
              }`}
            >
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {product.name} - {selectedVariant?.size}
              </h1>
              <div className="text-center mb-4">
                <h5 className="text-l font-semibold text-gray-500">
                  {product.brand}
                </h5>
                <div className="flex justify-center items-center">
                  <span className="text-yellow-400 text-lg">★★★★★</span>
                  <a
                    href="#"
                    className="ml-2 text-sm text-blue-500 hover:underline"
                  >
                    Reviews
                  </a>
                </div>
                <hr className="mt-4 border-gray-300" />
              </div>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="text-2xl font-bold text-gray-800 mb-4">
                ${selectedVariant?.price?.toFixed(2)}
              </div>
              {/* Size Selection */}
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
                  {selectedVariant && selectedVariant.countInStock !== undefined
                    ? selectedVariant.countInStock === 0
                      ? "Currently not in stock"
                      : selectedVariant.countInStock < 150
                      ? "Currently less than 5 in stock"
                      : "Currently there are more than 5 in stock"
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
                    // onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center hover:bg-gray-800"
                  >
                    -
                  </button>
                  <span className="text-lg">0</span>
                  <button
                    // onClick={() => handleQuantityChange(1)}
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">Reviews</h2>
              <div id="reviews" className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-gray-800">
                    "Great product, highly recommend!"
                  </p>
                  <p className="text-sm text-gray-500">- John Doe</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-gray-800">
                    "Very good quality, will buy again."
                  </p>
                  <p className="text-sm text-gray-500">- Jane Smith</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Add a Review
                </h3>
                <form className="space-y-4">
                  <textarea
                    className="w-full p-2 border rounded-md"
                    placeholder="Write your review here..."
                  ></textarea>
                  <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
