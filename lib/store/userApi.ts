import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/types/user';
import { tokenHeaders } from '../auth';
const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const baseQueryWithToken = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const token = localStorage.getItem('AUTHTOKEN');
  const result = await fetchBaseQuery({
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);
  return result;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  // baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users/',
    }),
    fetchUser: builder.query<User, number>({
      query: (username) => `users/?username=${username}/`,
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: 'users/',
        method: 'POST',
        body: newUser,
      }),
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (updatedUser) => {
        const { id, ...rest } = updatedUser;
        return {
          url: `users/${id}/`,
          method: 'PATCH',
          body: rest,
        };
      },
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}/`,
        method: 'DELETE',
      }),
    }),
    login: builder.mutation<User, Partial<User>>({
      query: (userCredentials) => {
        console.log('userCredentials login rtkquery', userCredentials);
        return {
          url: 'login/',
          method: 'POST',
          body: userCredentials,
        };
      },
    }),
    logout: builder.mutation<void, Partial<User>>({
      query: (user) => ({
        url: 'logout/',
        method: 'POST',
        body: user,
      }),
    }),
    register: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: 'register/',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useFetchUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = userApi;
