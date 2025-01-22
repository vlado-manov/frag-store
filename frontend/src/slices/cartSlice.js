import { createSlice } from "@reduxjs/toolkit";
import {
  calculateItemsPrice,
  calculatePromoCodeDiscount,
  calculateShipping,
  calculateSubtotal,
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

      // Recalculate prices and store them in the Redux state
      state.itemsPrice = calculateItemsPrice(state.cartItems);
      state.shipping = calculateShipping(state.cartItems);
      state.discount = calculatePromoCodeDiscount(state.cartItems);
      state.subtotal = calculateSubtotal(state.cartItems);

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const { _id, variant } = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== _id || x.variant.size !== variant.size
      );

      // Recalculate prices after removal
      state.itemsPrice = calculateItemsPrice(state.cartItems);
      state.shipping = calculateShipping(state.cartItems);
      state.discount = calculatePromoCodeDiscount(state.cartItems);
      state.subtotal = calculateSubtotal(state.cartItems);

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    incrementQuantity: (state, action) => {
      const { _id, variant } = action.payload;
      const item = state.cartItems.find(
        (x) => x._id === _id && x.variant.size === variant.size
      );
      if (item && item.quantity < item.variant.countInStock) {
        item.quantity += 1;

        // Recalculate prices after increment
        state.itemsPrice = calculateItemsPrice(state.cartItems);
        state.shipping = calculateShipping(state.cartItems);
        state.discount = calculatePromoCodeDiscount(state.cartItems);
        state.subtotal = calculateSubtotal(state.cartItems);

        // Update localStorage
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

        // Recalculate prices after decrement
        state.itemsPrice = calculateItemsPrice(state.cartItems);
        state.shipping = calculateShipping(state.cartItems);
        state.discount = calculatePromoCodeDiscount(state.cartItems);
        state.subtotal = calculateSubtotal(state.cartItems);

        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCartItems: (state) => {
      state.cartItems = [];

      // Recalculate prices after clearing the cart
      state.itemsPrice = 0;
      state.shipping = 0;
      state.discount = 0;
      state.subtotal = 0;

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;

      // Recalculate prices after setting cart items
      state.itemsPrice = calculateItemsPrice(state.cartItems);
      state.shipping = calculateShipping(state.cartItems);
      state.discount = calculatePromoCodeDiscount(state.cartItems);
      state.subtotal = calculateSubtotal(state.cartItems);

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
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
} = cartSlice.actions;

export default cartSlice.reducer;
