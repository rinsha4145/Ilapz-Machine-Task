import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProduct: (state, action) => {
      return action.payload;
    },
    addProductToList: (state, action) => {
      return [action.payload, ...state];
    },
    updateProductInList: (state, action) => {
      return state.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
  },
});

export const { setProduct, addProductToList, updateProductInList } = productSlice.actions;

export default productSlice.reducer;
