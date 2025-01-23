import React from "react";
import Container from "../../components/layout/Container";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCartItems,
  incrementQuantity,
  decrementQuantity,
} from "../../slices/cartSlice";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import CartSync from "../../utils/CartSync.js";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, itemsPrice, shipping, discount, subtotal } = cart;
  const dispatch = useDispatch();

  const removeFromCartHandler = async (item) => {
    dispatch(removeFromCart(item));
  };

  const clearCartHandler = () => {
    dispatch(clearCartItems());
  };

  const decrementQty = (_id, variant) => {
    dispatch(decrementQuantity(_id, variant));
  };

  const incrementQty = (_id, variant) => {
    dispatch(incrementQuantity(_id, variant));
  };
  return (
    <Container>
      <div className="flex py-2 md:py-16 px-4 md:px-10 rounded w-full gap-10 font-roboto flex-col-reverse md:flex-row">
        <div className="flex-[9] w-full">
          <h1 className="text-2xl font-bold text-left my-1">Your cart</h1>
          <p className="text-gray-600 text-sm text-left font-thin">
            Review your selected items, adjust quantities, and proceed to
            checkout when you're ready to complete your order
          </p>
          <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col justify-center p-4 md:p-6 my-4">
            {cartItems.length === 0 ? (
              <div>Your cart is empty.</div>
            ) : (
              <>
                <div className="flex gap-4">
                  <div className="flex-[4] w-full text-sm text-gray-400">
                    Item
                  </div>
                  <div className="flex-[2] w-full text-sm text-gray-400">
                    Size
                  </div>
                  <div className="flex-[3] w-full text-sm text-gray-400">
                    Quantity
                  </div>
                  <div className="flex-[2] w-full text-sm text-gray-400">
                    Price
                  </div>
                  <div className="flex-[1] w-full"></div>
                </div>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center py-2 md:pt-12 md:pb-6 border-b-2 gap-4 border-stone-200 last-of-type:border-none"
                  >
                    <div className="flex-[4] w-full flex gap-4 items-center">
                      <div className="md:w-full">
                        <Link to={`/products/${item._id}`}>
                          <img
                            src="https://www.parfimo.bg/data/cache/thumb_min500_max1000-min500_max1000-12/products/56279/1530460699/creed-aventus-parfyumna-voda-dla-mezczyzn-75-ml-238781.jpg"
                            alt={item.name}
                            className="w-14 h-14 md:w-24 md:h-24 object-contain"
                          />
                        </Link>
                      </div>
                      <div className="w-full">
                        <Link to={`/products/${item._id}`}>
                          <p className="hidden md:block text-xs">
                            {item.brand}
                          </p>
                          <p className="text-md md:text-lg break-words">
                            {item.name}
                          </p>
                        </Link>
                      </div>
                    </div>
                    <div className="flex-[2] w-full text-sm">
                      {item.variant?.size}ml
                    </div>
                    <div className="flex-[3] w-full text-sm flex items-center gap-4">
                      <button
                        onClick={() =>
                          decrementQty({ _id: item._id, variant: item.variant })
                        }
                      >
                        <FaCircleMinus
                          size={20}
                          className="hover:text-slate-800 hover:cursor-pointer"
                        />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          incrementQty({ _id: item._id, variant: item.variant })
                        }
                      >
                        <FaCirclePlus
                          size={20}
                          className="hover:text-slate-800 hover:cursor-pointer"
                        />
                      </button>
                    </div>
                    <div className="flex-[2] w-full text-sm">
                      ${(item.variant?.price * item.quantity).toFixed(2)}
                    </div>
                    <div
                      className="flex-[1] w-full hover:cursor-pointer"
                      onClick={() => removeFromCartHandler(item)}
                    >
                      <IoMdCloseCircle size={24} />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="flex justify-between items-center">
            <Link
              to="/products"
              className="flex gap-2 items-center hover:text-sky-500"
            >
              <IoIosArrowRoundBack size={20} />
              Continue shopping
            </Link>
            {cartItems.length !== 0 && (
              <button
                onClick={clearCartHandler}
                className="bg-black rounded py-2 px-4 text-white my-1 mt-4 w-fit"
              >
                Clear cart
              </button>
            )}
          </div>
        </div>
        <div className="flex-[3] w-full relative border-b-2 pb-4 md:p-0 border-stone-200 md:border-none">
          <div>
            <h1 className="text-left text-xl font-thin hidden md:block">
              Summary
            </h1>
            <h1 className="text-left font-bold text-2xl block mb-4 md:hidden">
              Cart status
            </h1>
            <div className="flex gap-2 md:justify-between py-2 items-center">
              <p className="text-base md:text-sm">Number of items:</p>
              <p className="font-bold text-lg md:text-base">
                {cartItems.length}
              </p>
            </div>
            <div className="flex gap-2 md:justify-between py-2 items-center">
              <p className="text-base md:text-sm">Items price:</p>
              <p className="font-bold text-lg md:text-base">
                ${itemsPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex gap-2 md:justify-between py-2 items-center">
              <p className="text-base md:text-sm">Shipping:</p>
              <p className="font-bold text-lg md:text-base">
                ${shipping.toFixed(2)}
              </p>
            </div>
            {discount && discount > 0 && (
              <div className="flex gap-2 md:justify-between py-2 items-center">
                <p className="text-base md:text-sm">Promo code:</p>
                <p className="font-bold text-red-500 text-lg md:text-base">
                  -${discount.toFixed(2)}
                </p>
              </div>
            )}
            <div className="flex gap-2 md:justify-between py-2 items-center">
              <p className="text-base md:text-sm">Subtotal:</p>
              <p className="font-bold text-lg md:text-base">
                ${subtotal ? subtotal.toFixed(2) : 0}
              </p>
            </div>
            <div className="py-2 w-full">
              <TextField
                fullwidth
                type="text"
                name="coupon"
                label="Add coupon code"
                variant="standard"
                value="XMAX"
              />
            </div>
            {itemsPrice >= 600 ? (
              <p className="text-xs text-sky-500 mt-4">
                Woohoo! You've scored free shipping.
              </p>
            ) : (
              <p className="text-xs text-red-500 mt-4">
                You're just{" "}
                <span className="font-bold underline">
                  ${(600 - itemsPrice > 0 ? 600 - itemsPrice : 0).toFixed(2)}
                </span>{" "}
                away from free shipping!
              </p>
            )}
            <Link
              to="/shipping"
              className="block text-center rounded-md mt-4 bg-sky-500 py-4 w-full text-white"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
      <CartSync />
    </Container>
  );
};

export default Cart;
// TODO: login/logout cart logic
// TODO: countInStock for current user when adding a product to cart logic
