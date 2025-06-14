import { get } from "http";
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

    // get logged in user
    getLoggedInUser: builder.query({
      query: () => ({
        url: "/auth/get-me",
        method: "GET",
      }),

      transformResponse: (response: any) => response.data,
    }),

    // Update User By Id
    updateVerifyStatus: builder.mutation({
      query: ({ id, verifyStatus }) => ({
        url: `/user/confirm-verify/${id}`,
        method: "PUT",
        body: { verifyStatus },
      }),
    }),

    // get User By Id
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
    }),

    // Delete User By Id
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetUserByIdQuery,
  useGetLoggedInUserQuery,
  useUpdateVerifyStatusMutation,
  useDeleteUserMutation,
} = userApi;
