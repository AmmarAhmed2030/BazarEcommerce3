// /store/sessionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null,
    status: 'unauthenticated',
  },
  reducers: {
    setSession: (state, action) => {
      state.user = action.payload.user;
      state.status = action.payload.status;
    },
    clearSession: (state) => {
      state.user = null;
      state.status = 'unauthenticated';
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
