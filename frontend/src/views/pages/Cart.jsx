import React from "react";
import Container from "../../components/layout/Container";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart, clearCartItems } from "../../slices/cartSlice";

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
      {cartItems.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        cartItems.map((item) => (
          <div key={item._id} className="flex gap-5">
            <div>{item.name}</div>
            <div>{item.variant?.size}ml</div>
            <div>{item.brand}</div>
            <div>{item.quantity}</div>
            <div>${item.variant?.price}</div>
            <div>${item.variant?.discountPrice}</div>
            <button onClick={() => removeFromCartHandler(item)}>
              Remove item
            </button>
          </div>
        ))
      )}
      <button onClick={clearCartHandler}>Clear cart</button>
    </Container>
  );
};

export default Cart;
