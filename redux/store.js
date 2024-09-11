import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import checkoutSlice from './slices/checkoutSlice';
import onboardingSlice from './slices/onboardingSlice';
import sessionReducer from './slices/sessionSlice';
import sidebarReducer from './slices/sidebarSlice';
import menuReducer from './slices/menuSlice';
import loadingReducer from './slices/loadingSlice';
// create the store
export const store = configureStore({
  reducer: {
    //slices will be here
    cart: cartSlice,
    checkout: checkoutSlice,
    onboarding: onboardingSlice,
    session: sessionReducer,
    sidebar: sidebarReducer,
    menu: menuReducer,
    loading: loadingReducer,
  },
});
