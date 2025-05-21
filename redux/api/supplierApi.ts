import { baseApi } from "./baseApi";

const supplierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All user
    getAllSpplier: builder.query({
      // Accepts an object with both values dynamically from the frontend
      // query: ({ firstName, lastName }: { firstName: string; lastName: string }) => ({ 
      //  url: `/user?role=SUPPLIER&firstName=${firstName}&lastName=${lastName}`,
      // }),
      query: () => ({ 
       url: `/user?role=SUPPLIER`,
      }),
      transformResponse: ({data}) => data
    }),
  }),
});

export const { useGetAllSpplierQuery } = supplierApi;