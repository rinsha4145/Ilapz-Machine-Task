import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
  },
  reducers: {
    setProduct(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setProduct } = productsSlice.actions;

export default productsSlice.reducer;
