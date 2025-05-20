import { baseApi } from "../../api/baseApi";

const orderDetailsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    orderDetails: build.query({
      query: (currentPage) => {
        return {
          url: `/purchase/get-my-confirmed-orders?page=${currentPage}`,
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return { result: data.result, meta: data.meta };
      },

      //providesTags: ["cart-details"],
    }),
  }),
});

export const { useOrderDetailsQuery } = orderDetailsApi;
