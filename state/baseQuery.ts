import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getSession } from 'next-auth/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,

  prepareHeaders: async (headers) => {
    const session = await getSession();

    if (session?.accessToken) {
      headers.set('Authorization', `Bearer ${session?.accessToken}`);
    }
  },
});

export default baseQuery;
