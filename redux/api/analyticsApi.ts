import { baseApi } from "./baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => ({
        url: "/analytics/summary",
        method: "GET",
      }),
    }),
    OverviewChart: builder.query({
      query: () => ({
        url: "/analytics/overview",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAnalyticsQuery, useOverviewChartQuery } = analyticsApi;
