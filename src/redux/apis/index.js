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
    DeleteUserAccount: build.mutation({
      query(body) {
        return {
          method: 'POST',
          url: 'DeleteUserAccount',
          body,
        };
      },
    }),
    ActivityRecorder: build.mutation({
      query(body) {
        return {
          method: 'POST',
          url: 'ActivityRecorder',
          body,
        };
      },
    }),
    sendNewPostNotification: build.mutation({
      query(body) {
        return {
          method: 'POST',
          url: 'sendNewPostNotification',
          body,
        };
      },
    }),
    commentLikeActivityRecorderAndNotificationHandler: build.mutation({
      query(body) {
        return {
          method: 'POST',
          url: 'commentLikeActivityRecorderAndNotificationHandler',
          body,
        };
      },
    }),
    DeleteUserPost: build.mutation({
      query(body) {
        return {
          method: 'POST',
          url: 'DeleteUserPost',
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
  useDeleteUserAccountMutation,
  useActivityRecorderMutation,
  useSendNewPostNotificationMutation,
  useCommentLikeActivityRecorderAndNotificationHandlerMutation,
  useDeleteUserPostMutation,
} = lilipadCloudFunction;
