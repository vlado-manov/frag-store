import React from "react";
import { useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../slices/ordersSlice";
import { clearCartItems } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrderButton = ({ cart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shipping,
        discountApplied: cart.discount,
        totalPrice: cart.subtotal,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
    } catch (error) {
      toast.error(error.data?.message || error.error || "Something went wrong");
    }
  };
  return (
    <button
      onClick={placeOrderHandler}
      className="bg-black text-white rounded py-2 px-6"
    >
      Place order
    </button>
  );
};

export default PlaceOrderButton;
