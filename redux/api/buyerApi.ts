import { baseApi } from "./baseApi";

const buyerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All user
    getAllBuyers: builder.query({
      // Accepts an object with both values dynamically from the frontend
      //   query: ({ firstName, lastName }: { firstName: string; lastName: string }) => ({
      //    url: `/user?role=BUYER&firstName=${firstName}&lastName=${lastName}`,
      //   }),

      query: () => ({
        url: `/user?role=BUYER`,
      }),
      //   transformResponse: (data) => {
      //     console.log("buyers data", data);
      //   },
      transformResponse: ({ data }) => data,
    }),
  }),
});

export const { useGetAllBuyersQuery } = buyerApi;
