import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMyActiveCart: build.query({
      query: () => {
        return {
          url: `/purchase/get-my-carts`,
          method: "GET",
        };
      },
      transformResponse: (data) => {
        return data.data;
      },
      providesTags: ["cart-details"],
    }),

    getAllMyConfirmedOrders: build.query({
      query: () => {
        return {
          url: `/purchase/get-my-confirmed-orders`,
          method: "GET",
        };
      },
      transformResponse: (result) => {
        return result.data;
      },
      providesTags: ["order-details"],
    }),

    // ? Updating the cart info like `quantity mainly`
    updateMyCart: build.mutation({
      query: ({
        cartId,
        type,
      }: {
        cartId: string;
        type: "INCREASE" | "DECREASE";
      }) => {
        return {
          url: `/purchase/${cartId}/${type}/update-my-cart`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["cart-details"],
    }),

    // ? Delete the pack from the cart
    deleteTheCart: build.mutation({
      query: (cartId: string) => {
        return {
          url: `/purchase/${cartId}/delete`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["cart-details"],
    }),
  }),
});

export const {
  useGetAllMyActiveCartQuery,
  useUpdateMyCartMutation,
  useDeleteTheCartMutation,
  useGetAllMyConfirmedOrdersQuery,
} = cartApi;
