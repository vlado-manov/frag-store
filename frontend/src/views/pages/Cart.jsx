import React from "react";
import Container from "../../components/layout/Container";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart, clearCartItems } from "../../slices/cartSlice";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { IoIosArrowRoundBack } from "react-icons/io";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  const dispatch = useDispatch();
  const removeFromCartHandler = async (item) => {
    dispatch(removeFromCart(item));
  };
  const clearCartHandler = () => {
    dispatch(clearCartItems());
  };
  return (
    <Container>
      <div className="flex py-16 px-10 rounded w-full gap-10 font-roboto">
        <div className="flex-[9] w-full">
          <h1 className="text-2xl font-bold text-left my-1">Your cart</h1>
          <p className="text-gray-600 text-sm text-left font-thin">
            Review your selected items, adjust quantities, and proceed to
            checkout when you're ready to complete your order
          </p>
          <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col justify-center p-6 my-4">
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
                    className="flex items-center pt-12 pb-6 border-b-2 gap-4 border-stone-200 last-of-type:border-none"
                  >
                    <div className="flex-[4] w-full flex gap-4 items-center">
                      <div className="w-full">
                        <Link to={`/products/${item._id}`}>
                          <img
                            src="https://www.parfimo.bg/data/cache/thumb_min500_max1000-min500_max1000-12/products/56279/1530460699/creed-aventus-parfyumna-voda-dla-mezczyzn-75-ml-238781.jpg"
                            alt={item.name}
                            className="w-24 h-24 object-contain"
                          />
                        </Link>
                      </div>
                      <div className="w-full">
                        <Link to={`/products/${item._id}`}>
                          <p className="text-xs">{item.brand}</p>
                          <p className="text-lg break-words">{item.name}</p>
                        </Link>
                      </div>
                    </div>
                    <div className="flex-[2] w-full text-sm">
                      {item.variant?.size}ml
                    </div>
                    <div className="flex-[3] w-full text-sm">
                      {item.quantity}
                    </div>
                    <div className="flex-[2] w-full text-sm">
                      ${item.variant?.price}
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
            {cartItems.length != 0 && (
              <button
                onClick={clearCartHandler}
                className="bg-black rounded py-2 px-4 text-white my-1 mt-4 w-fit"
              >
                Clear cart
              </button>
            )}
          </div>
        </div>
        <div className="flex-[3] w-full relative">
          <div className="">
            <h1 className="text-left text-xl font-thin">Summary</h1>
            <div className="flex justify-between py-2 items-center">
              <p className="text-sm">Shipping:</p>
              <p className="font-bold">$00.00</p>
            </div>
            <div className="flex justify-between py-2 items-center">
              <p className="text-sm">Subtotal:</p>
              <p className="font-bold">$252.00</p>
            </div>
            <div className="py-2 w-full">
              <TextField fullwidth label="Add coupon code" variant="standard" />
            </div>
            <button className="rounded-md mt-8 bg-sky-500 py-4 w-full text-white">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
