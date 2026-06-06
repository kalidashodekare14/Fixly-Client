import { baseApi } from '@/state/baseApi';

export const requestService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    overviewInfo: builder.query<any, void>({
      query: () => ({
        url: '/api/provider/provider_overview',
        method: 'GET',
      }),
      providesTags: ['Request'],
      transformResponse: (response: any) => response?.data,
    }),

    incomingRequests: builder.query<any, void>({
      query: () => ({
        url: '/api/provider/requests',
        method: 'GET',
      }),
      providesTags: ['Request'],
      transformResponse: (response: any) => response?.data,
    }),

    sendOffer: builder.mutation({
      query: (offerData) => ({
        url: '/api/provider/offer',
        method: 'PUT',
        body: offerData,
      }),
      invalidatesTags: ['Request'],
    }),

    sendOfferd: builder.query<any, void>({
      query: () => ({
        url: '/api/provider/send_offered',
        method: 'GET',
      }),
      providesTags: ['Request'],
      transformResponse: (response: any) => response?.data,
    }),

    jobsInfo: builder.query<any, void>({
      query: () => ({
        url: '/api/provider/jobs',
        method: 'GET',
      }),
      providesTags: ['Request'],
      transformResponse: (response: any) => response?.data,
    }),

    jobStatusChange: builder.mutation({
      query: (jobInfo) => ({
        url: '/api/provider/job_status',
        method: 'PUT',
        body: jobInfo,
      }),
      invalidatesTags: ['Request'],
    }),
  }),
});

export const {
  useOverviewInfoQuery,
  useIncomingRequestsQuery,
  useSendOfferMutation,
  useSendOfferdQuery,
  useJobsInfoQuery,
  useJobStatusChangeMutation,
} = requestService;
