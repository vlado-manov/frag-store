import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../contstants";

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
      query: ({ pageNumber }) => ({
        url: `${ORDERS_URL}/myOrders`,
        params: {
          pageNumber,
        },
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
        method: "PUT",
        body: { paymentMethod },
      }),
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "PUT",
      }),
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useUpdatePaymentMethodMutation,
  useCancelOrderMutation,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} = ordersApiSlice;
