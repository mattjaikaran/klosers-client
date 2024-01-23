import { Award } from '@/types/stats';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const awardApi = createApi({
  reducerPath: 'awardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('AUTHTOKEN');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAwards: builder.query<Award[], void>({
      query: () => 'awards/',
    }),
    // get a users award via username
    getUserAwards: builder.query<Award[], string>({
      query: (username) => `awards/?user=${username}/`,
    }),
    createAward: builder.mutation<Award, Partial<Award>>({
      query: (newAward) => ({
        url: 'awards/',
        method: 'POST',
        body: newAward,
      }),
    }),
    // get award by id
    getAward: builder.query<Award, number>({
      query: (id) => `awards/${id}/`,
    }),
    updateAward: builder.mutation<Award, Partial<Award>>({
      query: (updatedAward) => ({
        url: `awards/${updatedAward.id}/`,
        method: 'PATCH',
        body: updatedAward,
      }),
    }),
    deleteAward: builder.mutation<void, number>({
      query: (id) => ({
        url: `awards/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAwardsQuery,
  useGetUserAwardsQuery,
  useCreateAwardMutation,
  useGetAwardQuery,
  useUpdateAwardMutation,
  useDeleteAwardMutation,
} = awardApi;
