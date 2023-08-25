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
      state.isVerified = payload?.isVerified || null;
      state.firebaseUserId = payload?.firebaseUserId || null;
      state.major = payload?.major || null;
      state.spaces = payload?.spaces || null;
    },
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
