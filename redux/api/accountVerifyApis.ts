import { baseApi } from "./baseApi";

const accountVerifyApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sentAccountVerifyReq: builder.mutation({
      query: (data) => ({
        url: "/user/sent-verify",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});


