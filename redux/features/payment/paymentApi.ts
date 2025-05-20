import { baseApi } from "@/redux/api/baseApi";

export type T_ConfirmPayment = {
  amount: number;
  status: string;
  paymentId: string;
  currency: string;
  orderId: string | null;
  country: string | null | undefined;
  donation: string | null;
  payment_intent: string | null;
};

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ? Getting client_secret by calling payment intent
    getPaymentIntent: builder.query({
      query: ({
        orderId,
        donation,
      }: {
        orderId: string;
        donation: number;
      }) => ({
        url: `/_/payment-intent?${orderId}&donation=${donation}`,
        method: "GET",
      }),
      transformResponse: (data) => data.data,
    }),
    confirmPayment: builder.mutation({
      query: (data) => {
        console.log("🚀 ~ data:", data);
        return {
          url: `/_/payment-confirm`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": data.payment_intent!,
          },
          body: {
            amount: data.amount,
            status: data.status,
            paymentId: data.paymentId,
            currency: data.currency,
            orderId: data.orderId,
            country: data.country,
            donation: data.donation,
          },
        };
      },
      invalidatesTags: ["order-details"], // Invalidate related tags on success
    }),
  }),
});

export const { useGetPaymentIntentQuery, useConfirmPaymentMutation } =
  paymentApi;
