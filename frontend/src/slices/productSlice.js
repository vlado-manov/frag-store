import { PRODUCTS_URL } from "../contstants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/wishlist`,
        method: "POST",
        body: data,
      }),
    }),
    getWishListProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/wishlist`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateReviewMutation,
  useAddToWishlistMutation,
  useGetWishListProductsQuery,
} = productsApiSlice;
