import { baseApi } from "@/redux/api/baseApi";

const winnerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWinnerInformation: build.query({
      query: () => ({
        url: "/winners",
        method: "GET",
      }),

      transformResponse: (data) => {
        return data.data;
      },
    }),
  }),
});

export const { useGetWinnerInformationQuery } = winnerApi;
