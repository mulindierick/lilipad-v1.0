import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query';
import {API_URL} from '../../utils/constants';

const getBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,

  prepareHeaders: (headers, {getState}) => {
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const baseQuery = (args, api, extraOptions) => {
  return getBaseQuery(args, api, extraOptions);
};

export const customFetchBase = async (args, api, extraOptions) => {
  let result = null;
  try {
    result = await baseQuery(args, api, extraOptions);
  } catch (error) {
    console.log('FETCH BASE ERROR', error);
    return await baseQuery(args, api, extraOptions);
  }

  return result;
};
