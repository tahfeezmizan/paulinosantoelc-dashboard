import { create } from "domain";
import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get Category
    getAllCategory: builder.query({
      query: ({ page, limit, searchTerm }) => {
        const url = searchTerm
          ? // ? `/category?page=${page}&limit=${limit}&searchTerm=${searchTerm}`
            `/category?limit=${limit}&searchTerm=${searchTerm}&page=${page}`
          : `/category?page=${page}&limit=${limit}`;
        return {
          url,
          method: "GET",
        };
      },
    }),

    // create category
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create",
        method: "POST",
        body: data,
      }),
    }),

    // Update category By Id
    updateCategory: builder.mutation({
      query: ({ id, categoryText }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: { categoryText },
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
} = categoryApi;
