import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200/api',
        credentials: 'include',
        prepareHeaders(headers) {
            return headers;
        },
    }),
    tagTypes: [],
    endpoints: () => ({}),
});