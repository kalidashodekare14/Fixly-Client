import { baseApi } from '@/state/baseApi';

export const requestService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRequest: builder.mutation({
      query: (requestData) => ({
        url: '/api/request',
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: ['user'],
    }),
    myRequest: builder.query<any, void>({
      query: () => ({
        url: '/api/request',
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateRequestMutation, useMyRequestQuery } = requestService;
