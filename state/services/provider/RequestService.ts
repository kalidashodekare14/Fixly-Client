import { baseApi } from '@/state/baseApi';

export const requestService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    incomingRequests: builder.query<any, void>({
      query: () => ({
        url: '/api/provider/requests',
        method: 'GET',
      }),
      providesTags: ['Request'],
    }),
    sendOffer: builder.mutation({
      query: (offerData) => ({
        url: '/api/provider/offer',
        method: 'PUT',
        body: offerData,
      }),
      invalidatesTags: ['Request'],
    }),
  }),
});

export const { useIncomingRequestsQuery, useSendOfferMutation } =
  requestService;
