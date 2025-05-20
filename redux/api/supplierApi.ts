import { baseApi } from "./baseApi";

const supplierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsersByRole: builder.query({
      query: (role: "SUPPLIER" | "BUYER") => `/user?role=${role}`,
    }),
  }),
});

export const { useGetUsersByRoleQuery } = supplierApi;
