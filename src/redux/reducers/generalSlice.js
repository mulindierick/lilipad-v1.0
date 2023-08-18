import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  nothing: null,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setNothing: (state, {payload}) => {
      state.nothing = payload.nothing;
    },
  },
});

export const {setNothing} = generalSlice.actions;

export default generalSlice.reducer;
