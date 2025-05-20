import { T_Login } from "@/components/authPages/loginPage/LoginPage";
import { T_ApiResponse, T_UserProfileDetails } from "@/types/common";
import { verifyToken } from "@/utils/verifyToken";
import { baseApi } from "../../api/baseApi";
import { setUser, setUserDetails } from "./authSlice";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //register --done
    createUser: build.mutation({
      query: (data: any) => {
        return {
          url: `/users/create-user`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // email verify --done
    verifyUser: build.mutation({
      query: (token: string) => {
        return {
          url: `/auth/verify-email?token=${token}`,
          method: "POST",
          body: { accessToken: token },
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // login --done
    login: build.mutation({
      query: (credential: { email: string; password: string }) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: credential,
        };
      },

      // ! args: holding the credentials
      // ! queryFulfilled: holding the response from the server
      // ! dispatch: a function that can be used to dispatch actions

      async onQueryStarted(__args, { dispatch, queryFulfilled }) {
        try {
          const { data: queryData } = await queryFulfilled;
          const loginApiResponse = queryData as T_ApiResponse<T_Login>;
          const decodeToken = verifyToken(loginApiResponse.data.accessToken);

          // Dispatch the token and basic user info
          dispatch(
            setUser({
              accessToken: loginApiResponse.data.accessToken,
              user: decodeToken,
            })
          );
        } catch (error) {
          return Promise.reject(error);
        }
      },
      invalidatesTags: ["Auth"],
    }),

    // forgotten password --done
    forgotPassword: build.mutation({
      query: (data: any) => {
        return {
          url: `/auth/reset-password-req`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    //reset password --done
    resetPassword: build.mutation({
      query: (data: any) => {
        return {
          url: `/auth/reset-password`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // logout user --done
    logout: build.mutation({
      query: () => {
        return {
          url: `/auth/logout`,
          method: "POST",
        };
      },
      invalidatesTags: ["Auth", "cart-details"],
    }),

    // get me --done
    getMyProfile: build.query({
      query: () => ({
        url: `/auth/me`,
        method: "GET",
      }),

      // ! args: holding the credentials
      // ! queryFulfilled: holding the response from the server
      // ! dispatch: a function that can be used to dispatch actions

      async onQueryStarted(__args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const queryData = data as T_UserProfileDetails;
          const reasonableInfo = {
            id: queryData.id,
            name: {
              firstName: queryData.firstName,
              lastName: queryData.lastName,
            },
            //role: queryData.role,
            email: queryData.email,
            userImage: queryData.userImage,
          };
          // Dispatch the token and basic user info
          dispatch(setUserDetails(reasonableInfo));
        } catch (error) {
          return Promise.reject(error);
        }
      },
      transformResponse: (result) => {
        return result.data;
      },
      providesTags: ["Auth"],
    }),

    // change Password --done
    changePassword: build.mutation({
      query: (data: any) => {
        return {
          url: `/auth/change-password`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // Delete Profile --done
    deleteProfile: build.mutation({
      query: (token) => {
        return {
          url: `/user`,
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // Update Profile --done
    updateProfile: build.mutation({
      query: (formdata: any) => {
        return {
          url: `/users/update`,
          method: "PATCH",
          body: formdata,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // Remove profile picture --done
    removeProfilePicture: build.mutation({
      query: (token) => {
        return {
          url: `/user/remove-profile-pic`,
          method: "PATCH",
          headers: {
            Authorization: token,
          },
        };
      },

      invalidatesTags: ["Auth"],
    }),

    // get all users in search field --done
    getUsers: build.query({
      query: ({ searchTerm }: { searchTerm: string }) => ({
        url: `/user?searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    resendVerification: build.mutation({
      query: (data: any) => {
        return {
          url: `/auth/resend-verify-email`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetMyProfileQuery,
  useChangePasswordMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
  useRemoveProfilePictureMutation,
  useGetUsersQuery,
  useResendVerificationMutation,
} = authApi;
