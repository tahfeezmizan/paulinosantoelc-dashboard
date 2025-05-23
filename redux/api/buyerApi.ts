import { baseApi } from "./baseApi";

const buyerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All user
    getAllBuyers: builder.query({
      query: ({ page, limit, searchTerm }) => {
        const url = searchTerm
          ? `/user?role=BUYER&page=${page}&limit=${limit}&searchTerm=${searchTerm}`
          : `/user?role=BUYER&page=${page}&limit=${limit}`;

        return {
          url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllBuyersQuery } = buyerApi;
