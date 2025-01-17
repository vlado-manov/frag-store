import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToLocalWishlist: (state, action) => {
      const existingProduct = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.variant.size === action.payload.variant.size
      );
      if (!existingProduct) {
        state.items.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },
    removeFromLocalWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          item.productId !== action.payload.productId ||
          item.variant.size !== action.payload.variant.size
      );
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    clearLocalWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
    loadWishlistFromLocalStorage: (state) => {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        state.items = JSON.parse(storedWishlist);
      }
    },
  },
});

export const {
  addToLocalWishlist,
  removeFromLocalWishlist,
  clearLocalWishlist,
  loadWishlistFromLocalStorage,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
