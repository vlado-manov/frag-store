import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import authSliceReducer from "./slices/authSlice.js";
import cartSliceReducer from "./slices/cartSlice.js";
import wishlistSliceReducer from "./slices/wishlistSlice.js";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    cart: cartSliceReducer,
    wishlist: wishlistSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
