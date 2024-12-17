import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../contstants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
