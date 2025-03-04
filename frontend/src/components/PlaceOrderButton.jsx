import React from "react";
import { useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../slices/ordersSlice";
import { clearCartItems, finishOrder } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomButton from "./ui/CustomButton";

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
      dispatch(finishOrder());
      navigate(`/orders/${res._id}`);
    } catch (error) {
      toast.error(error.data?.message || error.error || "Something went wrong");
    }
  };
  return (
    <CustomButton
      onClick={placeOrderHandler}
      disabled={!cart.shippingAddress || !cart.paymentMethod}
    >
      Place order
    </CustomButton>
  );
};

export default PlaceOrderButton;
