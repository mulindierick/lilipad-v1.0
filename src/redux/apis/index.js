import {createApi} from '@reduxjs/toolkit/query/react';
import {customFetchBase} from './customFetchBase';

export const lilipadCloudFunction = createApi({
  reducerPath: 'lilipadCloudFunction',
  baseQuery: customFetchBase,
  endpoints: build => ({
    sendOTPemail: build.mutation({
      query(body) {
        return {
          method: 'POST',
          url: 'sendOTPmail',
          body,
        };
      },
    }),
    verifyOTP: build.mutation({
      query(body) {
        return {
          method: 'POST',
          url: 'checkOTP',
          body,
        };
      },
    }),
    sentNotification: build.mutation({
      query(body) {
        return {
          method: 'POST',
          url: 'sentNotification',
          body,
        };
      },
    }),
  }),
});

export const {
  useSendOTPemailMutation,
  useVerifyOTPMutation,
  useSentNotificationMutation,
} = lilipadCloudFunction;
