import { Rating } from "@mui/material";
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [variantIndex, setVariantIndex] = useState(0);
  const selectedVariant = product.variants?.[variantIndex];
  const handleVariantChange = (index) => {
    setVariantIndex(index);
  };
  return (
    <div
      className={`bg-white hover:shadow-custom ${
        product.gender === "female"
          ? "hover:shadow-rose-500"
          : product.gender === "male"
          ? "hover:shadow-sky-500"
          : "hover:shadow-indigo-500"
      } overflow-hidden px-4 pt-6 pb-2 transition-all duration-200 ease-linear`}
    >
      <div className="relative">
        <Link to={`/products/${product._id}`}>
          <img
            src="https://www.parfimo.bg/data/cache/thumb_min500_max1000-min500_max1000-12/products/56279/1530460699/creed-aventus-parfyumna-voda-dla-mezczyzn-75-ml-238781.jpg"
            alt={product.name}
            className="w-full h-48 object-contain"
          />
        </Link>
        <div className="absolute right-1 top-1 bg-white rounded text-gray-500 hover:cursor-pointer hover:bg-rose-100 hover:text-rose-600 text-lg p-2 font-bold">
          <FaRegHeart />
        </div>
        <div className="absolute left-1 top-1 bg-rose-500 text-white text-sm p-1 font-bold uppercase">
          Sale
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xs font-semibold text-center font-serif">
          {product.brand}
        </h2>
        <h2 className="text-lg font-semibold text-center">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h2>
        <div className="flex justify-center">
          <div
            className={`text-white text-xs p-1 font-bold uppercase inline-block ${
              product.gender === "female"
                ? "bg-rose-500"
                : product.gender === "male"
                ? "bg-sky-500"
                : "bg-indigo-500"
            }`}
          >
            For{" "}
            {product.gender === "female"
              ? "her"
              : product.gender === "male"
              ? "him"
              : "all"}
          </div>
        </div>
        <hr className="mt-4" />
        {product.rating > 0 ? (
          <div className="flex justify-center items-center mt-4">
            <Rating
              name="read-only"
              value={parseFloat(product.rating)}
              size="small"
              precision={0.5}
              readOnly
            />
            <span className="text-sm font-bold ml-2">{product.rating}</span>
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-center items-center gap-1 mt-2">
          {product.variants.map((variant, index) => (
            <p
              key={index}
              onClick={() => handleVariantChange(index)}
              className={`text-xs py-1 px-2 font-bold rounded-lg hover:cursor-pointer ${
                index === variantIndex
                  ? "bg-slate-800 text-white"
                  : "bg-slate-200 hover:bg-slate-300"
              }`}
            >
              {variant.size}ml
            </p>
          ))}
        </div>
        <p className="text-center mt-2 font-bold text-lg">
          $
          {selectedVariant
            ? parseFloat(selectedVariant.price).toFixed(2)
            : "N/A"}
        </p>
        <p className="text-center text-xs text-rose-600">
          $
          {selectedVariant && selectedVariant.discountPrice
            ? parseFloat(selectedVariant.discountPrice).toFixed(2)
            : "N/A"}{" "}
          with promo code:{" "}
          <b>
            <u>XMAS</u>
          </b>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
