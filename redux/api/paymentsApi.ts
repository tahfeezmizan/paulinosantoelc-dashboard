import { baseApi } from "./baseApi";

const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All user
    getAllPayments: builder.query({
      query: ({page, limit}) => ({
      url: `/subscription?page=${page}&limit=${limit}`,
      }),
      // transformResponse: ({ data }) => data,
    }),
  }),
});

export const { useGetAllPaymentsQuery } = paymentsApi;
