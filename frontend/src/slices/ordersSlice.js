import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../contstants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myOrders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updatePaymentMethod: builder.mutation({
      query: ({ orderId, paymentMethod }) => ({
        url: `${ORDERS_URL}/${orderId}/payment-method`,
        method: "POST",
        body: { paymentMethod },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useUpdatePaymentMethodMutation,
} = ordersApiSlice;
