import { baseApi } from '@/state/baseApi';

export const requestService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    providersData: builder.query({
      query: (params) => ({
        url: '/api/public',
        method: 'GET',
        params,
      }),
    }),
    providerDetails: builder.query({
      query: (id) => ({
        url: `/api/public/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useProvidersDataQuery, useProviderDetailsQuery } =
  requestService;
