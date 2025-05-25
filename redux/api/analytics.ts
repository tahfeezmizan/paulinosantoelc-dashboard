import { baseApi } from "./baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => ({
        url: "/analytics",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsApi;

