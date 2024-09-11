// create a slice
// create reducers
const updateLocalStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify(state));
};
const { createSlice } = require('@reduxjs/toolkit');
const initialState =
  (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('cart'))) ||
  [];
//export the reducer and reducers
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        id,
        title,
        imageUrl,
        salePrice,
        userId: vendorId,
      } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        const newItem = { id, title, imageUrl, salePrice, qty: 1, vendorId };

        state.push(newItem);
      }
      if (typeof window !== 'undefined') {
        updateLocalStorage(state);
      }
    },
    removeFromCart: (state, action) => {
      const cartId = action.payload;

      const updatedState = state.filter((item) => item.id !== cartId);
      if (typeof window !== 'undefined') {
        updateLocalStorage(updatedState);
      }

      return updatedState;
    },
    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
        if (typeof window !== 'undefined') {
          updateLocalStorage(state);
        }
      }
    },
    decrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty >= 1) {
        cartItem.qty -= 1;
        if (typeof window !== 'undefined') {
          updateLocalStorage(state);
        }
      }
    },
  },
});
export const { addToCart, removeFromCart, incrementQty, decrementQty } =
  cartSlice.actions;
export default cartSlice.reducer;
