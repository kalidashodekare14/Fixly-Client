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
  }),
});

export const { useProvidersDataQuery } = requestService;
