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
  }),
});

export const { useCreateRequestMutation } = requestService;
