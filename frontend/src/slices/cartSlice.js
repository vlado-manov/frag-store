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
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    incrementQuantity: (state, action) => {
      const { _id, variant } = action.payload;
      const item = state.cartItems.find(
        (x) => x._id === _id && x.variant.size === variant.size
      );
      if (item && item.quantity < item.variant.countInStock) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state));
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
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCartItems,
  clearCartItems,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
