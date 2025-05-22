import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // login user
    loginUser: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // logout user
    logoutUser: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    // get user
    getUser: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery
} = authApi;
