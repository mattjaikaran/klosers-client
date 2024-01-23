import { Stat } from '@/types/stats';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const statApi = createApi({
  reducerPath: 'statApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('AUTHTOKEN');
      if (token) {
        headers.set('Authorization', `Bearer ${token.split('"')[1]}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStats: builder.query<Stat[], any>({
      query: () => 'stats/',
    }),
    // get stat by id
    getStat: builder.query<Stat[], any>({
      query: (id) => `stats/${id}/`,
    }),
    // get a users stat via username
    getUserStats: builder.query<Stat[], string>({
      query: (username) => `stats/?username=${username}/`,
    }),
    getLeaderboard: builder.query<Stat[], any>({
      query: () => 'leaderboard/',
    }),
    createStat: builder.mutation<Stat, Partial<Stat>>({
      query: (newStat) => ({
        url: 'stats/',
        method: 'POST',
        body: newStat,
      }),
    }),
    updateStat: builder.mutation<Stat, Partial<Stat>>({
      query: (updatedStat) => ({
        url: `stats/${updatedStat.id}/`,
        method: 'PATCH',
        body: updatedStat,
      }),
    }),
    deleteStat: builder.mutation<void, number>({
      query: (id) => ({
        url: `stats/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetStatQuery,
  useGetUserStatsQuery,
  useGetLeaderboardQuery,
  useCreateStatMutation,
  useUpdateStatMutation,
  useDeleteStatMutation,
} = statApi;
