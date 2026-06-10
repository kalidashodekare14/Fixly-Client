import { baseApi } from '@/state/baseApi';
import { IRequest } from '@/types/Request';

interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const requestService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    overviewInfo: builder.query<any, void>({
      query: () => ({
        url: '/api/request/user_overivew',
        method: 'GET',
      }),
      providesTags: ['Request'],
      transformResponse: (response: any) => response?.data,
    }),

    createRequest: builder.mutation({
      query: (requestData) => ({
        url: '/api/request',
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: ['Request'],
    }),

    myRequest: builder.query<IRequest[], void>({
      query: () => ({
        url: '/api/request',
        method: 'GET',
      }),
      providesTags: ['Request'],
      transformResponse: (response: IResponse<IRequest[]>) => response?.data,
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
    openOffers: builder.query<IRequest[], void>({
      query: () => ({
        url: '/api/request/open_requests',
        method: 'GET',
      }),
      providesTags: ['Request'],
      transformResponse: (response: IResponse<IRequest[]>) => response?.data,
    }),

    viewSelectedOfferForRequest: builder.query<IRequest[], void>({
      query: () => ({
        url: '/api/request/selected_offer',
        method: 'GET',
      }),
      providesTags: ['Request'],
      transformResponse: (response: IResponse<IRequest[]>) => response?.data,
    }),

    viewOffers: builder.query<any, { requestId: string }>({
      query: ({ requestId }) => ({
        url: `/api/request/${requestId}/offers`,
        method: 'GET',
      }),
      providesTags: ['Request'],
    }),

    selectedProvider: builder.query<any, { requestId: string }>({
      query: ({ requestId }) => ({
        url: `/api/request/${requestId}/selected_provider`,
        method: 'GET',
      }),
      providesTags: ['Request'],
      transformResponse: (response: any) => response?.data,
    }),

    selectOffer: builder.mutation<any, { offerId: string }>({
      query: ({ offerId }) => ({
        url: `/api/request/offers/${offerId}/accept`,
        method: 'PUT',
      }),
      invalidatesTags: ['Request'],
    }),
    initPayment: builder.mutation({
      query: (paymentInfo) => ({
        url: `/api/request/ssl_payment`,
        method: 'POST',
        body: paymentInfo,
      }),
      invalidatesTags: ['Request'],
    }),
  }),
});

export const {
  useOverviewInfoQuery,
  useCreateRequestMutation,
  useMyRequestQuery,
  useUpdateRequestMutation,
  useViewOffersQuery,
  useOpenOffersQuery,
  useSelectOfferMutation,
  useSelectedProviderQuery,
  useViewSelectedOfferForRequestQuery,
  useInitPaymentMutation,
} = requestService;
