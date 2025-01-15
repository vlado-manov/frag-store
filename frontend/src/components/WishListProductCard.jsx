import { Rating } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const WishListProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    const itemToAdd = {
      _id: product.productId,
      name: product.name,
      brand: product.brand,
      variant: {
        size: product.variant.size,
        price: product.variant.price,
        discountPrice: product.variant.discountPrice,
        countInStock: product.variant.countInStock,
        images: product.variant.images,
      },
      quantity: 1,
    };
    dispatch(addToCart(itemToAdd));
    toast.success("Item was added to cart successfully!");
    navigate("/cart");
  };
  return (
    <div
      className="bg-white shadow-custom flex flex-col shadow-sky-500 justify-between overflow-hidden transition-all duration-200 ease-linear"
      // className={`bg-white shadow-custom flex flex-col justify-between ${
      //   product.gender === "female"
      //     ? " shadow-rose-500"
      //     : product.gender === "male"
      //     ? " shadow-sky-500"
      //     : " shadow-indigo-500"
      // } overflow-hidden transition-all duration-200 ease-linear`}
    >
      <div className="relative">
        <Link to={`/products/${product.productId}`}>
          <img
            src="https://www.parfimo.bg/data/cache/thumb_min500_max1000-min500_max1000-12/products/56279/1530460699/creed-aventus-parfyumna-voda-dla-mezczyzn-75-ml-238781.jpg"
            alt={product.name}
            className="w-full h-40 object-contain"
          />
        </Link>
      </div>
      <div>
        <h2 className="text-sm font-roboto font-semibold px-2">
          <Link to={`/products/${product.productId}`}>
            {product.name} {product.variant.size}ml
          </Link>
        </h2>
        <div className="flex items-center mt-1 px-2">
          <Rating
            name="read-only"
            value={parseFloat(product.rating)}
            size="small"
            precision={0.5}
            readOnly
          />
        </div>
        <div className="flex items-center mt-2 p-2">
          {product.variant.discountPrice > 0 ? (
            <>
              <span className="line-through text-gray-500 mr-2">
                ${product.variant.price.toFixed(2)}
              </span>
              <span className="text-red-500 font-bold">
                ${product.variant.discountPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span>${product.variant.price.toFixed(2)}</span>
          )}
        </div>
        <button
          className="bg-orange-400 text-white w-full p-2 mt-auto"
          onClick={addToCartHandler}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default WishListProductCard;
