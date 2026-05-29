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
  }),
});

export const {
  useCreateRequestMutation,
  useMyRequestQuery,
  useUpdateRequestMutation,
} = requestService;
