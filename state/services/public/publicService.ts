import { baseApi } from '@/state/baseApi';

interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ICategory {
  _id: string;
  value: string;
  label: string;
  icon: string;
  isActive: string;
}

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
    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: `/api/public/categories`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<ICategory[]>) => response.data,
    }),
  }),
});

export const {
  useProvidersDataQuery,
  useProviderDetailsQuery,
  useGetCategoriesQuery,
} = requestService;
