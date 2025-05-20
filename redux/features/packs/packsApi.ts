import { baseApi } from "../../api/baseApi";

const packs = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPacks: build.query({
      query: () => {
        return {
          url: `/promotional-packs`,
          method: "GET",
        };
      },
      providesTags: ["packs"],
    }),

    /* {
 "quantityOfProducts":2,
 "packId":"680a0f86f271a9f5584a3e48" 
} */
    addToCartAPack: build.mutation({
      query: ({
        quantityOfProducts,
        packId,
      }: {
        quantityOfProducts: number;
        packId: string;
      }) => {
        return {
          url: `/purchase/create`,
          method: "POST",
          body: {
            quantityOfProducts,
            packId,
          },
        };
      },
      invalidatesTags: ["cart-details"],
    }),
  }),
});

export const { useGetAllPacksQuery, useAddToCartAPackMutation } = packs;
