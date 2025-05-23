import { baseApi } from "./baseApi";

const supplierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All user
    getAllSpplier: builder.query({
      query: ({ page, limit, searchTerm }) => {
        const url = searchTerm
          ? `/user?role=SUPPLIER&page=${page}&limit=${limit}&searchTerm=${searchTerm}`
          : `/user?role=SUPPLIER&page=${page}&limit=${limit}`;

        return {
          url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllSpplierQuery } = supplierApi;
