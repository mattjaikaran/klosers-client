import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface Reference {
  user_id?: string;
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;
export const referenceApi = createApi({
  reducerPath: 'referenceApi',
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
    // get all references
    getReferences: builder.query<Reference[], void>({
      query: () => 'references/',
    }),
    // get a single reference by id
    getReference: builder.query<Reference, string>({
      query: (id) => `references/${id}/`,
    }),
    // create a new reference
    createReference: builder.mutation<Reference, Partial<Reference>>({
      query: (newReference) => ({
        url: 'references/',
        method: 'POST',
        body: newReference,
      }),
    }),
    // update a reference
    updateReference: builder.mutation<Reference, Partial<Reference>>({
      query: (updatedReference) => ({
        url: `references/${updatedReference.id}/`,
        method: 'PATCH',
        body: updatedReference,
      }),
    }),
    // delete a reference
    deleteReference: builder.mutation<void, string>({
      query: (id) => ({
        url: `references/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetReferencesQuery,
  useGetReferenceQuery,
  useCreateReferenceMutation,
  useUpdateReferenceMutation,
  useDeleteReferenceMutation,
} = referenceApi;
