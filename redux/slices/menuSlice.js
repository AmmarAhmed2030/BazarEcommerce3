// redux/slices/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openMenu: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setOpenMenu: (state, action) => {
      state.openMenu = action.payload;
    },
  },
});

export const { setOpenMenu } = menuSlice.actions;

export default menuSlice.reducer;
