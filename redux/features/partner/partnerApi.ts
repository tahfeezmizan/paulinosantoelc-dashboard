import { baseApi } from "@/redux/api/baseApi";

const partnerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get Partner Hero Api
    getPartnerHero: build.query({
      query: () => ({
        url: `/become-partner-hero-sections`,
        method: "GET",
      }),
      providesTags: ["PartnerDescription"],
    }),

    // Get Partner Card Api
    getPartnerCard: build.query({
      query: () => ({
        url: `/partner-cards`,
        method: "GET",
      }),
      providesTags: ["PartnerCard"],
    }),

    // create partner form api
    createPartnerForm: build.mutation<any, any>({
      query: (data) => ({
        url: `/create-partner-form/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PartnerForm"],
    }),
  }),
});

export const {
  useGetPartnerHeroQuery,
  useGetPartnerCardQuery,
  useCreatePartnerFormMutation,
} = partnerApi;
