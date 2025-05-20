import { baseApi } from "../../api/baseApi";

const homeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get home faq
    getFaq: build.query({
      query: () => ({
        url: `/faqs`,
        method: "GET",
      }),
      providesTags: ["Faq"],
    }),
    // Get Sponsors
    getSponsors: build.query({
      query: () => ({
        url: `/sponsors`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["Sponsors"],
    }),
    // Get Impacts
    getImpacts: build.query({
      query: () => ({
        url: `/our-impacts`,
        method: "GET",
      }),
      providesTags: ["Impacts"],
    }),
    // Get Charity Partner
    getCharityPartners: build.query({
      query: () => ({
        url: `/charity-partners`,
        method: "GET",
      }),
      providesTags: ["CharityPartners"],
    }),
    // Get current promotion
    getHowItWorks: build.query({
      query: () => ({
        url: `/how-it-works`,
        method: "GET",
      }),
      providesTags: ["HowItWorks"],
    }),
    //Get about us page
    getAboutUs: build.query({
      query: () => ({
        url: `/about-us`,
        method: "GET",
      }),
      providesTags: ["AboutUs"],
    }),
    // Get Shop Api
    getShopDescription: build.query({
      query: () => ({
        url: `/shop-descriptions`,
        method: "GET",
      }),
      providesTags: ["ShopDescription"],
    }),
  }),
});

export const {
  useGetFaqQuery,
  useGetSponsorsQuery,
  useGetImpactsQuery,
  useGetCharityPartnersQuery,
  useGetHowItWorksQuery,
  useGetAboutUsQuery,
  useGetShopDescriptionQuery,
} = homeApi;
