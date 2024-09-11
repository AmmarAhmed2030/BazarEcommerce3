// sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    showSidebar: false,
  },
  reducers: {
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    setSidebarVisibility(state, action) {
      state.showSidebar = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarVisibility } = sidebarSlice.actions;
export default sidebarSlice.reducer;
