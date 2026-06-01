import { baseApi } from '@/state/baseApi';

export const requestService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRequest: builder.mutation({
      query: (requestData) => ({
        url: '/api/request',
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: ['Request'],
    }),

    myRequest: builder.query<any, void>({
      query: () => ({
        url: '/api/request',
        method: 'GET',
      }),
      providesTags: ['Request'],
    }),
    updateRequest: builder.mutation({
      query: (updateData) => ({
        url: '/api/request',
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Request'],
    }),

    // open offers for a request
    openOffers: builder.query<any, void>({
      query: () => ({
        url: '/api/request/open_requests',
        method: 'GET',
      }),
      providesTags: ['Request'],
    }),

    viewSelectedOfferForRequest: builder.query<any, void>({
      query: () => ({
        url: '/api/request/selected_offer',
        method: 'GET',
      }),
      providesTags: ['Request'],
    }),

    viewOffers: builder.query<any, { requestId: string }>({
      query: ({ requestId }) => ({
        url: `/api/request/${requestId}/offers`,
        method: 'GET',
      }),
      providesTags: ['Request'],
    }),

    selectedOffers: builder.query<any, { requestId: string }>({
      query: ({ requestId }) => ({
        url: `/api/request/${requestId}/accepted`,
        method: 'GET',
      }),
      providesTags: ['Request'],
    }),

    selectOffer: builder.mutation<any, { offerId: string }>({
      query: ({ offerId }) => ({
        url: `/api/request/offers/${offerId}/accept`,
        method: 'PUT',
      }),
      invalidatesTags: ['Request'],
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useMyRequestQuery,
  useUpdateRequestMutation,
  useViewOffersQuery,
  useOpenOffersQuery,
  useSelectOfferMutation,
  useSelectedOffersQuery,
  useViewSelectedOfferForRequestQuery,
} = requestService;
