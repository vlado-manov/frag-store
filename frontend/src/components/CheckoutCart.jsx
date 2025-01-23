import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlaceOrderButton from "./PlaceOrderButton";

const CheckoutCart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col p-6 my-4 flex-[3] w-full font-roboto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg">
          Items ({cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </h2>
        <Link to="/cart">
          <p className="text-slate-300 text-sm">Edit cart</p>
        </Link>
      </div>
      <div className="pt-12 pb-6">
        {cart.cartItems.map((item, index) => (
          <div
            className="flex justify-between items-center mb-6 pb-2 border-b-2 "
            key={index}
          >
            <div className="flex-[7] w-full">
              <p className="text-xs text-slate-400">{item.brand}</p>
              <h3 className="text-sm">
                {item.name} - {item.variant.size}ml
              </h3>
            </div>
            <div className="flex-[5] w-full flex justify-end gap-6">
              <p className="text-xs">{item.quantity}x</p>
              <p className="text-xs">${item.variant.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between my-2">
        <p className="text-sm text-slate-400">Items price:</p>
        <p className="text-sm">${cart.itemsPrice.toFixed(2)}</p>
      </div>
      <div className="flex justify-between my-2">
        <p className="text-sm text-slate-400">Shipping:</p>
        <p className="text-sm">${cart.shipping.toFixed(2)}</p>
      </div>
      <div className="flex justify-between my-2">
        <p className="text-sm text-slate-400">Promo discount:</p>
        <p className="text-sm text-red-500 font-bold">
          -${cart.discount.toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between my-2">
        <p className="text-sm text-slate-400">Subtotal:</p>
        <p className="text-sm">${cart.subtotal.toFixed(2)}</p>
      </div>
      {/* <button
        disabled={!cart.shippingAddress || !cart.paymentMethod}
        className="bg-black text-white rounded py-2 text-lg w-full mt-6"
      >
        Place order
      </button> */}
      <PlaceOrderButton cart={cart} />
    </div>
  );
};

export default CheckoutCart;
