import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  firstTimeLogin: false,
  postId: null,
  likeCount: null,
  commentCount: null,
  userLiked: null,
  spaceName: null,
  newNotification: false,
  reportPost: [],
  blockedUsers: [],
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setFirstTimeLogin: (state, {payload}) => {
      state.firstTimeLogin = payload.firstTimeLogin;
    },
    setPostDetails: (state, {payload}) => {
      state.postId = payload.postId;
      state.likeCount = payload.likeCount;
      state.commentCount = payload.commentCount;
      state.userLiked = payload.userLiked;
      state.spaceName = payload.spaceName;
    },
    setPostCommentCount: (state, {payload}) => {
      state.commentCount = payload.commentCount;
    },
    setLikeCountAnduserLiked: (state, {payload}) => {
      state.likeCount = payload.likeCount;
      state.userLiked = payload.userLiked;
    },
    setPostId: (state, {payload}) => {
      state.postId = payload.postId;
    },
    setNewNotification: (state, {payload}) => {
      state.newNotification = payload.newNotification;
    },
    setBlockedUsers: (state, {payload}) => {
      state.blockedUsers = payload;
    },
    setReportPost: (state, {payload}) => {
      state.reportPost = payload;
    },
  },
});

export const {
  setFirstTimeLogin,
  setPostDetails,
  setPostCommentCount,
  setLikeCountAnduserLiked,
  setPostId,
  setNewNotification,
  setBlockedUsers,
  setReportPost,
} = generalSlice.actions;

export default generalSlice.reducer;
