import { baseApi } from '@/state/baseApi';

export const profileService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profileInfo: builder.query<any, void>({
      query: () => ({
        url: '/api/provider',
        method: 'GET',
      }),
      providesTags: ['Provider'],
    }),
    profileInfoUpdate: builder.mutation({
      query: (providerData) => ({
        url: '/api/provider',
        method: 'PUT',
        body: providerData,
      }),
      invalidatesTags: ['Provider'],
    }),
  }),
});

export const { useProfileInfoQuery, useProfileInfoUpdateMutation } =
  profileService;
