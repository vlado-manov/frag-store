import { WISHLIST_URL } from "../contstants";
import { apiSlice } from "./apiSlice";

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishListProducts: builder.query({
      query: () => ({
        url: WISHLIST_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: WISHLIST_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation({
      query: ({ productId, size }) => ({
        url: WISHLIST_URL,
        method: "DELETE",
        body: { productId, size },
      }),
      invalidatesTags: ["Wishlist"],
    }),
    syncWishlistToServer: builder.mutation({
      query: (localWishlist) => ({
        url: `${WISHLIST_URL}/sync`,
        method: "POST",
        body: { products: localWishlist },
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishListProductsQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useSyncWishlistToServerMutation,
} = wishlistApiSlice;
