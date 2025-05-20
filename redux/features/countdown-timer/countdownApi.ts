import { baseApi } from "../../api/baseApi";

const countDownApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTheActiveTimer: build.query({
      query: () => {
        return {
          url: `/prize-draw/live`,
          method: "GET",
        };
      },

      transformResponse: (data) => {
        return data.data;
      },

      providesTags: ["countdown-timer"],
    }),
  }),
});

export const { useGetTheActiveTimerQuery } = countDownApi;
