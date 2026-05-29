import { baseApi } from '@/state/baseApi';
import { IUserResponse } from '@/types/User';

export const profileService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profileInfo: builder.query<IUserResponse, void>({
      query: () => ({
        url: '/api/user',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
  }),
});

export const { useProfileInfoQuery } = profileService;
