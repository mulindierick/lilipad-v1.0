import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
  photo: null,
  firstName: null,
  lastName: null,
  isVerified: null,
  firebaseUserId: null,
  major: null,
  spaces: null,
  classYear: null,
  PushNotificationToken: null,
  college: null,
  spaceId: null,
  collegeName: null,
  notificationStatus: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      state.email = payload?.email || null;
      state.photo = payload?.photo || null;
      state.firstName = payload?.firstName || null;
      state.lastName = payload?.lastName || null;
      state.isVerified = payload?.isVerified;
      state.firebaseUserId = payload?.firebaseUserId || null;
      state.major = payload?.major || null;
      state.spaces = payload?.spaces || null;
      state.classYear = payload?.classYear || null;
      state.PushNotificationToken = payload?.PushNotificationToken || null;
      state.college = payload?.college || null;
      state.spaceId = payload?.spaceId || null;
      state.collegeName = payload?.collegeName || null;
      state.notificationStatus = payload?.notificationStatus || null;
    },
    setSpaces: (state, {payload}) => {
      state.spaces = payload?.spaces || null;
      state.spaceId = payload?.spaceId || null;
      state.notificationStatus = payload?.notificationStatus || null;
    },
    setEmail: (state, {payload}) => {
      state.email = payload?.email || null;
    },
    setFCMToken: (state, {payload}) => {
      state.PushNotificationToken = payload?.PushNotificationToken || null;
    },
    setProfilePhoto: (state, {payload}) => {
      state.photo = payload?.photo || null;
    },
  },
});

export const {setUser, setSpaces, setEmail, setFCMToken, setProfilePhoto} =
  userSlice.actions;

export default userSlice.reducer;
