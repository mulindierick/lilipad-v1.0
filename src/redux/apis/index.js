import {createApi} from '@reduxjs/toolkit/query/react';
import {customFetchBase} from './customFetchBase';

export const lilipadCloudFunction = createApi({
  reducerPath: 'lilipadCloudFunction',
  baseQuery: customFetchBase,
  endpoints: build => ({}),
});

export const {} = lilipadCloudFunction;
