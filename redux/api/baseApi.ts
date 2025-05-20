
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  logPersistUserOut,
  setUser,
} from "../features/authentication/authSlice";
import { RootState } from "../store";
import { baseApiInProdOrDev, verifyToken } from "@/lib/utils";

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiInProdOrDev(),
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithTokenRefresh = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  try {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401 || result.error?.status === 500) {
      console.log("Token expired, refreshing new token...");
      // Refresh token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
        },
        api,
        extraOptions
      );

      const refreshData = refreshResult?.data as {
        data: { accessToken: string };
        success: boolean;
        message: string;
      };

      if (!refreshData) {
        console.log("Refresh token is expired. Logging out user...");
        api.dispatch(logPersistUserOut()); // logging out the user
      } else if (refreshData.success) {
        const decodeUser = verifyToken(refreshData.data.accessToken);
        // Set new access token
        api.dispatch(
          setUser({
            accessToken: refreshData.data.accessToken,
            user: decodeUser,
          })
        );
        // Retry the original request
        result = await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  } catch (error) {
    console.error("Error during request:", error);
    // Handle the error gracefully
    api.dispatch(logPersistUserOut()); // Log out if error occurs
    return { error: { status: 500, message: "An unexpected error occurred" } }; // Return a default error response
  }
};

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithTokenRefresh,
  tagTypes: [
    "Auth",
    "Faq",
    "Sponsors",
    "Impacts",
    "CharityPartners",
    "HowItWorks",
    "AboutUs",
    "ShopDescription",
    "Partner",
    "PartnerCard",
    "PartnerDescription",
    "PartnerForm",
    "countdown-timer",
    "packs",
    "cart-details",
    "prizes",
    "order-details",
    "wheel-spin",
  ],
  endpoints: () => ({}),
});
