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

    // get User By Id
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
       transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetUserByIdQuery,
  useGetLoggedInUserQuery,

} = userApi;
