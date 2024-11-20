import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://my-json-server.typicode.com/'}),
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => 'benirvingplt/products/products',
    }),
  }),
});

export const {useGetProductsQuery} = productsApi;
