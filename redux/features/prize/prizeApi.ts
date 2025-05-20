import { baseApi } from "@/redux/api/baseApi";

const prizeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPromotionalPrizes: build.query({
      query: () => ({
        url: "/prizes",
        method: "GET",
      }),

      providesTags: ["prizes"],
      transformResponse: (data) => data.data,
    }),
  }),
});

export const { useGetAllPromotionalPrizesQuery } = prizeApi;
