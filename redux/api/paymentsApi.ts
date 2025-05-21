import { baseApi } from "./baseApi";

const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All user
    getAllPayments: builder.query({
      query: () => ({
        url: `/subscription`,
      }),
      transformResponse: ({ data }) => data,
    }),
  }),
});

export const { useGetAllPaymentsQuery } = paymentsApi;
