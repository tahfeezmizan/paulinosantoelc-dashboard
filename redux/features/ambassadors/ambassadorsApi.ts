import { baseApi } from "@/redux/api/baseApi";

const ambassadorsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAmbassadorsVideos: build.query({
      query: () => ({
        url: "/ambassadors",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAmbassadorsVideosQuery } = ambassadorsApi;
