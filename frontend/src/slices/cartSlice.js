import { createSlice } from "@reduxjs/toolkit";
import {
  calculateItemsPrice,
  calculatePromoCodeDiscount,
  calculateShipping,
  calculateSubtotal,
  updateCart,
} from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x._id === item._id && x.variant.size === item.variant.size
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id && x.variant.size === existItem.variant.size
            ? { ...x, quantity: x.quantity + item.quantity }
            : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      state.orderCompleted = false;
      updateCart(state);
    },
    removeFromCart: (state, action) => {
      const { _id, variant } = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== _id || x.variant.size !== variant.size
      );
      updateCart(state);
    },
    incrementQuantity: (state, action) => {
      const { _id, variant } = action.payload;
      const item = state.cartItems.find(
        (x) => x._id === _id && x.variant.size === variant.size
      );
      if (item && item.quantity < item.variant.countInStock) {
        item.quantity += 1;
        updateCart(state);
      }
    },
    decrementQuantity: (state, action) => {
      const { _id, variant } = action.payload;
      const item = state.cartItems.find(
        (x) => x._id === _id && x.variant.size === variant.size
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (x) => x._id !== _id || x.variant.size !== variant.size
          );
        }
        updateCart(state);
      }
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      updateCart(state);
    },
    finishOrder: (state) => {
      state.shippingAddress = null;
      state.paymentMethod = null;
      state.orderCompleted = true;
      updateCart(state);
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCartItems,
  clearCartItems,
  saveShippingAddress,
  savePaymentMethod,
  incrementQuantity,
  decrementQuantity,
  finishOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
