import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  firstTimeLogin: false,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setFirstTimeLogin: (state, {payload}) => {
      state.firstTimeLogin = payload.firstTimeLogin;
    },
  },
});

export const {setFirstTimeLogin} = generalSlice.actions;

export default generalSlice.reducer;
