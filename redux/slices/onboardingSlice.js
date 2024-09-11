const { createSlice } = require('@reduxjs/toolkit');
const initialState = {
  currentStep: 1,

  onboardingFormData: {},
};
//export the reducer and reducers
const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateOnboardingFormData: (state, action) => {
      state.onboardingFormData = {
        ...state.onboardingFormData,
        ...action.payload,
      };
    },
  },
});
export const { setCurrentStep, updateOnboardingFormData } =
  onboardingSlice.actions;
export default onboardingSlice.reducer;
