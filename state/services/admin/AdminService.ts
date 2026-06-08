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
    manageUser: builder.query({
      query: (params) => ({
        url: '/api/admin/manage_user',
        method: 'GET',
        params,
      }),
      providesTags: ['Admin'],
      transformResponse: (response: any) => response?.data,
    }),
    statusChange: builder.mutation({
      query: ({ userId, statusData }) => ({
        url: `/api/admin/${userId}/status_change`,
        method: 'PUT',
        body: statusData,
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
});

export const {
  useOverviewInfoQuery,
  useManageUserQuery,
  useStatusChangeMutation,
} = adminService;
