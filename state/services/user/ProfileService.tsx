import { baseApi } from '@/state/baseApi';
import { IUserResponse } from '@/types/User';

export const profileService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profileInfo: builder.query<IUserResponse, void>({
      query: () => ({
        url: '/api/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    profileInfoUpdate: builder.mutation({
      query: (userData) => ({
        url: '/api/user',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useProfileInfoQuery, useProfileInfoUpdateMutation } =
  profileService;
