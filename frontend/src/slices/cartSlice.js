import { createSlice } from "@reduxjs/toolkit";
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
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const { _id, variant } = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== _id || x.variant.size !== variant.size
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
