import { baseApi } from '@/state/baseApi';

export const adminService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    overviewInfo: builder.query<any, void>({
      query: () => ({
        url: '/api/admin/overview',
        method: 'GET',
      }),
      providesTags: ['Admin'],
      transformResponse: (response: any) => response?.data,
    }),
  }),
});

export const { useOverviewInfoQuery } = adminService;
