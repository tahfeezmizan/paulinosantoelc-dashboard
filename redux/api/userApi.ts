import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllUser
    getAllUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),

    // UpdateMe
    UpdateMe: builder.mutation({
      query: ({ body }) => {
        console.log("UpdateMe body:", body); // ✅ Log inside query
        return {
          url: "/user/update-me",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});


export const { useGetAllUserQuery, useUpdateMeMutation } = userApi;
