import { baseApi } from "@/redux/api/baseApi";

const wheelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get Partner Hero Api
    createAWheelSpinner: build.mutation({
      query: (data: string) => {
        console.log("🚀 ~ data:", data);
        return {
          url: `/wheel/create`,
          method: "POST",
          body: { bonusType: data },
        };
      },

      invalidatesTags: ["wheel-spin"],
    }),
  }),
});

export const { useCreateAWheelSpinnerMutation } = wheelApi;
